import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography, LinearProgress, Chip } from '@mui/material'
import { Magic } from 'magic-sdk'
import { getUrl } from 'utils/url'
import { showError } from 'utils/snackbar'
import { LOGIN, SET_PROJECT } from 'store/actions'
import { getAllProjects } from 'api/project'
import { getMemoedProject } from 'utils/project'
import { trackEvent } from 'utils/analytics'
import constants from 'constant'
import { getSubscription } from 'api/subscription'
const { SESSION_DURATION_SEC } = constants

const { PATH, ANALYTICS } = constants
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY)

const Login = () => {
	const [existingProject] = useState(getMemoedProject())
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		authenticate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	/**
	 * Only users redirected from main website are allowed, providing (uid, name, email and photo)
	 */
	const authenticate = async () => {
		const isAuthenticated = await m?.user?.isLoggedIn()
		if (isAuthenticated) {
			const principal = await m.user.getIdToken({ lifespan: SESSION_DURATION_SEC })
			const user = await m.user.getMetadata(principal)
			const projects = await getAllProjects({ principal })
			const subscription = await getSubscription({ email: user.email })
			trackEvent({ name: ANALYTICS.VIEW_PAGE , params: user })
			dispatch({ type: LOGIN, payload: { user , principal, projects, subscription }})
			if (projects && projects.length > 0) {
				// Has some projects created
				if (existingProject) {
					dispatch({ type: SET_PROJECT, project: existingProject })
					navigate(`/e/${existingProject?.id}`)
				} else {
					navigate(PATH.ADMIN)
				}
			} else {
				// No projects yet created
				navigate(PATH.CREATE)
			}
		} else {
			authenticateFromQueryParams()
		}
	}

	const authenticateFromQueryParams = () => {
		// From query params we should receive email
		const params = new URLSearchParams(document.location.search)
		const email = params.get('email')
		if (email) {
			// Authenticate with Magic
			signInWithMagic(email)
		} else {
			// Not authenticated and no email provided, return to landing page
			window.location.href = getUrl()
		}
	}
	
	const signInWithMagic = async (email) => {
		try {
			await m.auth.loginWithMagicLink({ email })
			authenticate()
		} catch (e) {
			showError({ dispatch, error: e.message })
		}
	}

	return (
		<Box className="signin">
			<Box textAlign="center" className="container fade-in bg-container">
				<Typography variant="body" className="super-title-text">
					Webstudio
				<Chip 	size="small" 
						variant="contained" 
						label='BETA' 
						className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm py-3 text-center"
						sx={{ ml: 1 }}
				/>
				</Typography>
				<LinearProgress color="primary" className="progress" />
			</Box>
		</Box>
	)
}

export default Login
