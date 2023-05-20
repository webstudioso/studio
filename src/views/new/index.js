import { useSelector } from 'react-redux'
import { Box, Stack, Typography, IconButton, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import NameField from 'views/new/NameField'
import InfoButton from 'views/builder/InfoButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import constants from 'constant'

const { PATH } = constants

const NewPage = () => {
	const navigate = useNavigate()
	const account = useSelector((state) => state.account)

	const returnHome = () => {
		navigate(PATH.ADMIN)
	}

	return (
		<Container sx={{ py: '15vh' }} className="fade-in">
			<Box component={Stack} direction="column" justifyContent="left" textAlign="left" sx={{ px: '10vw'}}>	
				<Box sx={{ py: 2, ml: -2 }}>
					<Typography variant="h2" className="title-text">
					<IconButton sx={{ color: '#aaacb3' }} aria-label="Back" onClick={returnHome}>
						<ArrowBackIcon />
					</IconButton>
						<FormattedMessage id="new_page.title" />
						<InfoButton tooltip="new_page.title_tooltip" />
					</Typography>
				</Box>
				<Box sx={{ mt: 12 }}>
					<NameField principal={account.principal} />
				</Box>
			</Box>
		</Container>
	)
}

export default NewPage
