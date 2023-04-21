import { useState, useEffect } from 'react';
import { Grid, Paper, Button,TextField, Typography, Box, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Magic } from 'magic-sdk';
import { getProjectById } from 'api/project';
import { publishMetadata, uploadPagesToIPFS } from 'api/publish';
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import SubCard from 'ui-component/cards/SubCard';

import tabFrame from "assets/images/browserTabSkeleton.png";
import { fontSize } from '@mui/system';
import { IconUpload } from '@tabler/icons';
import { getPrimaryUrl } from 'utils/url';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const Settings = ({ onLeave, principal, projectId }) => {
    const isLoading = useSelector((state) => state.loader.show);
    const dispatch = useDispatch()
    const [metadata, setMetadata] = useState()

    const loadMetadata = async() => {


              // console.log()
              const currentProject = await getProjectById({ 
                projectId: window.webstudio.project.id, 
                principal
            });
            console.log(currentProject)
            console.log(currentProject.metadata)

            if (currentProject?.metadata) {
                setMetadata(currentProject?.metadata)
            } else {
                console.log("LOADING DEFAULT META?")
                setMetadata({
                    "title": window.webstudio.project.name,
                    "description": "This App does X,Y,Z under 50 characters",
                    "keywords": "Web3, no code, dapp, builder",
                    "author": getPrimaryUrl(window.webstudio.project),
                    // Open graph / facebook tags
                    "og:locale": "en_US",
                    "og:type": "website",
                    "og:url": getPrimaryUrl(window.webstudio.project),
                    "og:site_name": getPrimaryUrl(window.webstudio.project),
                    "article:publisher": getPrimaryUrl(window.webstudio.project),
                    "og:title": window.webstudio.project.name,
                    "og:description": "The simplest way to build and launch web3 apps",
                    "og:image": "https://i.ibb.co/L9cpg3y/Screenshot-2022-08-22-at-11-46-45.png",
                    // Twitter social tags
                    "twitter:card": "summary_large_image",
                    "twitter:url": getPrimaryUrl(window.webstudio.project),
                    "twitter:title": window.webstudio.project.name,
                    "twitter:description": "The simplest way to build and launch web3 apps",
                    "twitter:image": "https://i.ibb.co/L9cpg3y/Screenshot-2022-08-22-at-11-46-45.png",
                    "twitter:creator": "@WebstudioWeb3",
                    "icon": "https://i.ibb.co/K5YxKKM/logo.png"
                })
            }
            // setProject(currentProject);
            // const mData = currentProject?.metadata;
            // if (mData) {
            //     setMetadata(mData);
            // }
    }

    useState(() => {
        loadMetadata()
    }, [])

    // const metaItems = metadata && (
    //     <Grid container fullWidth spacing={2} 
    //         sx={{ 
    //             px: 5,
    //             height: 'calc(100vh - 210px)', 
    //             overflow: 'scroll', 
    //         }}>
    //         { Object.keys(defaultMetadata).map((key) => {
    //             const value = metadata[key];
    //             return (
    //                 <Grid item xs={12} key={key}>
    //                     <TextField
    //                         id={`meta-${key}`}
    //                         label={key} 
    //                         variant="standard" 
    //                         defaultValue={value}
    //                         onChange={(e) => {
    //                             const val = e.target.value;
    //                             const currMeta = {...metadata};
    //                             currMeta[key] = val;
    //                             setMetadata(currMeta);
    //                         }}
    //                         fullWidth
    //                     />
    //                 </Grid>
    //             )
    //         })}
    //     </Grid>
    // );

    const save = async (data) =>{
        console.log(`saving`)
        console.log(data)
        try {
            
            await publishMetadata({ id: projectId, principal, metadata: data  })
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Metadata saved',
                variant: "alert",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                alertSeverity: "success"
            });
        } catch(e) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: e.message,
                variant: "alert",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                alertSeverity: "error"
            });
        } finally {
            dispatch({ type: LOADER, show: false });
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
                .replace(/^.+,/, '');
                console.log(base64String)
                const pages = [{
                    path: 'favicon.jpeg',
                    content: base64String
                }]
                const upload = await uploadPagesToIPFS({pages});
                const uploadedFilePath = upload[0].path;

                const currMeta = {...metadata};
                currMeta['icon'] = uploadedFilePath;
                await save(currMeta);
                // window.editor.store();
                setMetadata(currMeta);
                // await publishMetadata({ id: projectId, principal, data  })

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
                .replace(/^.+,/, '');
                console.log(base64String)
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
                // await publishMetadata({ id: projectId, principal, data  })

        };
        reader.readAsDataURL(file);


    }

    const title = metadata && (
        <Grid container spacing={1} sx={{ mb:3, pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>Title</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    Text displayed on the browser tab and on the social sharing links. It helps the audience understand what the project is about.
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, pr: 2, pl: 1, pb: 2 }}>
                    <TextField  fullWidth
                                variant="standard"
                                placeholder="e.g The best way to build websites | Webstudio"
                                sx={{ mr: 5 }}
                                value={metadata.description}
                                onMouseLeave={handleSaveMetadata}
                                onChange={(e) => {
                                    const text = e.target.value;
                                    const currMeta = {...metadata};
                                    currMeta['description'] = text;
                                    currMeta['twitter:description'] = text;
                                    currMeta['og:description'] = text;
                                    setMetadata(currMeta);
                                }}
                    ></TextField>
            </Grid>
        </Grid>
    );

    const favIcon = metadata && (
        <Grid container spacing={1} sx={{ mb:3, pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>Favicon</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    A favicon is a small icon next to your site title. It help visitors recognize your brand and stand out in their browser tabs.
                </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 1 }}>
                    <Typography>Your Favicon</Typography>
                    <Stack direction="horizontal">
                        <img src={metadata?.icon} height="44px" width="44px"/>
                        <Box sx={{ py:1, ml: 1 }}>
                            <Button color="primary" size="small" variant="outlined" component="label">
                                Upload
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onClick={() => document.dispatchEvent(new CustomEvent('addCloseDelay'))}
                                    onChange={handleFaviconChange}
                                />
                            </Button>
                        </Box>
                    </Stack>
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
                    <Typography>Preview in browser</Typography>
                    <Box sx={{ position:'relative' }}>
                        <img src={tabFrame} height={41} />
                        <img src={metadata?.icon} 
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
                                Your App Title
                        </span>
                    </Box>
            </Grid>
        </Grid>
    );

    const social = metadata && (
        <Grid container spacing={1} sx={{mb:3, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>Social Image</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                This image will be shared on social networks including Facebook and Twitter. It's a great way to help visitors recognize your brand.
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, pr: 1, pb: 1 }}>
                <img src={metadata['og:image']} height="auto" width="100%"/>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ pb:1, ml: 1 }}>
                    <Button color="primary" size="small" variant="outlined" component="label">
                        Upload
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
            overflow: 'scroll', 
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
            </Grid>
        </Grid>
    )
}

export default Settings;

