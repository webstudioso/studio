import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, Chip } from "@mui/material";

// project imports
import config from "config";
import Logo from "common/Logo";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
	const isProductionEnvironment = process.env.NODE_ENV === "production";
	return (
		<ButtonBase disableRipple component={Link} to={config.defaultPath}>
			<Logo />
			{!isProductionEnvironment && <Chip label={process.env.NODE_ENV} />}
		</ButtonBase>
	);
};

export default LogoSection;
