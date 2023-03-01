import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from "@mui/material";

// project imports
import NavItem from "../NavItem";

// assets
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
	const theme = useTheme();
	const customization = useSelector((state) => state.customization);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);

	const handleClick = () => {
		setOpen(!open);
		setSelected(!selected ? menu.id : null);
	};

	// menu collapse & item
	const menus = menu.children?.map((item) => {
		switch (item.type) {
			case "collapse":
				return (
					<NavCollapse key={item.id} menu={item} level={level + 1} />
				);
			case "item":
				return <NavItem key={item.id} item={item} level={level + 1} />;
			default:
				return (
					<Typography
						key={item.id}
						variant="h6"
						color="error"
						align="center"
					>
						Menu Items Error
					</Typography>
				);
		}
	});

	const Icon = menu.icon;
	const menuIcon = menu.icon ? (
		<Icon
			strokeWidth={1.5}
			size="1.3rem"
			style={{ marginTop: "auto", marginBottom: "auto" }}
		/>
	) : null;

	return (
		<>
			<ListItemButton
				sx={{
					borderRadius: `${customization.borderRadius}px`,
					mb: 0.5,
					alignItems: "flex-start",
					backgroundColor:
						level > 1 ? "transparent !important" : "inherit",
					py: level > 1 ? 1 : 1.25,
					pl: `${level * 24}px`
				}}
				selected={selected === menu.id}
				onClick={handleClick}
			>
				{menu.completed === false && (
					<ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
						<InfoTwoToneIcon
							stroke={1.5}
							size="1.3rem"
							color="warning"
						/>
					</ListItemIcon>
				)}
				{menu.completed === true && (
					<ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
						<CheckCircleTwoToneIcon
							stroke={1.5}
							size="1.3rem"
							color="success"
						/>
					</ListItemIcon>
				)}
				{menuIcon && (
					<ListItemIcon
						sx={{ my: "auto", minWidth: !menu?.icon ? 18 : 36 }}
					>
						{menuIcon}
					</ListItemIcon>
				)}
				<ListItemText
					primary={
						<Typography
							variant={selected === menu.id ? "h5" : "body1"}
							color="inherit"
							sx={{ my: "auto" }}
						>
							{menu.title}
						</Typography>
					}
					secondary={
						menu.caption && (
							<Typography
								variant="caption"
								sx={{ ...theme.typography.subMenuCaption }}
								display="block"
								gutterBottom
							>
								{menu.caption}
							</Typography>
						)
					}
				/>
				{open ? (
					<IconChevronUp
						stroke={1.5}
						size="1rem"
						style={{ marginTop: "auto", marginBottom: "auto" }}
					/>
				) : (
					<IconChevronDown
						stroke={1.5}
						size="1rem"
						style={{ marginTop: "auto", marginBottom: "auto" }}
					/>
				)}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List
					component="div"
					disablePadding
					sx={{
						position: "relative",
						"&:after": {
							content: "''",
							position: "absolute",
							left: "32px",
							top: 0,
							height: "100%",
							width: "1px",
							opacity: theme.palette.mode === "dark" ? 0.2 : 1,
							background:
								theme.palette.mode === "dark"
									? theme.palette.dark.light
									: theme.palette.primary.light
						}
					}}
				>
					{menus}
				</List>
			</Collapse>
		</>
	);
};

NavCollapse.propTypes = {
	menu: PropTypes.object,
	level: PropTypes.number
};

export default NavCollapse;
