import { useState } from 'react'
import { Grid, Button,TextField, Typography, Box, Stack } from '@mui/material'
import { getProjectById } from 'api/project'
import { publishMetadata, uploadPagesToIPFS } from 'api/publish'
import { LOADER, SET_PROJECT } from "store/actions";
import { useDispatch, useSelector } from 'react-redux'
import { getDefaultMetadataForProject } from 'utils/project'
import { showError, showSuccess } from 'utils/snackbar'
import tabFrame from 'assets/images/browserTabSkeleton.png'
import constants from 'constant'
import { requestNewDomain } from 'api/discord';
import { useIntl } from 'react-intl';
const { EVENTS } = constants


const Settings = ({ principal, project }) => {
    const intl = useIntl()
    const defaultMetadata = getDefaultMetadataForProject({ project })
    const isLoading = useSelector((state) => state.loader.show)
    const account = useSelector((state) => state.account)
    const dispatch = useDispatch()
    const [metadata, setMetadata] = useState(project.metadata || defaultMetadata)
    const [customDomain, setCustomDomain] = useState()
    

    const save = async (data) =>{
        try {
            await publishMetadata({ id: project.id, principal, metadata: data  })
            showSuccess({ dispatch, message: intl.formatMessage({ id : 'action.metadata_saved' }) })
            const updatedProject = await getProjectById({ projectId: project.id, principal })
            dispatch({ type: SET_PROJECT, project:updatedProject })
        } catch(e) {
            console.log(e)
            const error = intl.formatMessage({ id : 'action.metadata_saved_error' })
            showError({ dispatch, error })
        } finally {
            dispatch({ type: LOADER, show: false })
        }
    }

    const handleSaveMetadata = async () => {
        return await save(metadata)
    }

    const handleFaviconChange = async (e) => {
        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = async () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '')
                const pages = [{
                    path: 'favicon.jpeg',
                    content: base64String
                }]
                const upload = await uploadPagesToIPFS({pages})
                const uploadedFilePath = upload[0].path

                const currMeta = {...metadata}
                currMeta['icon'] = uploadedFilePath
                await save(currMeta)
                setMetadata(currMeta)

        };
        reader.readAsDataURL(file);


    }


    const handleSocialImageChange = async (e) => {
        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = async () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '')
                const pages = [{
                    path: 'favicon.jpeg',
                    content: base64String
                }]
                const upload = await uploadPagesToIPFS({pages});
                const uploadedFilePath = upload[0].path;

                const currMeta = {...metadata};
                currMeta['og:image'] = uploadedFilePath;
                currMeta['twitter:image'] = uploadedFilePath;
                await save(currMeta);
                setMetadata(currMeta);

        };
        reader.readAsDataURL(file);


    }

    const title = (
        <Grid container spacing={1} sx={{ mb:3, pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>{ intl.formatMessage({ id : 'settings.title' }) }</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    {intl.formatMessage({ id : 'settings.description' }) }
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, pr: 2, pl: 1, pb: 2 }}>
                    <TextField  fullWidth
                                variant="standard"
                                placeholder={intl.formatMessage({ id: 'settings.placeholder' })}
                                defaultValue={metadata?.description}
                                disabled={isLoading}
                                onChange={(e) => {
                                    const text = e.target.value;
                                    const currMeta = {...metadata};
                                    currMeta['description'] = text;
                                    currMeta['twitter:description'] = text;
                                    currMeta['og:description'] = text;
                                    setMetadata(currMeta);
                                }}
                    ></TextField>
                    <Button fullWidth onClick={handleSaveMetadata}>{intl.formatMessage({ id: 'settings.save_title' })}</Button>
            </Grid>
        </Grid>
    );

    const handleSubmitCustomDomain = () => {
        requestNewDomain(dispatch, account.user, customDomain, project)
    }

    const customDomainBlock = (
        <Grid container spacing={1} sx={{ mb:3, pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>{intl.formatMessage({ id: 'settings.custom_domain' })}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    {intl.formatMessage({ id: 'settings.custom_domain_description' })}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, pr: 2, pl: 1, pb: 2 }}>
                    <TextField  fullWidth
                                variant="standard"
                                placeholder={intl.formatMessage({ id: 'settings.custom_domain_placeholder' })}
                                disabled={isLoading}
                                onChange={(e) => setCustomDomain(e.target.value)}
                    ></TextField>
                    <Button fullWidth onClick={handleSubmitCustomDomain}>{intl.formatMessage({ id: 'settings.custom_domain_submit_request' })}</Button>
            </Grid>
        </Grid>
    );

    const favIcon = (
        <Grid container spacing={1} sx={{ mb:3, pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>{intl.formatMessage({ id:'settings.favicon' })}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    {intl.formatMessage({ id: 'settings.favicon_description' })}
                </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 1 }}>
                    <Typography>{intl.formatMessage({ id: 'settings.favicon_preview_title' })}</Typography>
                    <Stack direction="row">
                        <img src={metadata?.icon} height="44px" width="44px" alt={intl.formatMessage({id:'settings.favicon_change'})} />
                        <Box sx={{ py:1, ml: 1 }}>
                            <Button color="primary" size="small" variant="outlined" component="label">
                                {intl.formatMessage({id:'settings.favicon_change'})}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onClick={() => document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY))}
                                    onChange={handleFaviconChange}
                                />
                            </Button>
                        </Box>
                    </Stack>
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
                    <Typography>{intl.formatMessage({id:"settings.favicon_preview_in_browser"})}</Typography>
                    <Box sx={{ position:'relative' }}>
                        <img src={tabFrame} height={41} alt={intl.formatMessage({id:"settings.favicon_preview_in_browser"})} />
                        <img src={metadata?.icon} 
                            alt="Icon" 
                            style={{
                                position: 'absolute',
                                top: 15,
                                left:50,
                                height:16
                            }}
                        />
                        <span style={{
                                position: 'absolute',
                                top: 15,
                                left:70,
                                height:16,
                                fontSize:9,
                                fontWeight:'bold',
                                color: '#333'
                            }}>
                                {intl.formatMessage({id:"settings.app_title"})}
                        </span>
                    </Box>
            </Grid>
        </Grid>
    )

    const social = (
        <Grid container spacing={1} sx={{mb:3, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>{intl.formatMessage({id:"settings.social_image"})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                {intl.formatMessage({id:"settings.social_image_description"})}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, pr: 1, pb: 1 }}>
                <img src={metadata ? metadata['og:image']: ''} height="auto" width="100%" alt="Social" />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ pb:1, ml: 1 }}>
                    <Button color="primary" size="small" variant="outlined" component="label">
                        {intl.formatMessage({id:'settings.social_image_upload'})}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleSocialImageChange}
                        />
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );

    return (
        <Grid container spacing={2} sx={{ 
            height: 'calc(100vh - 110px)', 
            overflow: 'auto', 
            background: '#fff', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 1
        }}>
            <Grid item xs={12} sx={{ ml:2, mr: 1 }}>
                {title}
                {favIcon}
                {social}
                {customDomainBlock}
            </Grid>
        </Grid>
    )
}

export default Settings;

