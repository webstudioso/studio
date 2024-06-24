import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Grid, Typography, Box, Button, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, SET_PROJECT } from 'store/actions'
import { truncate } from 'utils/format'
import { forgetMemoProject, memoProject } from 'utils/project'
import { deleteProject } from 'api/project'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { FormattedMessage } from 'react-intl'
import { deleteRoute } from 'api/route'
import { getUrlWithoutProtocol } from 'utils/url'

const Card = ({ project, principal }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [selected, setSelected] = useState()
	const isLoading = useSelector((state) => state.loader.show)

	const selectProject = () => {
		dispatch({ type: SET_PROJECT, project })
		memoProject(project)
		navigate(`/e/${project?.id}`)
	}

	const favIcon = project?.metadata?.icon && (
		<Box className="icon">
			<img className="fade-in curved" src={project?.metadata?.icon} alt={project.name} height={28} width={28}></img>
		</Box>
	)

	const handleDelete = async () => {
		dispatch({ type: LOADER, show: true })

		try {
			const deletions = [
				deleteProject({ projectId: project.id, principal }),
				deleteRoute({ id: getUrlWithoutProtocol(project.subdomain), principal }),
				...(project?.domain && deleteRoute({ id: project.domain, principal }))
			]

			await Promise.all(deletions)
		} catch (e) {
			console.log(e)
		}

		forgetMemoProject()
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
					<IconButton className="project-delete" onClick={handleDelete} disabled={isLoading}>
						<DeleteOutlineIcon className="text-gray-400" />
					</IconButton>
					<Button elevation={0}
							disabled={isLoading}
							className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-5 py-3 text-center mr-2 mb-2"
							onClick={() => selectProject(project)}>
						<FormattedMessage id="dashboard.open_project_card" />
					</Button>
				</Box>
			)}
		</Paper>
	)
}

export default Card
