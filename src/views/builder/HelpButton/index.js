import { Fragment } from 'react'
import { Button, Typography, IconButton } from '@mui/material'
import { IconHelp, IconInfoCircle } from '@tabler/icons'
import HtmlTooltip from '../HtmlTooltip'
import constants from 'constant'
import { useIntl } from 'react-intl'

const { INFO_URL } = constants

const HelpButton = () => {
    const intl = useIntl()
    const helpTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">{intl.formatMessage({id:'help.title'})}
                <IconButton color="primary" size="small" sx={{ pb:1 }} onClick={() => window.open(constants.INFO_URL['HELP'], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            <Button size="small" href={constants.INFO_URL['HELP']} target="__blank">{intl.formatMessage({id:'help.resources'})}</Button><br />
            <Button size="small" href={INFO_URL.ACADEMY} target="__blank">{intl.formatMessage({id:'section.tutorial_tooltip_title'})}</Button><br />
            <Button size="small" href='https://calendly.com/webstudioso' target="__blank">{intl.formatMessage({id:'help.book_call'})}</Button><br />
            <Button size="small" href='https://discord.gg/CYYX8yUVgc' target="__blank">{intl.formatMessage({id:'help.chat_with_us'})}</Button><br />
            <Button size="small" href='https://twitter.com/webstudioso' target="__blank">{intl.formatMessage({id:'help.twitter'})}</Button><br />
            <Button size="small" href='https://github.com/webstudioso/studio/issues/new' target="__blank">{intl.formatMessage({id:'help.suggest_improvement'})}</Button><br />
            <Button color="error" size="small" href='https://github.com/webstudioso/studio/issues/new' target="__blank">{intl.formatMessage({id:'help.report_issue'})}</Button><br />
            
        </Fragment>
    )

	return (
        <HtmlTooltip title={helpTooltip} placement="right-start">
            <IconButton color="primary" size="large">
                <IconHelp />
            </IconButton>
        </HtmlTooltip>
	)
}

export default HelpButton
