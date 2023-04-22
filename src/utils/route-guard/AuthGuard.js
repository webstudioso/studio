import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
	const navigate = useNavigate();
	const account = useSelector((state) => state.account)
	useEffect(() => {
		if (!account?.principal) {
			navigate('/')
		}
	}, [navigate])

	return children;
}

AuthGuard.propTypes = {
	children: PropTypes.node
}

export default AuthGuard
