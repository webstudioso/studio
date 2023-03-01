// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import { IconFolders } from "@tabler/icons";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
	const items = [
		{
			id: "projects",
			title: "Projects",
			type: "group",
			children: [
				{
					id: "dapps",
					title: "My dapps",
					type: "item",
					url: "projects",
					icon: IconFolders,
					breadcrumbs: false
				}
			]
		},
		// {
		// 	id: "account",
		// 	title: "Account",
		// 	type: "group",
		// 	children: [
		// 		{
		// 			id: "profile",
		// 			title: "Profile",
		// 			type: "item",
		// 			url: "admin",
		// 			icon: IconUserCircle,
		// 			breadcrumbs: false
		// 		}
		// 	]
		// }
	];

	const renderItems = () =>
		items.map((item) => {
			switch (item.type) {
				case "group":
					return (
						<NavGroup
							key={item.id}
							item={item}
							id={`sidemenu-${item.id}-btn`}
						/>
					);
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

	return <>{renderItems()}</>;
};

export default MenuList;
