import { Grid } from "@mui/material";
import logo from "assets/images/logo.png";

const Logo = ({ height="44px", width="auto" }) => {
	return (
		<Grid container direction="row">
			<img src={logo} alt="logo" style={{ height, width }}></img>
		</Grid>
	);
};

export default Logo;
