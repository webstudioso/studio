import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery
} from "@mui/material";

// project imports
import Header from "./Header";
import Sidebar from "./Sidebar";
import { drawerWidth } from "store/constant";
import { SET_MENU, UPDATE_APP } from "store/actions";
// import { useMoralis } from "react-moralis";

// assets
import { IconChevronRight } from "@tabler/icons";

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

const MainLayout = () => {
	const { appId } = useParams();

	const theme = useTheme();
	// const { Moralis, user } = useMoralis();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

	// Handle left drawer
	const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const dispatch = useDispatch();
	const handleLeftDrawerToggle = () => {
		dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
	};

	const loadConfig = async () => {
		// const Project = Moralis.Object.extend("Project");
		// const query = new Moralis.Query(Project);
		// query.equalTo("objectId", appId);
		// query.equalTo("owner", user.get("ethAddress"));
		// const appObj = await query.first();
		// const config = appObj?.attributes?.config;
		// dispatch({ type: UPDATE_APP, configuration: config });
	};

	useEffect(() => {
		loadConfig();
	}, []);

	useEffect(() => {
		dispatch({ type: SET_MENU, opened: !matchDownMd });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={4}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none"
				}}
			>
				<Toolbar>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			{/* drawer */}
			<Sidebar
				drawerOpen={leftDrawerOpened}
				drawerToggle={handleLeftDrawerToggle}
			/>

			{/* main content */}
			<Main theme={theme} open={leftDrawerOpened}>
				{/* breadcrumb 
				<Breadcrumbs
					separator={IconChevronRight}
					navigation={navigation}
					icon
					title
					rightAlign
				/>*/}
				<Outlet />
			</Main>
			{/* <SidePanel /> */}
		</Box>
	);
};

export default MainLayout;
