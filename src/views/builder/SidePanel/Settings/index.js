import { useState } from 'react';
import { Grid, Paper, Button,TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Magic } from 'magic-sdk';
import { getProjectById } from 'api/project';
import { publishMetadata } from 'api/publish';
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);



const DEFAULT_METADATA = {
    "title": "My Super App",
    "description": "This App does X,Y,Z under 50 characters",
    "keywords": "Web3, no code, dapp, builder",
    "author": "Webstudio",
    // Open graph / facebook tags
    "og:locale": "en_US",
    "og:type": "website",
    "og:url": "https://webstudio.so/",
    "og:site_name": "webstudio.so/",
    "article:publisher": "https://webstudio.so/",
    "og:title": "Web3 Builder | Webstudio",
    "og:description": "The simplest way to build and launch web3 apps",
    "og:image": "https://i.ibb.co/L9cpg3y/Screenshot-2022-08-22-at-11-46-45.png",
    // Twitter social tags
    "twitter:card": "summary_large_image",
    "twitter:url": "https://webstudio.so",
    "twitter:title": "Web3 Builder | Webstudio",
    "twitter:description": "The simplest way to build and launch web3 apps",
    "twitter:image": "https://i.ibb.co/L9cpg3y/Screenshot-2022-08-22-at-11-46-45.png",
    "twitter:creator": "@WebstudioWeb3",
    "icon": "https://i.ibb.co/K5YxKKM/logo.png"
};

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
                setMetadata(DEFAULT_METADATA)
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

    const metaItems = metadata && (
        <Grid container fullWidth spacing={2} 
            sx={{ 
                px: 5,
                height: 'calc(100vh - 210px)', 
                overflow: 'scroll', 
            }}>
            { Object.keys(DEFAULT_METADATA).map((key) => {
                const value = metadata[key];
                return (
                    <Grid item xs={12} key={key}>
                        <TextField
                            id={`meta-${key}`}
                            label={key} 
                            variant="standard" 
                            defaultValue={value}
                            onChange={(e) => {
                                const val = e.target.value;
                                const currMeta = {...metadata};
                                currMeta[key] = val;
                                setMetadata(currMeta);
                            }}
                            fullWidth
                        />
                    </Grid>
                )
            })}
        </Grid>
    );


    const handleSaveMetadata = async () => {

        try {
            dispatch({ type: LOADER, show: true });
            await publishMetadata({ id: projectId, principal, metadata  })
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
            {metaItems}
            <Grid item xs={12}>
                <Button fullWidth 
                        disabled={isLoading}
                        variant="outlined" 
                        size="large"
                        onClick={handleSaveMetadata}
                > Save Metadata Changes</Button>
            </Grid>
        </Grid>
    )
}

export default Settings;

