import { useState } from 'react'
import { 
    Box, 
    Alert, 
    Button, 
    Grid, 
    TextField, 
    Typography, 
    FormControl, 
    Select, 
    MenuItem, 
    Switch, 
    FormControlLabel,
    OutlinedInput,
    InputLabel,
    Chip,
    Stack
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, SET_TEMPLATES } from 'store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import { showError, showSuccess } from 'utils/snackbar'
import { getMyTemplates, getTemplates, publishTemplate } from 'api/template'
import constants from 'constant'
import FullScreenFrame from './FullScreenFrame'
import { pinFilesToIpfs } from 'api/ipfs'

const { TEMPLATES } = constants

const SaveTemplateModal = ({ open, onClose, project, editor }) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const [selectedTemplateId, setSelectedTemplateId] = useState(constants.TEMPLATES.DEFAULT)

    const account = useSelector((state) => state.account)
    const {
        principal
    } = account
	const loading = useSelector((state) => state.loader.show)
    const myTemplates = useSelector((state) => state.editor.myTemplates)

    const generateTemplateId = () => `${account.user.issuer}-${project?.subdomain}-${Math.random().toString(36).slice(2, 7)}`

    const [imageUrl, setImageUrl] = useState(constants.TEMPLATES.DEFAULT_IMAGE)
    const [identifier, setIdentifier] = useState(generateTemplateId())
    const [name, setName] = useState(project?.name)
    const [description, setDescription] = useState(project?.metadata['og:description'])
    const [tags, setTags] = useState([])
    const [isPrivate, setPrivate] = useState(true)
    const [docs, setDocs] = useState(constants.TEMPLATES.DEFAULT_DOCS_URL)
    const [demo, setDemo] = useState(constants.TEMPLATES.DEFAULT_DEMO_URL)

    const handlePublishTemplate = async () => {
        try {
            dispatch({ type: LOADER, show: true })
            await publishTemplate({
                id: identifier,
                preview: imageUrl,
                name,
                description,
                documentation: docs,
                demo,
                isPrivate,
                tags,
                content: JSON.stringify(editor.getProjectData()),
                principal
            })
            const promisesData = [
				getTemplates({ principal }),
				getMyTemplates({ principal, author: account.user.issuer})
			]
			const [allTemplates, privateTemplates] = await Promise.all(promisesData)
			dispatch({ type: SET_TEMPLATES, ...{ 
                availableTemplates: allTemplates, 
                myTemplates: privateTemplates
            }})

            showSuccess({ dispatch, message:  intl.formatMessage({id: 'template_page.publish_success'})  })
        } catch (e) {
            console.log(e)
            showError({ dispatch, message: e })
        } finally {
            dispatch({ type: LOADER, show: false })
            onClose()
        }
    }

    const handleMediaUpload = async (e) => {
        dispatch({ type: LOADER, show: true })
        const file = e.target.files[0]
        try {
            const upload = await pinFilesToIpfs([file], project.subdomain)
            console.log(upload)
            const uploadedFilePath = upload.url
            setImageUrl(uploadedFilePath)
            showSuccess({ dispatch, message:  intl.formatMessage({id: 'image_manager.media_uploaded'})  })
        } catch(e) {
            showError({ dispatch, message: e.message })
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    }

    const handleChangeTemplate = (e) => {
        setSelectedTemplateId(e.target.value)
        if (e.target.value === constants.TEMPLATES.DEFAULT) {
            setImageUrl(constants.TEMPLATES.DEFAULT_IMAGE)
            setIdentifier(generateTemplateId())
            setName(project?.name)
            setDescription(project?.metadata['og:description'])
            setTags([])
            setPrivate(true)
            setDocs(constants.TEMPLATES.DEFAULT_DOCS_URL)
            setDemo(constants.TEMPLATES.DEFAULT_DEMO_URL)
        } else {
            // Find template data
            const selected = myTemplates.find((template) => template.id === e.target.value)
            setImageUrl(selected?.preview)
            setIdentifier(selected?.id)
            setName(selected?.name)
            setDescription(selected?.description)
            setTags(selected?.tags)
            setPrivate(selected?.isPrivate)
            setDocs(selected?.documentation)
            setDemo(selected?.demo)
        }
    }

    const personalTemplatesDropdown = (
        <FormControl fullWidth>
            <Select

                value={selectedTemplateId}
                onChange={handleChangeTemplate}
            >
                <MenuItem value={constants.TEMPLATES.DEFAULT}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormattedMessage id='template_page.save_as_new' />
                        </Grid>
                    </Grid>
                </MenuItem>
                {
                    myTemplates?.map((template) => {
                        const lastUpdated = new Date(template.updated).toDateString()
                        const variant = template.status === 'published' ? 'contained' : 'outlined'
                        return (
                            <MenuItem value={template.id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Stack direction="row">
                                            <Typography>
                                                {template.name}
                                            </Typography>
                                            <Box flex={1} />
                                            <Chip variant={variant} label={intl.formatMessage({ id: template.status })} color="primary" size="small" />
                                        </Stack>    
                                        <Box flex={1}/>
                                        <Typography fontSize={10}>
                                            <FormattedMessage id='last_updated' />
                                            {` ${lastUpdated}`}
                                        </Typography>
                                        
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )

    const isDataReady = !!(imageUrl && 
                        name && 
                        description && 
                        identifier && 
                        docs && 
                        demo && 
                        tags &&
                        !loading)

    const tagSelector = (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>{intl.formatMessage({ id: 'template_page.tags' })}</InputLabel>
            <Select
                multiple
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                input={<OutlinedInput label={intl.formatMessage({ id: 'template_page.tags' })} />}
                >
                {TEMPLATES.CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                        <FormattedMessage id={category} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )

	return (
        <FullScreenFrame    open={open} 
                            onLeave={onClose}
                            title="publish.save_template"
                            tooltip="template_page.publish_description"
                            dismissLabel="cancel"
        >
                <Grid container spacing={2} paddingX="20%" paddingY={4}>
                    <Grid item xs={12}>
                        { personalTemplatesDropdown }
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                        <Button disabled={loading} color="primary" variant="outlined" component="label" size="large" fullWidth sx={{ marginBottom: 1 }}>
                            { intl.formatMessage({id: 'image_manager.upload_media'})}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleMediaUpload}
                            />
                        </Button>
                        <img src={imageUrl} alt="Placeholder" style={{ border: '1px solid rgba(0,0,0,0.1)'}}/>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                        <TextField  label={intl.formatMessage({ id : 'template_page.identifier' })} 
                                    disabled={true} 
                                    variant="standard" 
                                    fullWidth 
                                    value={identifier}
                        />
                        <TextField  variant="standard" 
                                    fullWidth 
                                    label={intl.formatMessage({id:'template_page.name'})} 
                                    value={name} onChange={(e) => { setName(e.target.value)}}
                                    sx={{ mt: 2 }}
                        />
                        <TextField  variant="standard" 
                                    fullWidth 
                                    label={intl.formatMessage({id:'template_page.description'})} 
                                    value={description}  
                                    onChange={(e) => { setDescription(e.target.value)}} 
                                    sx={{ mt: 2 }}
                        />
                        <TextField  variant="standard" 
                                    fullWidth 
                                    label={intl.formatMessage({id:'template_page.demo'})} 
                                    value={demo} 
                                    onChange={(e) => { setDemo(e.target.value)}}
                                    sx={{ mt: 2 }}
                        />
                        <TextField  variant="standard" 
                                    fullWidth 
                                    label={intl.formatMessage({id:'template_page.docs'})} 
                                    value={docs} 
                                    onChange={(e) => { setDocs(e.target.value)}}
                                    sx={{ mt: 2 }}
                        />
                        {tagSelector}
                        <FormControlLabel sx={{ mt: 2 }}
                            control={
                                <Switch checked={isPrivate} onChange={(e) => setPrivate(e.target.checked)}/>
                            }
                            label={intl.formatMessage({ id : 'template_page.private' })}
                        />
                        <Alert severity="info" sx={{ mt: 2 }}>
                            {intl.formatMessage({ id : 'template_page.publish_description' }) }
                        </Alert>
                        <Button fullWidth 
                                disabled={!isDataReady} 
                                variant="outlined" 
                                size="large" 
                                onClick={handlePublishTemplate}
                                sx={{ mt: 2 }}
                        >
                                    {intl.formatMessage({id:'publish'})}
                        </Button>
                    </Grid>
                </Grid>
        </FullScreenFrame>
	)
}

export default SaveTemplateModal
