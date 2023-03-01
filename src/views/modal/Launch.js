/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { 
    Box, 
    Grid, 
    Paper, 
    Button, 
    Typography,
    TextField,
    Container,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { Magic } from 'magic-sdk';
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

const Launch = ({ handleClose, editor, principal, projectId }) => {
    const [expanded, setExpanded] = useState(false);
    const [project, setProject] = useState();
    const [metadata, setMetadata] = useState(DEFAULT_METADATA);
    const [deploymentCid, setDeploymentCid] = useState();
    const [newDomain, setNewDomain] = useState();
    const loading = useSelector((state) => state.loader.show);
    const dispatch = useDispatch();

    const loadProject = async () => {
        
        try {
            dispatch({ type: LOADER, show: true });
            const currentProject = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
                {
                    headers: {
                    "AuthorizeToken": `Bearer ${principal}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    }
                }
            );
            setProject(currentProject?.data);
            const mData = currentProject?.data?.metadata;
            if (mData) {
                setMetadata(mData);
            }
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    };

    useEffect(() => {
        loadProject();
        setDeploymentCid();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const publishRouting = async (id, cid) => {
        return await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/route/${id}`,
          {
            id: id,
            cid: cid
          },
          {
            headers: {
              "AuthorizeToken": `Bearer ${principal}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        )
    }

    const publish = async () => {
        try {
            dispatch({ type: LOADER, show: true });
            handleChange('no-panel');
            const pageManager = editor.Pages;
            const currentPageId = pageManager.getSelected().id;
    
            const metaTags = Object.keys(metadata).map((key) => {
                const val = metadata[key];
                return `
                    <meta name="${key}" content="${val}"></meta>
                    <meta property="${key}" content="${val}"></meta>
                `
            });
            metaTags.push(`
                <title>${metadata.description}</title>
                <link rel="icon" sizes="192x192" href="">
                <link rel="shortcut icon" href="${metadata.icon}" type="image/png">
                <link rel="apple-touch-icon" href="${metadata.icon}" type="image/png">
            `)

            const allPages = [];
            pageManager.getAll().forEach(async (page) => {
    
              pageManager.select(page.id);
              const pageName = page.attributes?.type === 'main' ? 'index' : page.attributes?.name;
              const body = page.getMainComponent().toHTML();
    
              const functionalBody = body.replace(
                '</body>', 
                `<script>
                    ${editor.getJs()}
                  </script>
                </body>`
              ).replace('<video', '<video autoplay');

              const content = `
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    ${metaTags.join('')}
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                    />
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"></script>
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/webstudio-sdk@0.0.6/dist/main.min.js"></script>
                    <style>
                        html {
                            scroll-behavior: smooth;
                        }
                        ${editor.getCss()}
                    </style>
                  </head>
                  ${functionalBody}
                </html>`;
    
                allPages.push({
                  path: `${pageName}.html`,
                  content:btoa(unescape(encodeURIComponent(content)))
                });
            });
    
            // Return to original selected page
            pageManager.select(currentPageId);
    
            const upload = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
                allPages,
                {
                  headers: {
                    "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
                    "Content-Type": "application/json",
                    "accept": "application/json"
                  }
                }
            )
    
            const indexPage = upload?.data?.find((item) => item.path.includes('/index.html'));
            const cid = indexPage.path.split('/')[4];
    
            // Register in AWS deploy
            const defaultSubdomain = getWebstudioUrl();
            await publishRouting(defaultSubdomain, cid);
    
            // Custom domain?
            const defaultDomain = project?.domain;
            if (defaultDomain) {
              await publishRouting(defaultDomain, cid);
            }

            setDeploymentCid(cid);
            
            dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: 'Upload successful',
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "success"
			});

          } catch (e) {
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
    };

    const queryParams = () => {
        const t = Math.floor(Math.random() * 100000);
        return `?t=${t}`;
    };

    const getUrl = () => {
        let url = '';
        if (project?.domain)
            url = `https://${project.domain}`;
        return url;
    };

    const getWebstudioUrl = () => {
        return process.env.REACT_APP_HOST_ENV === 'dev' ?
        `${projectId}.dev.webstudio.so` :
        `${projectId}.webstudio.so`;
    };

    const getCidUrl = () => {
        return `https://ipfs.moralis.io:2053/ipfs/${deploymentCid}/index.html`;
    };

    const confirmationDeployment =  deploymentCid && (                  
        <Grid item xs={12} md={6}>
            <Paper elevation={10} sx={{ background: '#1E1E30'  }}>
                <Container sx={{ p: 2}}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                    🎉 🎉 🎉 Congratulations, your new version is now live! 🎉 🎉 🎉 
                    </Typography>
                    <Typography variant="h4">
                        IPFS CID: <a style={{color: 'white'}}  href={getCidUrl()}  target="__blank">{deploymentCid}</a>
                    </Typography>
                    <Typography variant="h4">
                        Webstudio URL: <a style={{color: 'white'}} href={`https://${getWebstudioUrl()}${queryParams()}`} target="__blank">{`https://${getWebstudioUrl()}`}</a>
                    </Typography>
                    <Typography  variant="h4">
                        Custom URL: <a style={{color: 'white'}}  href={`${getUrl()}${queryParams()}`}  target="__blank">{getUrl()}</a>
                    </Typography>
                    <TwitterShareButton
                        title={
                            "We have just launched a new version of our dApp, take a look! powered by @Webstudioso 🤩"
                        }
                        url={`${getUrl()}` || `https://${getWebstudioUrl()}`}
                        hashtags={["Web3", "Web3Community", "NoCode"]}
                    >
                        <Grid
                            container
                            direction="row"
                            spacing={1}
                            sx={{ margin: "5px auto" }}
                        >
                            <Grid item>
                                <TwitterIcon size={32} round />
                            </Grid>
                            <Grid item>
                                <Box sx={{ height: 32, pt: "8px" }}>
                                    Share with your community!
                                </Box>
                            </Grid>
                        </Grid>
                    </TwitterShareButton>

                </Container>
            </Paper>
        </Grid>
    );

    const alertMessage = (
        <Grid item>
            <Alert variant="contained" severity="warning">
                Please review your settings before publishing a new version of this project as it will
                go live for all users. When you are ready, click publish below! Once published,
                a new IPFS CID will appear, make sure you copy it for your own records!
                If you need help or support you can always reach us out in our 
                <a style={{ color: 'white', marginLeft: '5px' }} href="https://discord.gg/CYYX8yUVgc" target="__blank">discord channel</a>
            </Alert>
        </Grid>
    );

    const postMessageToDiscord = async (message) => {
        try {
            dispatch({ type: LOADER, show: true });
            const { email, issuer } = await m.user.getMetadata();

            const payload = {
                username: "Custom Domain Request",
                avatar_url: "https://i.ibb.co/gtqZpcR/webstudiologo512-copy.png",
                embeds: [
                {
                    author: {
                    name: email
                    },
                    title: newDomain,
                    url: `https://${getWebstudioUrl()}${queryParams()}`,
                    description: `Custom domain requested`,
                    color: 15258703,
                    fields: [
                    {
                        name: "Owner",
                        value: issuer,
                        inline: true,
                    },
                    {
                        name: "Subdomain",
                        value: projectId,
                        inline: true,
                    }
                    ]
                },
                ],
            };

            const options = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(process.env.REACT_APP_DISCORD_WEBHOOK, options)
                .then((response) => response.json());
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Request submitted, the team will contact you within 48 hours to your email',
                variant: "alert",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                alertSeverity: "success"
            });

        } catch (e) {
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

        try {
            dispatch({ type: LOADER, show: true });
            await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}/metadata`,
                metadata,
                {
                    headers: {
                        "AuthorizeToken": `Bearer ${principal}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            )
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Metadata saved',
                variant: "alert",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                alertSeverity: "success"
            });
            loadProject();
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

    const metaItems = !loading && (
        <Grid container fullWidth spacing={2}>
            { Object.keys(metadata).map((key) => {
                const value = metadata[key];
                return (
                    <Grid item xs={6} key={key}>
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
            <Grid item xs={12}>
                <Button fullWidth 
                        variant="outlined" 
                        size="large"
                        onClick={handleSaveMetadata}> Save Metadata Changes</Button>
            </Grid>
        </Grid>
    );

    const domains = (
        <Container sx={{ py: 2}}>
            <Typography variant="h4">
                Webstudio Subdomain: 
                <a  style={{color: 'white', marginLeft: '10px'}} 
                    href={`https://${getWebstudioUrl()}${queryParams()}`} 
                    target="__blank"
                >
                    {`https://${getWebstudioUrl()}`}
                </a>
            </Typography>
            <Typography  variant="h4" sx={{ mb: 2 }}>
                Custom Domain: 
                <a  style={{color: 'white', marginLeft: '10px' }}  
                    href={`${getUrl()}${queryParams()}}`}  
                    target="__blank"
                >
                    {getUrl()}
                </a>
            </Typography>

            { project?.plan && (
                <TextField  id="outlined-basic" 
                            label="Request a new custom domain" 
                            variant="standard" 
                            defaultValue={project?.domain}
                            autoFocus
                            sx={{ minWidth: 200, mr: 2 }}
                            onChange={(e) => setNewDomain(e.target.value)}
                />
            )}
            { project?.plan && (
                <Button variant="outlined" 
                    sx={{ my: 1 }}
                    disabled={loading}
                    onClick={() => {
                        postMessageToDiscord();
                    }}
                >
                    Submit Request
                </Button>
            )}

            <Alert variant="contained" severity="warning" sx={{ mt: 2 }}>
                Once you request a custom domain, our team will reach out to you via email to help 
                you set it up within a day. Only for Premium subscriptions. If you want to learn more join us on our 
                <a style={{ color: 'white', marginLeft: '5px' }} href="https://discord.gg/CYYX8yUVgc" target="__blank">discord channel</a>
            </Alert>
        </Container>
    );

    return (
        <Grid container sx={{ p: 2 }}>
            <Paper elevation={5} sx={{ p: 5, m: '0 auto', borderRadius: 2 }}>
                <Grid container direction="column" spacing={2} padding={5}>
                    <Grid item xs={12}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Domains
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Manage all your domains right here</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {domains}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>WebApp Settings</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Identity and SEO attributes for visibility
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {metaItems}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Preview
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Configuration and layout preview
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Coming soon...
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    {alertMessage}
                    {confirmationDeployment}
                    <Grid item>
                        <Button disabled={loading} 
                            variant="contained" 
                            fullWidth 
                            size="large" 
                            onClick={publish}
                        >
                            Publish
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default Launch;
