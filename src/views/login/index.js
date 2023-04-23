import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography, LinearProgress } from '@mui/material'
import { Magic } from 'magic-sdk'
import { getUrl } from 'utils/url'
import { showError } from 'utils/snackbar'
import constants from 'constant'
import { LOGIN } from 'store/actions'
import { getAllProjects } from 'api/project'

const { PATH } = constants
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY)

const Login = () => {
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
			const principal = await m.user.getIdToken()
			const user = await m.user.getMetadata(principal)
			const projects = await getAllProjects({ principal })
			dispatch({ type: LOGIN, payload: { user , principal, projects }})
			if (projects && projects.length > 0) {
				// Has some projects created
				navigate(PATH.ADMIN)
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
			<Box textAlign="center" className="container fade-in">
				<Typography variant="body" className="title-text">
					Loading <strong>Webstudio</strong>
				</Typography>
				<LinearProgress className="progress" />
			</Box>
		</Box>
	)
}

export default Login
