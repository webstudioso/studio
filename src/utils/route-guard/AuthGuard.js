import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// project imports
import { useContext, useEffect } from "react";
// import { useMoralis } from "react-moralis";
import { Magic } from 'magic-sdk';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
	// const { isAuthenticated } = useMoralis();
	// const appState = useSelector((state) => state.app);
	// const { user, isAuthenticated } = useMoralis();
	// const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// if (!appState.appId) {
		// 	navigate("/profile", { replace: true });
		// }
		const evalLogin = async() => {
			const loggedIn = await m.user.isLoggedIn();
			if (!loggedIn)
				navigate('/');
		}
		evalLogin();
	}, [navigate]);
	return children;
};

AuthGuard.propTypes = {
	children: PropTypes.node
};

export default AuthGuard;
