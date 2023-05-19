import { IconButton, Box, Button } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'
import HtmlTooltip from '../HtmlTooltip'
import { FormattedMessage } from 'react-intl'
const { INFO_URL, INFO_TOOLTIP } = constants

const InfoButton = ({ section, tooltip }) => {

	const message = tooltip ?
		<FormattedMessage id={tooltip} /> :
		INFO_TOOLTIP[section]

	const tooltipBox = (
		<Box>
			{message}
			<br />
			<Button href={INFO_URL[section]} target="__blank" sx={{ mt: 1 }}><FormattedMessage id="tooltip.learn_more" /></Button>
		</Box>
	)
	return (
		<HtmlTooltip title={tooltipBox} placement="right-start">
			<span>
				<IconButton color="primary" size="small" onClick={() => window.open(INFO_URL[section], '__blank')}>
					<IconInfoCircle />
				</IconButton>
			</span>
		</HtmlTooltip>

	)
}

export default InfoButton
