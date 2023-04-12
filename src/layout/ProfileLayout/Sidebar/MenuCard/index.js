// import { useContext } from "react";
import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	Card,
	CardContent,
	Grid,
	LinearProgress,
	Typography,
	linearProgressClasses,
	Tooltip,
	Button,
	Box
} from "@mui/material";

// assets
// import { useMoralis } from "react-moralis";
// import { TwitterIcon, TwitterShareButton } from "react-share";
// import { getUrl } from "utils/url";
// import { ProgressContext } from "contexts/ProgressContext";

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
			? theme.palette.dark.light
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
				: theme.palette.secondary.light,
		borderRadius: "50%",
		top: "-105px",
		right: "-96px"
	}
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
	const theme = useTheme();

	return (
		<Tooltip title="Add a username, email and bio to complete your profile">
			<Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
				<Grid item>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Typography
								variant="h4"
								sx={{
									color:
										theme.palette.mode === "dark"
											? theme.palette.dark.light
											: theme.palette.primary[800]
								}}
							>
								Profile Progress
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								data-cy="configuration-progress-percentage"
								variant="h4"
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
	// const { progress } = useContext(ProgressContext);
	// const { user } = useMoralis();

	return (
		<CardStyle>
			<CardContent sx={{ p: 2 }}>
				{/* <LinearProgressWithLabel value={progress} /> */}
				<Box>
					<Typography variant="h4">Learn & Build</Typography>
					<Button
						color="primary"
						sx={{ mt: 2 }}
						id="visit-dapp-btn"
						target="_blank"
						href="https://webstudioso.notion.site/Guides-53b4c8f9caf948d7902e191a29293e08"
					>
						🗺️ Notion Guides
					</Button>
					<Button
						color="primary"
						sx={{ mt: 2 }}
						id="visit-dapp-btn"
						target="_blank"
						href="https://discord.gg/CYYX8yUVgc"
					>
						💬 Chat on Discord
					</Button>
					<Button
						color="primary"
						sx={{ mt: 2 }}
						id="visit-dapp-btn"
						target="_blank"
						href="https://twitter.com/webstudioso"
					>
						🐦 Follow us on Twitter
					</Button>
					<Button
						textAlign="left"
						color="primary"
						sx={{ mt: 2 }}
						id="visit-dapp-btn"
						target="_blank"
						href="https://calendly.com/webstudioso"
					>
						💁 Book a Call
					</Button>
				</Box>

				{/* <TwitterShareButton
					title={
						"Check out my new Web3 builder profile at @Webstudioso 🤩. Create yours now, it is free!"
					}
					url={`${getUrl()}`}
					hashtags={["Web3", "Web3Community"]}
				>
					<Grid
						container
						direction="row"
						spacing={1}
						sx={{ margin: "5px auto" }}
					>
						<Grid item>
							<TwitterIcon size={32} round />
						</Grid>
						<Grid item>
							<Box sx={{ height: 32, pt: "8px" }}>
								Share on Twitter
							</Box>
						</Grid>
					</Grid>
				</TwitterShareButton> */}
			</CardContent>
		</CardStyle>
	);
};

export default MenuCard;
