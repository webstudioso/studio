/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { Editor } from "editor";
import Modal from 'views/templates';
import { Magic } from 'magic-sdk';
import { useDispatch, useSelector } from "react-redux";
import { LOADER, SNACKBAR_OPEN, UPDATE_APP } from "store/actions";
import SidePanel from 'views/builder/SidePanel';

import { Grid, Box, AppBar, Toolbar, Typography, IconButton, Stack, Button } from "@mui/material";
import { IconChecks, IconSettings, IconPlus, IconFiles, IconPalette, IconInfoCircle, IconTemplate, IconShoppingCart, IconPhoto } from '@tabler/icons';
import Logo from 'common/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import PublishButton from './publishButton';
import DraggableDialog from './draggableDialog';
import HtmlTooltip from './HtmlTooltip';

import constants from 'constant';
import InfoButton from './InfoButton';
const { SECTION, PATH } = constants;
// import { TITLE } from constants.SIDEPANEL;


const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [editor, setEditor] = useState();
	const [principal, setPrincipal] = useState();
	const [eventName, setEventName] = useState('toggleTemplates');
	const [openDialog, setOpenDialog] = useState(false);

	const [open, setOpen] = useState();


	const appState = useSelector((state) => state.app);
	const account = useSelector((state) => state.account)
	console.log(appState)


	const [templatePickerModal, setTemplatePickerModal] = useState(true);

	const handleEvent =  (event) =>  {
		setEventName(event.type);
		setEditor(event.detail)
	}

	const handleAssetUploadStart = () => {
		dispatch({ type: LOADER, show: true });
	}

	const handleAssetUploadEnd = () => {
		dispatch({ type: LOADER, show: false });
		dispatch({
			type: SNACKBAR_OPEN,
			open: true,
			message: "Uploaded",
			variant: "alert",
			anchorOrigin: { vertical: "bottom", horizontal: "right" },
			alertSeverity: "success"
		});
	}

	const handleAssetUploadError = () => {
		dispatch({ type: LOADER, show: false });
		dispatch({
			type: SNACKBAR_OPEN,
			open: true,
			message: "Upload failed, please reach out to contact@webstudio.so for help",
			variant: "alert",
			anchorOrigin: { vertical: "bottom", horizontal: "right" },
			alertSeverity: "error"
		});
	}

	const addEditorListeners = () => {
		document.addEventListener('toggleTemplates', handleEvent);
		document.addEventListener('toggleLaunch', handleEvent);
		document.addEventListener('toggleUsers', handleEvent);
		// Modal assets
		document.addEventListener('assetUploadStart', handleAssetUploadStart);
		document.addEventListener('assetUploadEnd', handleAssetUploadEnd);
		document.addEventListener('assetUploadError', handleAssetUploadError);

		document.addEventListener('toggleSettingsModal', () => setOpenDialog(true));
		document.addEventListener('toggleAssetsModal', () => setOpen(SECTION.MEDIA));
	};

	// const loadPrincipal = async () => {
	// 	// 6 hour session in editor
	// 	const idToken = await m.user.getIdToken({ lifespan: 21600 });
	// 	setPrincipal(idToken);
	// };

	const onClickHome = () => {
		navigate(PATH.LOGIN, { replace: true });
	};

	useEffect(() => {
		addEditorListeners();
		// loadPrincipal();
		return () => {
			document.removeEventListener('toggleTemplates', () => {});
			document.removeEventListener('toggleLaunch', () => {});
			document.removeEventListener('toggleUsers', () => {});
			document.removeEventListener('assetUploadStart', () => {});
			document.removeEventListener('assetUploadEnd', () => {});
			document.removeEventListener('assetUploadError', () => {});
			document.removeEventListener('toggleSettingsModal', () => {});
			document.removeEventListener('toggleAssetsModal', () => {});
		}
		
	},[]);

	// const handleClose = () => {
	// 	setEditor();
	// 	setEventName();
	// };

	const editorCanvas = (<Editor projectId={projectId} onClickHome={onClickHome} principal={account.principal} />);

	const addTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Add Elements
				<InfoButton section={SECTION.BLOCKS} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Drag and drop new components into the canvas 👉
            </Typography>
        </Fragment>
    )

	const managePagesTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Manage Pages
				<InfoButton section={SECTION.PAGES} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Select current page, add new and manage existing pages
            </Typography>
        </Fragment>
    )

	const appTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Configure Settings
				<InfoButton section={SECTION.SETTINGS} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Edit SEO settings, metadata tags and launch properties
            </Typography>
        </Fragment>
    )

	const styleTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Edit Style
				<InfoButton section={SECTION.STYLE} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Configure global color palette, fonts and general style
            </Typography>
        </Fragment>
    )

	const templateTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Change Template
				<InfoButton section={SECTION.TEMPLATE} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Replace the current page template. This will discard all changes to the current page
            </Typography>
        </Fragment>
    )

	const mediaTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Media
				<InfoButton section={SECTION.TEMPLATE} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
				Upload images and multimedia to your cloud storage to quickly use them in the editor.
            </Typography>
        </Fragment>
    )


	const homeTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Back to Dashboard
				<InfoButton section={SECTION.DASHBOARD} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
				Manage your apps, view analytics and access learning resources
            </Typography>
        </Fragment>
    )

	const shoppingTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
				Open Marketplace
				<InfoButton section={SECTION.MARKETPLACE} />
			</Typography>
			
            <Typography variant="body" sx={{ mt: '15px' }}>
                Access new free and premium elements and templates built by Webstudio Engineers around the world
            </Typography>
        </Fragment>
    )

	return (
		<>
			<Grid container direction="column">
				<Grid item>
					<Box sx={{ flexGrow: 1 }}>
						<AppBar position="static" sx={{background:'white'}}>
							<Toolbar variant="dense" disableGutters={true}>
								<Typography
									component="div"
									sx={{ flexGrow: 1, textAlign: "left" }}
								>
									<HtmlTooltip title={homeTooltip} placement="right-start">
										<Button
											color="inherit"
											component={RouterLink}
											to={PATH.LOGIN}
										>
											<Logo />
										</Button>
									</HtmlTooltip>
								</Typography>
								<PublishButton	principal={account.principal}
												projectId={projectId}
								/>
							</Toolbar>
						</AppBar>
					</Box>
				</Grid>
				<Grid item>
					<Grid container direction="row" sx={{ height: 'calc(100vh - 50px)' }} id="sideMenu">
						<Grid item sx={{
							background:'white', 
							width: '60px', 
							boxShadow: open ? '0px' :'5px 0px 5px -5px rgba(0,0,0,0.25);', 
							zIndex: 1201
						}}>
							<Grid container sx={{ px: '5px', py: '35px' }}>
								<Grid item xs={12}>
									<HtmlTooltip title={addTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.BLOCKS ? SECTION.BLOCKS : null)}>
											<IconPlus />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={managePagesTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.PAGES ? SECTION.PAGES : null)}>
											<IconFiles />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								{/* <Grid item xs={12}>
									<HtmlTooltip title={styleTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.STYLE ? SECTION.STYLE : null)}>
											<IconPalette />
										</IconButton>
									</HtmlTooltip>
								</Grid> */}
								<Grid item xs={12}>
									<HtmlTooltip title={appTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.SETTINGS ? SECTION.SETTINGS : null)}>
											<IconSettings />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={templateTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.TEMPLATE ? SECTION.TEMPLATE : null)}>
											<IconTemplate />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={mediaTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.MEDIA ? SECTION.MEDIA : null)}>
											<IconPhoto />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								{/* <Grid item xs={12}>
									<HtmlTooltip title={shoppingTooltip} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(SECTION.MARKETPLACE)}>
											<IconShoppingCart />
										</IconButton>
									</HtmlTooltip>
								</Grid> */}
							</Grid>
						</Grid>
						<Grid item xs sx={{ py: '15px', px: '30px'}}>
							{projectId && editorCanvas}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<SidePanel open={open} principal={account.principal} projectId={projectId} onLeave={() => setOpen()} />
			<Modal  open={appState.new} 
					onLeave={() => {
						dispatch({
							type: UPDATE_APP,
							configuration: { new: false }
						})
						console.log("dispatched?")
					}} 
					editor={editor} 
					event={eventName} 
					principal={account.principal}
					projectId={projectId}
			/>
			<DraggableDialog open={openDialog} handleClose={() => setOpenDialog(false)}></DraggableDialog>
		</>
	);
};

export default EditorView;
