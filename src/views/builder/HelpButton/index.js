import { Fragment } from 'react'
import { Button, Typography, IconButton } from '@mui/material'
import { IconHelp, IconInfoCircle, IconMessageCircle } from '@tabler/icons'
import HtmlTooltip from '../HtmlTooltip'
import constants from 'constant'

const HelpButton = () => {

    const helpTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">Need some help?
                <IconButton color="primary" size="small" sx={{ pb:1 }} onClick={() => window.open(constants.INFO_URL['HELP'], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            <Button size="small" href={constants.INFO_URL['HELP']} target="__blank">Learning resources</Button><br />
            <Button size="small" href='https://calendly.com/webstudioso' target="__blank">Book a call</Button><br />
            <Button size="small" href='https://discord.gg/CYYX8yUVgc' target="__blank">Chat with us</Button><br />
            <Button size="small" href='https://twitter.com/webstudioso' target="__blank">Reach us at Twitter</Button><br />
            <Button size="small" href='https://github.com/webstudioso/studio/issues/new' target="__blank">Suggest an improvement</Button><br />
            <Button color="error" size="small" href='https://github.com/webstudioso/studio/issues/new' target="__blank">Report an issue</Button><br />
            
        </Fragment>
    )

	return (
        <HtmlTooltip title={helpTooltip} placement="right-start">
            <IconButton color="warning" size="large">
                <IconHelp />
            </IconButton>
        </HtmlTooltip>
	)
}

export default HelpButton
