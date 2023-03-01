import { cloneElement, useState, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
	AppBar as MuiAppBar,
	Box,
	Button,
	Container,
	Drawer,
	IconButton,
	Link,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Toolbar,
	Typography,
	useScrollTrigger
} from "@mui/material";

// project imports
// import { useMoralis } from "react-moralis";

// assets
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import DirectionsIcon from "@mui/icons-material/Directions";
import Logo from "common/Logo";

function ElevationScroll({ children, window }) {
	const theme = useTheme();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
		target: window
	});
	const darkBorder = "transparent";

	return cloneElement(children, {
		elevation: trigger ? 2 : 0,
		style: {
			backgroundColor: trigger
				? theme.palette.background.default
				: "transparent",
			borderBottom: trigger ? "none" : "1px solid",
			borderColor: trigger ? "" : darkBorder,
			color: trigger ? theme.palette.text.dark : theme.palette.text.light
		}
	});
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
	const location = useLocation();
	const [drawerToggle, setDrawerToggle] = useState(false);
	// const { isAuthenticated, user, logout } = useMoralis();

	const [showWalletDialog, setShowWalletDialog] = useState();

	/** Method called on multiple components with different event types */
	const drawerToggler = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerToggle(open);
	};

	const roadmap = process.env.REACT_APP_ROADMAP_URL;
	const micropaper = process.env.REACT_APP_MICROPAPER_URL;
	const changelog = process.env.REACT_APP_CHANGELOG_URL;
	const blog = process.env.REACT_APP_BLOG_URL;

	return (
		<ElevationScroll {...others}>
			<MuiAppBar>
				<Container>
					<Toolbar>
						<Typography
							component="div"
							sx={{ flexGrow: 1, textAlign: "left" }}
						>
							<Button
								color="inherit"
								component={RouterLink}
								to="/"
							>
								<Logo />
							</Button>
						</Typography>
						<Stack
							direction="row"
							sx={{ display: { xs: "none", md: "block" } }}
							spacing={2}
						>
							<Button
								color="inherit"
								component={RouterLink}
								to="/templates"
								size="large"
								id="templates-btn"
							>
								Templates
							</Button>
							<Button
								color="inherit"
								href={blog}
								size="large"
								target="_blank"
								id="blog-btn"
							>
								Blog
							</Button>
							<Button
								color="inherit"
								href={changelog}
								size="large"
								target="_blank"
								id="changelog-btn"
							>
								Changelog
							</Button>
							{!(
								location.pathname === "/" ||
								location.pathname === "/templates"
							) /*&& loginButton*/ }
						</Stack>
						<Box sx={{ display: { xs: "block", md: "none" } }}>
							<IconButton
								color="inherit"
								onClick={drawerToggler(true)}
								size="large"
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor="top"
								open={drawerToggle}
								onClose={drawerToggler(false)}
							>
								<Box
									sx={{
										width: "auto"
									}}
									role="presentation"
									onClick={drawerToggler(false)}
									onKeyDown={drawerToggler(false)}
								>
									<List>
										<Link
											style={{ textDecoration: "none" }}
											component={RouterLink}
											to="/templates"
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<DirectionsIcon />
												</ListItemIcon>
												<ListItemText primary="Templates" />
											</ListItemButton>
										</Link>
										<Link
											style={{ textDecoration: "none" }}
											href={blog}
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<DirectionsIcon />
												</ListItemIcon>
												<ListItemText primary="Blog" />
											</ListItemButton>
										</Link>
										<Link
											style={{ textDecoration: "none" }}
											href={roadmap}
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<DirectionsIcon />
												</ListItemIcon>
												<ListItemText primary="Roadmap" />
											</ListItemButton>
										</Link>
										<Link
											style={{ textDecoration: "none" }}
											href={micropaper}
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<DirectionsIcon />
												</ListItemIcon>
												<ListItemText primary="Micropaper" />
											</ListItemButton>
										</Link>
										<Link
											style={{ textDecoration: "none" }}
											href={micropaper}
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<DirectionsIcon />
												</ListItemIcon>
												<ListItemText primary="Changelog" />
											</ListItemButton>
										</Link>
										<Link
											style={{ textDecoration: "none" }}
											component={RouterLink}
											to="/profile/admin"
										>
											<ListItemButton component="a">
												<ListItemIcon>
													<AppsIcon />
												</ListItemIcon>
												<ListItemText primary="My dApps" />
											</ListItemButton>
										</Link>
									</List>
								</Box>
							</Drawer>
						</Box>
					</Toolbar>
				</Container>
			</MuiAppBar>
		</ElevationScroll>
	);
};

export default AppBar;
