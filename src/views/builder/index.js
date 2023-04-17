/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { Editor } from "editor";
import Modal from "views/modal";
import { Magic } from 'magic-sdk';
import { useDispatch } from "react-redux";
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import SidePanel from 'layout/SidePanel';
import { Grid, Box, AppBar, Toolbar, Typography, IconButton, Stack, Button } from "@mui/material";
import { IconChecks, IconSettings, IconPlus } from '@tabler/icons';
import Logo from 'common/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import PublishButton from './publishButton';

const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const EditorView = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [editor, setEditor] = useState();
	const [principal, setPrincipal] = useState();
	const [eventName, setEventName] = useState();
	const [open, setOpen] = useState(false);

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
	};

	const loadPrincipal = async () => {
		// 6 hour session in editor
		const idToken = await m.user.getIdToken({ lifespan: 21600 });
		setPrincipal(idToken);
	};

	const onClickHome = () => {
		navigate("/profile/projects", { replace: true });
	};

	useEffect(() => {
		addEditorListeners();
		loadPrincipal();
		return () => {
			document.removeEventListener('toggleTemplates', () => {});
			document.removeEventListener('toggleLaunch', () => {});
			document.removeEventListener('toggleUsers', () => {});
			document.removeEventListener('assetUploadStart', () => {});
			document.removeEventListener('assetUploadEnd', () => {});
			document.removeEventListener('assetUploadError', () => {});
		}
	},[]);

	const handleClose = () => {
		setEditor();
		setEventName();
	};

	const editorCanvas = principal && (<Editor projectId={projectId} onClickHome={onClickHome} principal={principal} />);

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
									<Button
										color="inherit"
										component={RouterLink}
										to="/"
									>
										<Logo />
									</Button>
								</Typography>
								<PublishButton	principal={principal}
												projectId={projectId}
								/>
							</Toolbar>
						</AppBar>
					</Box>
				</Grid>
				<Grid item>
					<Grid container direction="row" sx={{ height: 'calc(100vh - 50px)' }} id="sideMenu">
						<Grid item sx={{background:'white', width: '60px', boxShadow: '10px 0px 10px -10px rgba(0,0,0,0.25);'}}>
							<Grid container sx={{ px: '5px', py: '35px' }}>
								<Grid item xs={12}>
									<IconButton color="primary" size="large" onClick={() => setOpen(!open)}>
										<IconPlus />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs sx={{ py: '15px', px: '30px' }}>
							{editorCanvas}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<SidePanel open={open} onLeave={() => setOpen(!open)} />
			<Modal  open={!!editor} 
					handleClose={handleClose} 
					editor={editor} 
					event={eventName} 
					principal={principal}
					projectId={projectId}
			/>
		</>
	);
};

export default EditorView;
