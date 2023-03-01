import { Grid } from "@mui/material";
import logo from "assets/images/logo.png";

const Logo = () => {
	return (
		<Grid container direction="row">
			<img src={logo} alt="logo"></img>
		</Grid>
	);
};

export default Logo;
