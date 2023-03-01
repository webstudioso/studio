import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, AvatarGroup, Avatar, Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { UPDATE_APP, LOADER, SNACKBAR_OPEN } from "store/actions";
import { getUrl } from "utils/url";
import premiumSvg from "assets/images/premium.svg";
import externalLinkSvg from "assets/images/external-link.svg";
import { ContentCopy } from "@mui/icons-material";
import axios from "axios";

const ProjectCard = ({ project = {}, onReload, principal, issuer }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();
	const [deleteDialog, setDeleteDialog] = useState(false);

	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: project });
		navigate(`/builder/${project?.id}`);
	};

	console.log(project);
	const premiumIcon = project?.plan && (
		<Box sx={{ position: 'absolute', left: 15, bottom: 15 }}>
			<img src={premiumSvg} alt="Premium"></img>
		</Box>
	);

	const getDomainUrl = () => {
		const t = Math.floor(Math.random() * 100000);
		if (project.domain) {
			return `https://${project.domain}?t=${t}`;
		} else {
			return `${getUrl(project.subdomain)}?t=${t}`;
		}
	}

	const isCollaborator = () => {
		return project?.collaborators?.includes(issuer);
	}

	const handleDelete = async() => {
		const headers = {
			headers: {
				"AuthorizeToken": `Bearer ${principal}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		}

		try {
			dispatch({ type: LOADER, show: true });
			await axios.delete(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${project.id}`, headers)
			setDeleteDialog(false);
			onReload();
		} finally {
			dispatch({ type: LOADER, show: false });
		}
	}

	const listParticipants = () => {
		const collabs = project?.collaborators || [];
		const participants = [project.owner, ...collabs];
		return participants.map((collab) => {
			const member = collab.substr(collab.length - 3);
			return (
				<Avatar alt={member}
						sx={{
							background: collab === issuer ? '#920CFE' : '#2296F3',
							color: 'white'
						}}
				>{member}</Avatar>
			);
		});
	};

	return (
		<Paper
			data-cy={`${project?.name} box`}
			className="bordered"
			sx={{
				borderRadius: 2,
				p: 3,
				position: "relative",
				background: "#27293D",
				color: "#1E1E2F",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				height: 210,
				paddingTop: 9
			}}
			onMouseOver={() => setSelected(project.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={selected === project.subdomain ? 5 : 0}
		>
			<Grid container spacing={0.3}>
				{ premiumIcon }
				{!isCollaborator() && 
					(
						<Button size="large" sx={{ 
							margin: '0 auto',
							position: 'absolute',
							top: 10,
							right: 10,
							opacity: selected === project.subdomain ? 0.5 : 0
						}} onClick={() => setDeleteDialog(true)} >
							<DeleteOutlineIcon />
						</Button>
					)
				}
				<AvatarGroup total={1+(project?.collaborators?.length || 0)} 
							 sx={{ 
								margin: '0 auto',
								position: 'absolute',
								top: 10,
								left: 10
							 }}
							 spacing="small"
				>
					{listParticipants()}
				</AvatarGroup>
				<Grid item sx={{ mb: 0, textAlign: 'center' }} xs={12}>
					<Typography variant="h2" sx={{ color: "#aaa" }}>
						{project.name}
					</Typography>
					<Typography variant="h6" fontSize="0.95em" sx={{ ml: '-10px' }}>
						ID: <b>{project.subdomain}</b>
						<Box sx={{ display: "inline", position: 'relative' }}>
							<ContentCopy 
								fontSize="18px"
								sx={{
									color:'#aaa',
									cursor: 'pointer',
									position: 'absolute',
									top: '3px',
									left: '2px'
								}} 
								onClick={() => {
									try {
										navigator.clipboard.writeText(project.subdomain);
										dispatch({
											type: SNACKBAR_OPEN,
											open: true,
											message: 'Copied to Clipboard',
											variant: "alert",
											anchorOrigin: { vertical: "bottom", horizontal: "right" },
											alertSeverity: "success"
										});
									} catch(e) {
										dispatch({
											type: SNACKBAR_OPEN,
											open: true,
											message: e.message,
											variant: "alert",
											anchorOrigin: { vertical: "bottom", horizontal: "right" },
											alertSeverity: "error"
										});
									}
								}}
							/>
						</Box>
					</Typography>
					<Typography variant="h6" fontSize="0.95em">
						<a href={getDomainUrl()} target="__blank" style={{
							'color': '#aaacb3',
    						textDecoration: 'none',
							position: 'relative',
							cursor: "pointer"
						}}>
							{project.domain || getUrl(project.subdomain)}
							<Box sx={{ display: "inline", pt: '10px', position: 'relative' }}>
								<img src={externalLinkSvg} alt="Link" style={{
									marginLeft: '3px',
									position: 'absolute',
									top: '10px'
								}}></img>
							</Box>
						</a>
					</Typography>
				</Grid>
				<Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
					<Button sx={{ 
						margin: '0 auto',
						opacity: selected === project.subdomain ? 1 : 0
					}} variant="outlined"
					onClick={() => selectProject(project)}
					>Launch Editor ✏️</Button>
				</Grid>
				{/*<Typography fontSize="1em">
					Last updated {moment(project.get('updatedAt')).format("lll")}
								</Typography>*/}
			</Grid>


			<Dialog
				open={deleteDialog}
				onClose={() => setDeleteDialog(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
				{"Are you sure?"}
				</DialogTitle>
				<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Yes, I want to delete project <b>{project.name}</b>.
				</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ px:2 }}>
					<Button onClick={() => setDeleteDialog(false)}>No! go back!</Button>
					<Button onClick={() => handleDelete()} autoFocus variant="contained" color="error">
						Confirm Deletion
					</Button>
				</DialogActions>
			</Dialog>

		</Paper>
	);
};

export default ProjectCard;
