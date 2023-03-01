import { useEffect, useState } from "react";
import {
	TextField,
	Grid,
	Dialog,
	Button,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import isEmpty from "lodash/isEmpty";

const ProfileDialog = ({ context }) => {
	const { user, isAuthenticated } = context;
	const [name, setName] = useState();
	const [contact, setContact] = useState();
	const canContinue = !isEmpty(name) && !isEmpty(contact);

	const shouldDisplayDialog = () => {
		const userCurrentNickname = user?.get("nickname");
		const userCurrentContact = user?.get("contact");
		const isMissingData =
			isEmpty(userCurrentContact) || isEmpty(userCurrentNickname);
		return isAuthenticated && user && isMissingData;
	};

	const [open, setOpen] = useState(shouldDisplayDialog());

	useEffect(() => {
		setOpen(shouldDisplayDialog());
	}, [isAuthenticated, user]);

	const updateUser = async () => {
		user.set("nickname", name);
		user.set("contact", contact);
		await user.save();
		setOpen(false);
	};

	return (
		<Dialog
			id="welcome-dialog"
			open={open}
			aria-labelledby="welcome-dialog-title"
			aria-describedby="welcome-dialog-description"
		>
			<DialogTitle id="welcome-dialog-title">
				Welcome Buildr 👷🏽
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="welcome-dialog-description">
					We are almost ready to get building! 🛠. Can we ask that you
					provide a way of reaching out? we promise not to spam!. We
					want to help you by building the tools you need!
					<br />
				</DialogContentText>
				<Grid container spacing={2} sx={{ mt: "1px" }}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							autoFocus
							size="large"
							id="name-field"
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g MastaBildr"
							label="Your Nickname"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="large"
							id="contact-field"
							placeholder="e.g mastabildr@mail.to"
							label="Your Email or Social (Discord, Telegram, etc)"
							onChange={(e) => setContact(e.target.value)}
							variant="standard"
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions
				sx={{ p: 1, textAlign: "center" }}
				justifycontent="center"
				alignitems="center"
			>
				<Button
					disabled={!canContinue}
					id="welcome-dialog-button"
					variant="contained"
					color="info"
					sx={{ margin: "0 auto", minWidth: 200 }}
					onClick={updateUser}
				>
					Continue Building!
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProfileDialog;
