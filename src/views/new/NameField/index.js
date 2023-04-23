import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import {
	InputAdornment,
	TextField,
	Grid,
	Alert,
	Chip,
	Button,
	DialogActions,
	Dialog,
	DialogContent,
	IconButton,
} from '@mui/material'
import { getUrl } from 'utils/url'
import { getProjectById, createProject } from 'api/project'
import { UPDATE_APP, LOADER, SET_PROJECT } from 'store/actions'
import { useNavigate } from 'react-router-dom'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import EditIcon from '@mui/icons-material/Edit'
import HtmlTooltip from 'views/builder/HtmlTooltip'
import { getDefaultMetadataForProject } from 'utils/project'

const NameField = ({ principal }) => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const appState = useSelector((state) => state.app)
	const loading = useSelector((state) => state.loader.show)
	const [appName, setAppName] = useState(appState.name)
	const [appSubdomain, setAppSubdomain] = useState(appState.subdomain)
	const [error, setError] = useState()
	const [showEditor, setShowEditor] = useState(false)

	const generateSubdomain = async (name) => {
		setError();
		if (!name || name.length < 4) {
			setError('Project name and subdomain must be at least 4 characters long')
			return
		}
		if (name.length > 30) {
			setError('Project name cannot be longer than 30 characters')
			return
		}
		const regexp = /^[a-zA-Z0-9- ]+$/;
		if (name.search(regexp) === -1) {
			setError('Can only contain letters, numbers, spaces and hyphens')
			return
		}
		const prefix = name.replace(/\s/g, "").toLowerCase()
		setAppSubdomain(prefix)
		setAppName(name)
		try {
			const projectId = prefix
			dispatch({ type: LOADER, show: true })
			const found = await getProjectById({ projectId, principal })
			dispatch({ type: LOADER, show: false })
			setError(
				found?.id
					? "Project subdomain taken, please select a different subdomain"
					: null
			);
			return
		} catch (e) {
			// Not found any project, good to go
		}

	}

	const canCreate = appName && !error && !loading

	const onCreateProject = async () => {
		dispatch({ type: LOADER, show: true })
		const appData = {
			name: appName,
			subdomain: appSubdomain,
			domain: null,
			plan: null,
			collaborators: []
		}
		appData.metadata = getDefaultMetadataForProject(appData)
		try {
			await createProject({ appData, principal })
			const project = await getProjectById({ projectId: appData.subdomain, principal })
			dispatch({ type: SET_PROJECT, project })
			dispatch({ type: UPDATE_APP, configuration: { new: true } })
			navigate(`/e/${project?.id}`)
		} catch(e) {
			console.log(e)
		} finally {
			dispatch({ type: LOADER, show: false })
		}
	}

	const urlTooltip = "Your project's globally unique subdomain, used as your URL. You cannot change your project subdomain after project creation"

	return (
		<Grid
			container
			direction="row"
			justifyContent="left"
			alignItems="left"
			spacing={2}
		>
			<Grid item xs={12}>
				<TextField
					fontSize="3em"
					placeholder="Enter your project name"
					variant="standard"
					defaultValue={appName}
					fullWidth
					onChange={(e) => generateSubdomain(e.target.value)}
					autoFocus
					sx={{
						input: {
							"&::placeholder": {
								fontSize: 34,
								fontWeight: "lighter",
								color: "#888"
							}
						}
					}}
					inputProps={{
						style: {
							fontSize: 40,
							color: theme.palette.primary.dark
						}
					}}
					InputProps={{
						endAdornment: (
						  <InputAdornment position="end">
							<IconButton edge="end" color="primary" size="large" disabled={!canCreate}
								onClick={onCreateProject}
							>
							  <ArrowCircleRightIcon sx={{ fontSize:'1.75em'}} />
							</IconButton>
						  </InputAdornment>
						),
					  }}
					
				/>
			</Grid>
			<Grid item xs={12}>
			<HtmlTooltip title={urlTooltip} placement="right-start">
					<Chip
						icon={
							<EditIcon
								sx={{
									fontSize: "1.2em",
									paddingLeft: 1,
									width: 25,
									opacity: 1
								}}
							/>
						}
						sx={{
							color: '#444'
						}}
						label={getUrl(appSubdomain)}
						variant="outlined"
						onClick={() => setShowEditor(true)}
					/>
				</HtmlTooltip>
			</Grid>
			<Grid item xs={12} sx={{ p: 0, minHeight: 44 }}>
				{error && (
					<Alert variant="outlined" severity="error"
						sx={{
							fontSize: "1em",
							height: 28,
							border: 0,
							color: "#c62828"
						}}
					>
						{error}
					</Alert>
				)}
			</Grid>

			<Dialog open={showEditor} onClose={() => showEditor(false)}>
				<DialogContent>
					<TextField autoFocus margin="dense" id="name" label="Edit Project Subdomain" type="text"
						fullWidth
						sx={{ minWidth: 300 }}
						size="large"
						variant="standard"
						defaultValue={appSubdomain}
						onChange={(e) => {
							generateSubdomain(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions sx={{ px: 3 }}>
					<Button variant="outlined" color="primary" onClick={() => setShowEditor(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	)
}

export default NameField
