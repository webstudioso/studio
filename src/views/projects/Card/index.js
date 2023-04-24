import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Grid, Typography, Box, Button, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, SET_PROJECT } from 'store/actions'
import { truncate } from 'utils/format'
import { deleteProject } from 'api/project'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Card = ({ project, principal }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [selected, setSelected] = useState()
	const isLoading = useSelector((state) => state.loader.show)

	const selectProject = () => {
		dispatch({ type: SET_PROJECT, project })
		navigate(`/e/${project?.id}`)
	}

	const favIcon = project?.metadata?.icon && (
		<Box className="icon">
			<img className="fade-in" src={project?.metadata?.icon} alt={project.name} height={44}></img>
		</Box>
	)

	const handleDelete = async () => {
		dispatch({ type: LOADER, show: true })
		await deleteProject({ projectId: project.id, principal})
		dispatch({ type: LOADER, show: false })
		navigate(`/`)
	}

	const isSelected = selected === project.subdomain

	return (
		<Paper
			data-cy={`${project?.name} box`}
			className="bordered fade-in project-card"
			onMouseOver={() => setSelected(project.subdomain)}
			onMouseOut={() => setSelected()}
			elevation={isSelected ? 5 : 1}
		>
			<Grid container>
				{ favIcon }
				<Grid item sx={{ mb: 0, textAlign: 'center' }} xs={12}>
					<Typography variant="h2" sx={{ color: "#777", lineHeight: '207px' }} fontSize="1.3em" fontWeight="bold">
						{truncate(project.name, 18)}
					</Typography>
				</Grid>
	
			</Grid>
			{isSelected && (
                <Box className="overlay project-overlay">
					<IconButton className="project-delete" color="primary" onClick={handleDelete} disabled={isLoading}>
						<DeleteOutlineIcon />
					</IconButton>
					<Button variant="contained"
							color="primary"
                            sx={{
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                                borderRadius: '50px'
                            }}
							disabled={isLoading}
							onClick={() => selectProject(project)}>
						Launch Editor
					</Button>
				</Box>
			)}
		</Paper>
	)
}

export default Card
