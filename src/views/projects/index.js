import { useState } from 'react'
import { Typography, Grid, Box, Paper, Stack, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Magic } from 'magic-sdk'
import InfoButton from 'views/builder/InfoButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LogoutIcon from '@mui/icons-material/Logout';
import Card from 'views/projects/Card'
import constants from 'constant'
import Logo from 'common/Logo'

const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY)

const { SECTION } = constants

const Projects = () => {
	const [selected, setSelected] = useState();
	const navigate = useNavigate();
	const theme = useTheme();
	const account = useSelector((state) => state.account)
	
	const logout = async () => {
		await m.user.logout()
		navigate('/')
	}

	const newCard = (
		<Grid item xs={12} sm={6} md={4} key={0}>
			<Box>
				<Paper
					className="bordered fade-in"
					sx={{
						borderRadius: 0,
						py: 8,
						position: "relative",
						color: theme.palette.primary.dark,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						cursor: "pointer",
						height: "207px",
						border: '1px solid #eee !important'
					}}
					id="add-project-btn"
					onClick={() => navigate("/n")}
					onMouseOver={() => setSelected("create")}
					onMouseOut={() => setSelected()}
					elevation={selected === "create" ? 5 : 1}
				>
					<Grid container spacing={0.3} direction="column">
						<Grid item xs={12} sx={{ textAlign: "center" }}>
							<AddCircleIcon sx={{ fontSize: "3em" }} />
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


	return (
		<Box sx={{ py: '15vh' }} className="fade-in bg-container">
			<Box sx={{ px: '10vw' }}>
				<Grid item>
					<Stack
						direction="row"
						justifyContent="left"
						alignItems="left"
						spacing={1}
						sx={{ borderBottom: '1px solid #f0f0f0', mb: 1, pb: 1 }}
					>
						<Box display="flex" alignItems="center">
							<Logo />
						</Box>
						<Box sx={{ minWidth: 120 }} display="flex" alignItems="center">
							<Typography variant="h2" className="title-text">
								My Projects
								<InfoButton section={SECTION.DASHBOARD_TITLE} />
							</Typography>
						</Box>
						<Box flexGrow={1}></Box>
						<Box display="flex" alignItems="center">
							<IconButton color="primary" onClick={logout}>
								<LogoutIcon />
							</IconButton>
						</Box>
					
					</Stack>
				</Grid>
			<Grid container spacing={2} className="project-container">
				{ newCard }
				{ account?.projects?.map((project) => (
					<Grid item xs={12} sm={6} md={4} key={project.id}>
						<Card project={project} principal={account.principal} />
					</Grid>
				))}
			</Grid>
			</Box>
		</Box>
	);
};

export default Projects;
