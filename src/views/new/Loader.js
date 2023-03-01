import { useEffect, useState } from "react";
import { Grid, Typography, Alert, CircularProgress, Box } from "@mui/material";
import PropTypes from "prop-types";

function CircularProgressWithLabel(props) {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress variant="determinate" {...props} size={160} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Typography variant="h1" component="div" color="text.secondary">
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired
};

const Loader = ({ onChange }) => {
	const [isReady, setReady] = useState();

	const [progress, setProgress] = useState(20);
	useEffect(() => {
		if (progress >= 100) {
			setReady(true);
			onChange(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress]);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 100 : prevProgress + 20
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const ready = isReady && (
		<Alert variant="filled" severity="success">
			Your new project is ready!
		</Alert>
	);

	const loader = (
		<Grid container justifyContent="center" alignItems="center">
			<Grid
				item
				xs={12}
				sx={{ textAlign: "center", position: "absolute" }}
			>
				<CircularProgressWithLabel value={progress} />
			</Grid>
			<Grid item sx={{ marginTop: 30, textAlign: "center", height: 50 }}>
				{ready}
			</Grid>
		</Grid>
	);

	return loader;
};

export default Loader;
