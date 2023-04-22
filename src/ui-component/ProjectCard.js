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
import { truncate } from "utils/format";
import axios from "axios";

const ProjectCard = ({ project = {}, onReload, principal, issuer }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selected, setSelected] = useState();
	const [deleteDialog, setDeleteDialog] = useState(false);

	const selectProject = (appConfig) => {
		dispatch({ type: UPDATE_APP, configuration: project });
		navigate(`/e/${project?.id}`);
	};

	console.log(project);
	const premiumIcon = project?.metadata?.icon && (
		<Box sx={{ position: 'absolute', left: 15, top: 15 }}>
			<img src={project?.metadata?.icon} alt={project.name} height={44}></img>
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
			className="bordered fade-in"
			sx={{
				borderRadius: 0,
				// py: 8,
				position: "relative",
				// color: theme.palette.primary.dark,
				// background: `url(${project.metadata['icon']})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				cursor: "pointer",
				height: "207px",
				border: '1px solid #eee !important'
			}}
			onMouseOver={() => setSelected(project.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={selected === project.subdomain ? 5 : 1}
		>
			<Grid container>
				{ premiumIcon }
				<Grid item sx={{ mb: 0, textAlign: 'center' }} xs={12}>
					<Typography variant="h2" sx={{ color: "#777", lineHeight: '207px' }} fontSize="1.3em" fontWeight="bold">
						{truncate(project.name, 18)}
					</Typography>
				</Grid>
	
			</Grid>
			{selected === project.subdomain && (
                <Box sx={{
                    width: '102%',
                    height: '102%',
                    background: `rgba(255,255,255,0.85)`,
                    position: 'absolute',
                    top: '-1%',
                    left: '-1%',
                    zIndex: 1,
					textAlign: 'center',
					lineHeight: '207px'
                }}
                className="overlay"
                >

<Button        variant="contained"
                            sx={{
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                                borderRadius: '50px',
                                // position: 'absolute',
                                // top: '40%',
                                // left: '25%',
                                // width: '60%',
								// mx: '20%'
                            }}
					onClick={() => selectProject(project)}
					>Launch Editor</Button>

					</Box>

			)}

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
