import { IconButton, Box, Button } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'
import HtmlTooltip from '../HtmlTooltip'
const { INFO_URL, INFO_TOOLTIP } = constants

const InfoButton = ({ section }) => {

	const tooltip = (
		<Box>
			{INFO_TOOLTIP[section]}
			<br />
			<Button href={INFO_URL[section]} target="__blank" sx={{ mt: 1 }}>Learn More</Button>
		</Box>
	)
	return (
		<HtmlTooltip title={tooltip} placement="right-start">
			<IconButton color="primary" size="small" onClick={() => window.open(INFO_URL[section], '__blank')}>
				<IconInfoCircle />
			</IconButton>
		</HtmlTooltip>

	)
}

export default InfoButton
