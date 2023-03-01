import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery,
	Button
} from "@mui/material";

// project imports
import { drawerWidth } from "store/constant";
import Sidebar from "layout/ProfileLayout/Sidebar";
import { SET_MENU } from "store/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "common/Logo";
import { Magic } from 'magic-sdk';
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			[theme.breakpoints.up("md")]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`
			},
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px"
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
				marginRight: "10px"
			}
		}),
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0,
			borderRadius: "8px",
			border: "1px solid rgba(144, 202, 249, 0.16)",
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px"
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px"
			}
		})
	})
);

// ==============================|| MAIN LAYOUT ||============================== //

const ProfileAdmin = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

	// Handle left drawer
	const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const dispatch = useDispatch();
	const handleLeftDrawerToggle = () => {
		dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
	};

	useEffect(() => {
		dispatch({ type: SET_MENU, opened: !matchDownMd });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);

	const logout = async () => {
		await m.user.logout();
		navigate('/');
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none"
				}}
			>
				<Toolbar>
					<Box sx={{ width: 150 }}>
						<Logo />
					</Box>
					<Box display="flex" flexGrow={1} />
					<Button
						disableElevation
						variant="contained"
						color="primary"
						size="small"
						onClick={logout}
						endIcon={<LogoutIcon />}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<Sidebar
				drawerOpen={leftDrawerOpened}
				drawerToggle={handleLeftDrawerToggle}
			/>

			{/* main content */}
			<Main theme={theme} open={leftDrawerOpened}>
				{/* breadcrumb */}
				{<Outlet />}
			</Main>
			{/* <SidePanel /> */}
			
		</Box>
	);
};

export default ProfileAdmin;
