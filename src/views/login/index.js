import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography, LinearProgress } from '@mui/material'
import { Magic } from 'magic-sdk'
import { getUrl } from 'utils/url'
import { showError } from 'utils/snackbar'
import constants from 'constant'

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
			navigate(PATH.ADMIN)
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
			navigate(PATH.ADMIN)
		} catch (e) {
			showError({ dispatch, error: e.message })
		}
	}

	return (
		<Box className="signin">
			<Box textAlign="center" className="container fade-in">
				<Typography variant="body" className="text">
					Loading <strong>Webstudio</strong>
				</Typography>
				<LinearProgress className="progress" />
			</Box>
		</Box>
	)
}

export default Login
