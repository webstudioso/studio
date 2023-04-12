import { useEffect, useState } from "react";
import { Typography, Grid, Box, Paper, Container, TextField } from "@mui/material";
import ProjectCard from "ui-component/ProjectCard";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { Magic } from 'magic-sdk';
import { ContentCopy } from "@mui/icons-material";
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const Projects = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const [projects, setProjects] = useState([]);
	const [collabProjects, setCollabProjects] = useState([]);
	const [selected, setSelected] = useState();
	const [principal, setPrincipal] = useState();
	const [metadata, setMetadata] = useState({});
	const [collabProjectAdd, setCollabProjectAdd] = useState();

	const loadPrincipal = async () => {
		dispatch({ type: LOADER, show: true });
		const idToken = await m.user.getIdToken();
		const meta = await m.user.getMetadata(idToken);
		setMetadata(meta);
		setPrincipal(idToken);
		dispatch({ type: LOADER, show: false });
	};

	const listAll = async () => {

		try {
			dispatch({ type: LOADER, show: true });
			const response = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project`,
				{
					headers: {
						"AuthorizeToken": `Bearer ${principal}`,
						"Content-Type": "application/json",
						"Accept": "application/json"
					}
				}
			)

			const list = response?.data;
			setProjects(list);
		} finally {
			dispatch({ type: LOADER, show: false });
		}
	};

	useEffect(() => {
		loadPrincipal();
		loadGuestProjects();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (principal) {
			listAll();
		} else {
			setProjects([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [principal]);

	const loadGuestProjects = () => {
		const data = localStorage.getItem('GUEST_PROJECTS') || '[]';
		const jsonData = JSON.parse(data);
		setCollabProjects(jsonData);
		return jsonData;
	}

	const saveGuestProject = (proj) => {
		// Add to list local, replace if exists
		const projs = collabProjects.filter((proj) => proj.id === collabProjectAdd);
		projs.unshift(proj);
		localStorage.setItem('GUEST_PROJECTS', JSON.stringify(projs));
		loadGuestProjects();
	}

	const createNew = /* isAuthenticated && */ (
		<Grid item xs={12} sm={6} md={4} key={0}>
			<Box>
				<Paper
					className="bordered"
					sx={{
						borderRadius: 2,
						py: 8,
						position: "relative",
						color: theme.palette.primary.dark,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						cursor: "pointer",
						height: "207px"
					}}
					id="add-project-btn"
					onClick={() => navigate("/new")}
					onMouseOver={() => setSelected("create")}
					onMouseOut={() => setSelected()}
					elevation={selected === "create" ? 5 : 0}
				>
					<Grid container spacing={0.3} direction="column">
						<Grid item xs={12} sx={{ textAlign: "center" }}>
							<AddIcon sx={{ fontSize: "3em" }} />
						</Grid>
						<Grid item xs={12} sx={{ textAlign: "center" }}>
							<Typography
								variant="body"
								fontWeight="600"
								sx={{ color: theme.palette.primary.dark }}
							>
								Create a new dapp
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Grid>
	);

	const listApps = () => {
		const list = [createNew];
		const myProjects = [...projects,...collabProjects];
		myProjects.forEach((app) => {
			list.push(
				<Grid item xs={12} sm={6} md={4} key={app.id}>
					<Box>
						<ProjectCard 	project={app} 
										onReload={listAll} 
										principal={principal} 
										issuer={metadata.issuer} 
						/>
					</Box>
				</Grid>
			);
		});
		return list;
	};

    const handleAddCollabProject = async(e) => {
        try {
            dispatch({ type: LOADER, show: true });
            if (e.key === 'Enter') {
                e.preventDefault();
				const response = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${collabProjectAdd}`,
					{
						headers: {
							"AuthorizeToken": `Bearer ${principal}`,
							"Content-Type": "application/json",
							"Accept": "application/json"
						}
					}
				)
				const invitedProject = response?.data;
				if(invitedProject?.collaborators?.includes(metadata.issuer)) {
					saveGuestProject(invitedProject);
					dispatch({
						type: SNACKBAR_OPEN,
						open: true,
						message: 'Project Collaboration Added',
						variant: "alert",
						anchorOrigin: { vertical: "bottom", horizontal: "right" },
						alertSeverity: "success"
					});
				} else {
					dispatch({
						type: SNACKBAR_OPEN,
						open: true,
						message: 'You do not have permissions to access this project',
						variant: "alert",
						anchorOrigin: { vertical: "bottom", horizontal: "right" },
						alertSeverity: "error"
					});
				}
            }
        } catch (e) {
            dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "error"
			});
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    }

	const welcome = (
		<div>
			<div>Welcome, <b>{metadata.email}</b></div>
			<div>
				User ID: <b>{metadata.issuer}</b> 
				<span style={{position:'relative'}}>
					<ContentCopy 
						fontSize="24px"
						sx={{
							color: 'white',
							cursor: 'pointer',
							position: 'absolute',
							top: '3px',
							left: '2px'
						}} 
						onClick={() => {
							try {
								navigator.clipboard.writeText(metadata.issuer);
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
				</span>
			</div>
			<div>
				<TextField 	fullWidth 
							sx={{
								color: 'white'
							}}
							variant="standard" 
							label="Collaborating on another project? Type the project ID and press enter" 
							onChange={(e) => setCollabProjectAdd(e.target.value)}
							onKeyDown={handleAddCollabProject}/>
			</div>
		</div>
	);

	const userCard = (
		<Grid item xs={12}>
			{ metadata.email &&
				(<Paper
					sx={{
						borderRadius: 2,
						p: 3,
						background: 'linear-gradient(90deg, rgba(42,62,177,1) 0%, rgba(69,90,211,1) 100%);',
						position: "relative",
						color: 'white',
						border: '1px solid #455ad3'
					}}
				>
					<Grid container>
						<Grid item xs={12}>
							{welcome}
						</Grid>
					</Grid>
				</Paper>)
			}
		</Grid>
	);

	return (
		<Container
			className="main-view-container"
			sx={{
				"& .MuiContainer-root": {
					paddingLeft: 0
				}
			}}
		>
			<Grid
				data-cy="created-dapps-overview"
				container
				spacing={2}
				justifyContent="left"
				alignItems="left"
			>
				{userCard}
				{metadata.issuer && listApps()}
			</Grid>
		</Container>
	);
};

export default Projects;
