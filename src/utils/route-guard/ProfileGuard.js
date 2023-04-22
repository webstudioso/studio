import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// project imports
import { useEffect } from "react";
import { Magic } from 'magic-sdk';
import { getUrl } from "utils/url";
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const ProfileGuard = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const evalLogin = async() => {
			const loggedIn = await m.user.isLoggedIn();
			if (!loggedIn)
				navigate(getUrl());
		}

		evalLogin();
	}, [navigate]);

	return children;
};

ProfileGuard.propTypes = {
	children: PropTypes.node
};

export default ProfileGuard;
