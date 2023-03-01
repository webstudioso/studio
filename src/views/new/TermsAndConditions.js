/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Checkbox, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import DiscordButton from "views/landing/Discord";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TermsAndConditions = ({ onChange }) => {
	const theme = useTheme();

	const projectInfo = `
    Join other builders in our discord and have access to learning tools, support and more!
    `;

	const tc =
		"https://webstudioso.notion.site/Terms-and-Conditions-89be17ac84a247d6b4da8ab61d2208f7";

	return (
		<Grid
			container
			direction="row"
			justifyContent="left"
			alignItems="left"
			spacing={2}
		>
			<Grid item xs={12}>
				<Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>
					We're about to launch your
					<Tooltip title={projectInfo}>
						<span className="project-keyword">
							project
							<HelpOutlineIcon />
						</span>
					</Tooltip>
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography sx={{ lineHeight: 1.75, ml: 1, fontSize: 16 }}>
							💕 But don't worry, you are not alone. <a href="https://calendly.com/webstudioso" target="__blank">Book a Call</a> anytime!
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography sx={{ lineHeight: 1.75, ml: 1, fontSize: 16 }}>
							🎓 Access learning <a href="https://www.youtube.com/@webstudioso" target="__blank">resources</a> and <a href="https://medium.com/@webstudioso" target="__blank">articles</a>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography sx={{ lineHeight: 1.75, ml: 1, fontSize: 16 }}>
							🤝 Check our <a href="https://webstudioso.notion.site/Guides-559a043f38fd4a49adc365cb783180f6" target="__blank">documentation and guides</a>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography sx={{ lineHeight: 1.75, ml: 1, fontSize: 16 }}>
							🔈 We post all our updates on twitter. <a href="https://twitter.com/webstudioso" target="__blank">Follow us</a> to stay in touch!
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ mt: 5 }}>
						<Checkbox
							onChange={(e) => onChange(e.target.checked)}
						/>{" "}
						I have read and accepted the{" "}
						<a
							style={{ color: theme.palette.primary.main }}
							href={tc}
							target="_blank"
							rel="noreferrer"
						>
							terms and conditions
						</a>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TermsAndConditions;
