import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	linearProgressClasses,
	Tooltip,
	Button,
	Box
} from "@mui/material";

// assets
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { getUrl } from "utils/url";
import axios from "axios";


// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 30,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.mode === "dark" ? theme.palette.dark.light : "#fff"
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor:
			theme.palette.mode === "dark"
				? theme.palette.primary.dark
				: theme.palette.primary.main
	}
}));

const CardStyle = styled(Card)(({ theme }) => ({
	background:
		theme.palette.mode === "dark"
			? theme.palette.dark.main
			: theme.palette.primary.light,
	marginBottom: "22px",
	overflow: "hidden",
	position: "relative",
	"&:after": {
		content: '""',
		position: "absolute",
		width: "157px",
		height: "157px",
		background:
			theme.palette.mode === "dark"
				? theme.palette.dark.dark
				: theme.palette.primary[200],
		borderRadius: "50%",
		top: "-105px",
		right: "-96px"
	}
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
	const theme = useTheme();

	return (
		<Tooltip title="Fill in info page, specify the admin wallet address, add a project template and publish your changes!">
			<Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
				<Grid item>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Typography
								variant="h6"
								sx={{
									color:
										theme.palette.mode === "dark"
											? theme.palette.dark.light
											: theme.palette.primary[800]
								}}
							>
								Configuration Progress
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								data-cy="configuration-progress-percentage"
								variant="h6"
								color="inherit"
							>{`${Math.round(value)}%`}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<BorderLinearProgress
						variant="determinate"
						value={value}
						{...others}
					/>
				</Grid>
			</Grid>
		</Tooltip>
	);
}

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
	const theme = useTheme();
	const [progress, setProgress] = useState(0);
	const appState = useSelector((state) => state.app);
	// const targetNetwork = NETWORKS[appState?.chainId];
	// const logo = LOGO[targetNetwork?.nativeCurrency?.symbol];

	const calculateProgress = () => {
		let currentProgress = 0;
		if (!isEmpty(appState.description)) currentProgress += 20;
		if (
			!isEmpty(appState.social.twitter) ||
			!isEmpty(appState.social.facebook) ||
			!isEmpty(appState.social.email) ||
			!isEmpty(appState.social.instagram) ||
			!isEmpty(appState.social.pinterest) ||
			!isEmpty(appState.social.telegram)
		)
			currentProgress += 20;
		if (!isEmpty(appState.template)) currentProgress += 20;
		if (!isEmpty(appState.operator)) currentProgress += 20;
		if (!isEmpty(appState.type)) currentProgress += 20;
		setProgress(currentProgress);
	};

	useEffect(() => {
		calculateProgress();
		loadNetwork();
	}, [appState]);

	const [network, setNetwork] = useState([]);

	const loadNetwork = async () => {
		// if (!appState?.chainId) {
		// 	return;
		// }
		// const response = await axios.get(
		// 	`${process.env.REACT_APP_WEBSTUDIO_API_URL}/chain/${appState?.chainId}`,
		// 	{
		// 		headers: {
		// 			"Authorize": process.env.REACT_APP_WEBSTUDIO_API_KEY,
		// 			accept: "application/json"
		// 		}
		// 	}
		// );
		// setNetwork(response.data);
	};

	return (
		<CardStyle>
			<CardContent sx={{ p: 2 }}>
				<List sx={{ p: 0, m: 0 }}>
					<ListItem
						alignItems="flex-start"
						disableGutters
						sx={{ p: 0 }}
					>
						<ListItemAvatar sx={{ mt: 0 }}>
							<Avatar
								variant="rounded"
								sx={{
									...theme.typography.commonAvatar,
									...theme.typography.largeAvatar,
									color: theme.palette.primary.main,
									border:
										theme.palette.mode === "dark"
											? "1px solid"
											: "none",
									borderColor: theme.palette.primary.main,
									background:
										theme.palette.mode === "dark"
											? theme.palette.dark.dark
											: "#fff",
									marginRight: "12px",
									p: 3
								}}
							>
								<img
									src={network.imageUrl}
									alt={network.name}
									height="36"
									style={{
										maxHeight: "36px",
										margin: "0 auto",
										borderRadius: "50%"
									}}
									onError={(event) => {
										event.target.src =
											"https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=64&q=75";
										event.onerror = null;
									}}
								/>
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							sx={{ mt: 0 }}
							primary={
								<Typography
									variant="subtitle1"
									sx={{
										color:
											theme.palette.mode === "dark"
												? theme.palette.dark.light
												: theme.palette.primary[800]
									}}
								>
									{appState?.name}
								</Typography>
							}
							secondary={
								<Typography variant="caption">
									{network?.name} (ID: {network?.chainId})
								</Typography>
							}
						/>
					</ListItem>
				</List>
				<LinearProgressWithLabel value={progress} />
				<Tooltip title="To view your dApp select first a template and enable it as default landing page">
					<Box>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							disabled={isEmpty(appState.type)}
							sx={{ mt: 2 }}
							href={getUrl(appState.subdomain)}
							id="visit-dapp-btn"
							target="_blank"
						>
							Visit my dApp
						</Button>
					</Box>
				</Tooltip>
			</CardContent>
		</CardStyle>
	);
};

export default MenuCard;
