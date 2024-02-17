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
import { trackEvent } from 'utils/analytics'
import { useIntl } from 'react-intl'
import { getDefaultMetadataForProject, getProjectUrl } from 'utils/project'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import EditIcon from '@mui/icons-material/Edit'
import HtmlTooltip from 'views/builder/HtmlTooltip'
import constants from 'constant'
import { notifyDiscordWebhook } from 'api/discord'
import { showError, showSuccess } from 'utils/snackbar'
const { ANALYTICS } = constants

const NameField = ({ principal }) => {
	const intl = useIntl()
	const theme = useTheme()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const appState = useSelector((state) => state.app)
	const account = useSelector((state) => state.account)
	const loading = useSelector((state) => state.loader.show)
	const [appName, setAppName] = useState(appState.name)
	const [appSubdomain, setAppSubdomain] = useState(appState.subdomain)
	const [error, setError] = useState()
	const [showEditor, setShowEditor] = useState(false)

	const generateSubdomain = async (name) => {
		setError();
		if (!name || name.length < 4) {
			setError(intl.formatMessage({ id: "new_page.error_min_length" }))
			return
		}
		if (name.length > 30) {
			setError(intl.formatMessage({ id: "new_page.error_max_length" }))
			return
		}
		const regexp = /^[a-zA-Z0-9- ]+$/;
		if (name.search(regexp) === -1) {
			setError(intl.formatMessage({ id: 'new_page.error_invalid_character' }))
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
					? intl.formatMessage({ id: 'new_page.error_subdomain_taken' }) 
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
		appData.metadata = getDefaultMetadataForProject({ project: appData })
		try {
			await createProject({ appData, principal })
			const project = await getProjectById({ id: appData.subdomain, principal })
			dispatch({ type: SET_PROJECT, project })
			dispatch({ type: UPDATE_APP, configuration: { new: true } })
			trackEvent({ name: ANALYTICS.CREATE_PROJECT, params: account.user })
			
			notifyDiscordWebhook({
                username: account.user.email,
                avatar_url: project?.metadata['icon'],
                content: 'Project created',
                name: account?.user?.issuer,
                title: project?.name,
                url: getProjectUrl({ project }),
                color: 14177041,
                issuer: account?.user?.issuer,
                subdomain: project?.subdomain,
                image: project?.metadata['og:image']
            })
			showSuccess({ dispatch, message: intl.formatMessage({ id: 'discord_event.project_created' })})
			navigate(`/e/${project?.id}`)
		} catch(e) {
			console.log(e)
			showError({ dispatch, error: e.message })
		} finally {
			dispatch({ type: LOADER, show: false })
		}
	}

	const urlTooltip = intl.formatMessage({ id: "new_page.subdomain_tooltip" })

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
					placeholder={intl.formatMessage({ id: "new_page.input_placeholder" })}
					variant="standard"
					defaultValue={appName}
					className="text-gray-900"
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
						},
						root: {
							color: 'red',
							"& .MuiOutlinedInput-root": {
							  "& fieldset": {
								borderColor: "rgba(0, 0, 0, 0.23)"  // default
							  },
							  "&.Mui-focused fieldset": {
								border: "2px solid red"             // focus
							  }
							}
						  }
					}}
					inputProps={{
						style: {
							fontSize: 34,
							fontWeight: "lighter",
							color: "#888"
						},
						root: {
							color: 'red',
							"& .MuiOutlinedInput-root": {
							  "& fieldset": {
								borderColor: "rgba(0, 0, 0, 0.23)"  // default
							  },
							  "&.Mui-focused fieldset": {
								border: "2px solid red"             // focus
							  }
							}
						  }
					}}
					InputProps={{
						endAdornment: (
						  <InputAdornment position="end">
							<IconButton edge="end" color="primary" disabled={!canCreate} onClick={onCreateProject}>
							  <ArrowCircleRightIcon className={`text-4xl cursor-pointer`}/>
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
					<Alert variant="standard" severity="error" className="text-red-500 border-red-100 border">
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
					<Button variant="outlined" color="primary" onClick={() => setShowEditor(false)}>{intl.formatMessage({ id:'close' })}</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	)
}

export default NameField
