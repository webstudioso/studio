import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, LinearProgress, Chip, TextField, InputAdornment, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { Magic } from 'magic-sdk'
import { getQueryParam } from 'utils/url'
import { showError } from 'utils/snackbar'
import { LOGIN, SET_PROJECT, THEME_LOCALE, SET_SUPPORTED_NETWORKS, SET_TEMPLATES, SET_LOGO, SET_REFERRAL } from 'store/actions'
import { getAllProjects } from 'api/project'
import { getMemoedProject } from 'utils/project'
import { trackEvent } from 'utils/analytics'
import { getSubscription } from 'api/subscription'
import { loadSupportedNeworks } from 'api/networks'
import { FormattedMessage, useIntl } from 'react-intl'
import constants from 'constant'
import { getMyTemplates, getTemplates } from 'api/template'

const { 
	SESSION_DURATION_SEC, 
	QUERY_PARAMS,  
	PATH, 
	ANALYTICS, 
	DEFAULT_LOCALE 
} = constants

const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY)

const Login = () => {
	const intl = useIntl()
	const [existingProject] = useState(getMemoedProject())
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState()

	const logo = useSelector((state) => state.customization.logo)

	const setLanguage = () => {
		const queryLocale = getQueryParam(QUERY_PARAMS.LOCALE)
		if (queryLocale)
			localStorage.setItem(QUERY_PARAMS.LOCALE, queryLocale)
		const locale = localStorage.getItem(QUERY_PARAMS.LOCALE, DEFAULT_LOCALE)
		dispatch({ type: THEME_LOCALE, locale });
	}

	const setLogo = () => {
		const queryLogo = getQueryParam(QUERY_PARAMS.LOGO)
		if (queryLogo) {
			localStorage.setItem(QUERY_PARAMS.LOGO, queryLogo)
			const storedLogo = localStorage.getItem(QUERY_PARAMS.LOGO)
			dispatch({ type: SET_LOGO, logo: storedLogo })
		}
	}

	const setReferral = async () => {
		const queryReferral = getQueryParam(QUERY_PARAMS.REFERRAL)
		if (queryReferral) {
			// Is valid referralId?
			const referralSubscription = await getSubscription({ email: queryReferral })
			if (referralSubscription?.email) {
				localStorage.setItem(QUERY_PARAMS.REFERRAL, JSON.stringify(referralSubscription))
			}
		}
		const referral = localStorage.getItem(QUERY_PARAMS.REFERRAL)
		dispatch({ type: SET_REFERRAL, referral: referral ? JSON.parse(referral) : null })
	}

	useEffect(() => {
		setLogo()
		setReferral()
		setLanguage()
		authenticate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	/**
	 * Only users redirected from main website are allowed, providing (uid, name, email and photo)
	 */
	const authenticate = async () => {
		const isAuthenticated = await m?.user?.isLoggedIn()
		if (isAuthenticated) {

			const promisesAuth = [
				m.user.getIdToken({ lifespan: SESSION_DURATION_SEC }),
				m.user.getMetadata()
			]
			const [principal, user] = await Promise.all(promisesAuth)

			const promisesData = [
				getAllProjects({ principal }),
				getSubscription({ email: user.email }),
				getTemplates({ principal }),
				getMyTemplates({ principal, author: user.issuer}),
				loadSupportedNeworks()
			]
			const [projects, subscription, availableTemplates, myTemplates, supportedNetworks] = await Promise.all(promisesData)

			trackEvent({ name: ANALYTICS.APP_OPEN , params: user })
			dispatch({ type: SET_TEMPLATES, ...{ availableTemplates, myTemplates }})

			const account = { user, principal, projects, subscription }
			dispatch({ type: LOGIN, account })
			dispatch({ type: SET_SUPPORTED_NETWORKS, supportedNetworks})
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
		const email = getQueryParam(QUERY_PARAMS.EMAIL)
		if (email) {
			// Authenticate with Magic
			signInWithMagic(email)
		} else {
			// Not authenticated and no email provided, prompt for entering email
			setLoading(false)
		}
	}
	
	const signInWithMagic = async (email) => {
		try {
			setLoading(true)
			await m.auth.loginWithMagicLink({ email })
			authenticate()
		} catch (e) {
			showError({ dispatch, error: e.message })
		}
	}

	const handleEmailChange = async (e) => {
		setUserEmail(e.target.value)
	}

	const signInManual = async () => {
		await signInWithMagic(userEmail)
	}

	const isValidEmail = () => {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
	}

	return (
		<Box className="signin">
			<Box textAlign="center" className="container fade-in bg-container">
				<Box justifyItems="center" marginY={4} height={144}>
					<img src={logo} style={{ margin: '0 auto', maxHeight: 144 }} alt="Logo" className="animate__animated animate__fadeIn animate__delay-1s" />
				</Box>
				<Typography variant="body" className="super-title-text">
					<FormattedMessage id='login_page.app_name' />
				<Chip 	size="small" 
						variant="contained" 
						label={<FormattedMessage id='login_page.app_version' />} 
						className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm py-3 text-center"
						sx={{ ml: 1 }}
				/>
				</Typography>
				<br />
				{ !isLoading && (
					<TextField 	placeholder={ intl.formatMessage( { id: 'login_page.email' }) }
								sx={{ minWidth: 260, my: 2 }}
								autoFocus
								type="email"
								onChange={handleEmailChange}
								onKeyDown={(ev) => {
									if (ev.key === 'Enter' && isValidEmail()) {
										// Do code here
										ev.preventDefault()
										signInManual()
									}
								}}
								InputProps={{
									endAdornment: (
									  <InputAdornment position="end">
											<IconButton edge="end" color="primary" onClick={signInManual} disabled={!isValidEmail()}>
												<LoginIcon />
											</IconButton>
									  </InputAdornment>
									),
								}}>
					</TextField>
				)}
				{ isLoading && (<LinearProgress color="primary" className="progress" />) }
			</Box>
		</Box>
	)
}

export default Login
