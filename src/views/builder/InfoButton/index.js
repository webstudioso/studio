import { IconButton } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'
const { INFO_URL } = constants

const InfoButton = ({ section }) => {
	return (
		<IconButton color="primary" size="small" onClick={() => window.open(INFO_URL[section], '__blank')}>
			<IconInfoCircle />
		</IconButton>
	)
}

export default InfoButton
