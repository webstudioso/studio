import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, useContext } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Tooltip } from "@mui/material";
import AppSection from "common/Logo";
import { SNACKBAR_OPEN, CLEAR_APP } from "store/actions";
// assets
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
// import { useMoralis } from "react-moralis";
import { getUrl } from "utils/url";
import isEmpty from "lodash/isEmpty";
import { saveProject } from "utils/project";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
	const theme = useTheme();
	const appConfiguration = useSelector((state) => state.app);
	// const { user, isAuthenticated, logout, authenticate, Moralis } =
	// 	useMoralis();
	const [hasChanges, setHasChanges] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setHasChanges(true);
	}, [appConfiguration]);

	const publishChanges = async () => {
		try {
			await saveProject({
				project: appConfiguration,
				// provider: Moralis,
				// user: user
			});
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: "Project updated",
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "success"
			});
			setHasChanges(false);
		} catch (e) {
			dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "top", horizontal: "center" },
				alertSeverity: "error"
			});
		}
	};

	const renderAddress = () => {
		// const address = user.get("ethAddress");
		// return `${address.substring(0, 4)}...${address.substring(
		// 	address.length - 8,
		// 	address.length
		// )}`;
	};

	const authUser = () => {
		// authenticate();
	};

	const cleanupState = () => {
		dispatch({ type: CLEAR_APP });
	};

	// const loginButton = isAuthenticated ? (
	// 	<Button
	// 		disableElevation
	// 		variant="contained"
	// 		color="primary"
	// 		size="small"
	// 		onClick={() => {
	// 			logout();
	// 			cleanupState();
	// 		}}
	// 		startIcon={<AccountBalanceWalletTwoToneIcon />}
	// 		endIcon={<LogoutIcon />}
	// 	>
	// 		{renderAddress()}
	// 	</Button>
	// ) : (
	// 	<Button
	// 		disableElevation
	// 		variant="contained"
	// 		color="primary"
	// 		size="small"
	// 		onClick={authUser}
	// 		startIcon={<AccountBalanceWalletTwoToneIcon />}
	// 	>
	// 		Connect Wallet
	// 	</Button>
	// );

	return (
		<>
			<Box
				sx={{
					width: 228,
					display: "flex",
					[theme.breakpoints.down("md")]: {
						width: "auto"
					}
				}}
			>
				{appConfiguration.name && <AppSection />}
			</Box>
			<Button
				color="primary"
				size="small"
				sx={{ mx: 1 }}
				href="/profile/admin"
			>
				Back to profile
			</Button>
			{/* header search */}
			{/* <SearchSection /> */}
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			{/* live customization & localization */}
			{/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
                </Box> */}
			{hasChanges && (
				<Button
					color="secondary"
					variant="contained"
					id="publish-changes-btn"
					size="small"
					sx={{ mx: 1 }}
					onClick={publishChanges}
				>
					Publish Changes
				</Button>
			)}
			<Tooltip title="To view your dApp select first a template and enable it as default landing page">
				<Box>
					<Button
						color="primary"
						size="small"
						disabled={isEmpty(appConfiguration.type)}
						sx={{ mx: 1 }}
						href={getUrl(appConfiguration.subdomain)}
						target="_blank"
						id="view-dapp-btn"
					>
						Visit my dApp
					</Button>
				</Box>
			</Tooltip>
			{/*loginButton*/}
			{/* notification & profile 
            <NotificationSection />
            <ProfileSection /> */}

			{/* mobile header */}
			{/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
		</>
	);
};

Header.propTypes = {
	handleLeftDrawerToggle: PropTypes.func
};

export default Header;
