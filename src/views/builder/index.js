/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Grid, Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import { IconSettings, IconPlus, IconFiles, IconTemplate, IconPhoto } from '@tabler/icons'
import { Editor } from 'editor'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_APP } from 'store/actions'
import SidePanel from 'views/builder/SidePanel'
import Logo from 'common/Logo'
import PublishButton from './PublishButton'
import DraggableDialog from './DraggableDialog'
import HtmlTooltip from './HtmlTooltip'
import constants from 'constant'
import Modal from 'views/templates'
import TooltipFragment from 'views/builder/TooltipFragment'
const { SECTION, PATH, EVENTS } = constants

const EditorView = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [openDialog, setOpenDialog] = useState(false);
	const [open, setOpen] = useState();

	const appState = useSelector((state) => state.app);
	const account = useSelector((state) => state.account)
	const project = useSelector((state) => state.editor.project)
	const editor = useSelector((state) => state.editor.editor)

	useEffect(() => {
		document.addEventListener(EVENTS.TOGGLE_SETTINGS_MODAL, () => setOpenDialog(true));
		document.addEventListener(EVENTS.TOGGLE_ASSETS_MODAL, () => setOpen(SECTION.MEDIA));
		return () => {
			document.removeEventListener(EVENTS.TOGGLE_SETTINGS_MODAL, () => {});
			document.removeEventListener(EVENTS.TOGGLE_ASSETS_MODAL, () => {});
		}
	}, [])

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
									className="title-text"
								>
									<HtmlTooltip title={<TooltipFragment section={SECTION.DASHBOARD} />} placement="right-start">
										<Button
											color="inherit"
											component={RouterLink}
											to={PATH.LOGIN}
										>
											<Logo />
										</Button>
									</HtmlTooltip>
									{project?.name}
								</Typography>
								<PublishButton	principal={account.principal}
												project={project}
								/>
							</Toolbar>
						</AppBar>
					</Box>
				</Grid>
				<Grid item>
					<Grid container direction="row" sx={{ height: 'calc(100vh - 55px)' }} id="sideMenu">
						<Grid item sx={{
							background:'white', 
							width: '60px', 
							boxShadow: open ? '0px' :'5px 0px 5px -5px rgba(0,0,0,0.25);', 
							zIndex: 1201
						}}>
							<Grid container sx={{ px: '5px', py: '35px' }}>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.BLOCKS} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.BLOCKS ? SECTION.BLOCKS : null)}>
											<IconPlus />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.PAGES} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.PAGES ? SECTION.PAGES : null)}>
											<IconFiles />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.SETTINGS} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.SETTINGS ? SECTION.SETTINGS : null)}>
											<IconSettings />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.TEMPLATE} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.TEMPLATE ? SECTION.TEMPLATE : null)}>
											<IconTemplate />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.MEDIA} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => setOpen(open !== SECTION.MEDIA ? SECTION.MEDIA : null)}>
											<IconPhoto />
										</IconButton>
									</HtmlTooltip>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs sx={{ py: '15px', px: '30px'}}>
							<Editor project={project} 
									onClickHome={() => navigate(PATH.LOGIN, { replace: true })} 
									principal={account.principal} 
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<SidePanel open={open} principal={account.principal} project={project} editor={editor} onLeave={() => setOpen()} />
			<Modal  open={appState.new} 
					onLeave={() => {
						dispatch({
							type: UPDATE_APP,
							configuration: { new: false }
						})
					}} 
					editor={editor} 
					principal={account.principal}
			/>
			<DraggableDialog open={openDialog} editor={editor} handleClose={() => setOpenDialog(false)}></DraggableDialog>
		</>
	)
}

export default EditorView
