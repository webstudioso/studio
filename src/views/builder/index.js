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
import HelpButton from './HelpButton'
const { SECTION, PATH, EVENTS, REPO_URL } = constants

const EditorView = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [openDialog, setOpenDialog] = useState(false)
	const [openCategory, setOpenCategory] = useState()
	const [open, setOpen] = useState(false)

	const appState = useSelector((state) => state.app)
	const account = useSelector((state) => state.account)
	const project = useSelector((state) => state.editor.project)
	const editor = useSelector((state) => state.editor.editor)

	useEffect(() => {
		document.addEventListener(EVENTS.TOGGLE_SETTINGS_MODAL, () => setOpenDialog(true));
		document.addEventListener(EVENTS.TOGGLE_ASSETS_MODAL, () => handleOpenSidePanel(SECTION.MEDIA));
		return () => {
			document.removeEventListener(EVENTS.TOGGLE_SETTINGS_MODAL, () => {});
			document.removeEventListener(EVENTS.TOGGLE_ASSETS_MODAL, () => {});
		}
	}, [])

	const handleOpenSidePanel = (section) => {
		if (!section) {
			handleCloseSidePanel()
			return
		}
		setOpen(true)
		setOpenCategory(section)
	}

	const handleCloseSidePanel = () => {
		setOpen(false)
		setOpenCategory()
	}

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
									<strong>{project?.name}</strong>
									{/* <strong>Webstudio</strong> */}
								</Typography>
								<Button color="primary" onClick={() => window.open(REPO_URL, '__blank')}>
									BETA Version {process.env.REACT_APP_VERSION}
								</Button>
								<Box flexGrow={1} display />
								<PublishButton	principal={account.principal}
												project={project}
												editor={editor}
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
										<IconButton color="primary" size="large" onClick={() => handleOpenSidePanel(openCategory !== SECTION.BLOCKS ? SECTION.BLOCKS : null)}>
											<IconPlus />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.PAGES} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => handleOpenSidePanel(openCategory !== SECTION.PAGES ? SECTION.PAGES : null)}>
											<IconFiles />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.SETTINGS} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => handleOpenSidePanel(openCategory !== SECTION.SETTINGS ? SECTION.SETTINGS : null)}>
											<IconSettings />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.TEMPLATE} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => handleOpenSidePanel(openCategory !== SECTION.TEMPLATE ? SECTION.TEMPLATE : null)}>
											<IconTemplate />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HtmlTooltip title={<TooltipFragment section={SECTION.MEDIA} />} placement="right-start">
										<IconButton color="primary" size="large" onClick={() => handleOpenSidePanel(openCategory !== SECTION.MEDIA ? SECTION.MEDIA : null)}>
											<IconPhoto />
										</IconButton>
									</HtmlTooltip>
								</Grid>
								<Grid item xs={12}>
									<HelpButton />
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
			<SidePanel open={open} openCategory={openCategory} principal={account.principal} project={project} editor={editor} onLeave={handleCloseSidePanel} />
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
