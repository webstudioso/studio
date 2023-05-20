
import { Fragment } from 'react'
import { Typography, IconButton } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'
import { useIntl } from 'react-intl'

const TooltipFragment = ({ title, description }) => {
    const intl = useIntl()
    return (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
                { intl.formatMessage({ id: title }) }
                <IconButton color="primary" sx={{ pb:1 }} size="small" onClick={() => window.open(constants.DOCS, '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            
            <Typography variant="body" sx={{ mt: '15px' }}>
                { intl.formatMessage({ id: description }) }
            </Typography>
        </Fragment>
    )
}

export default TooltipFragment
