
import { Fragment } from 'react'
import { Typography, IconButton } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'

const TooltipFragment = ({ section }) => {

    return (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
                {constants.SIDEPANEL.TITLE[section]}
                <IconButton color="primary" sx={{ pb:1 }} size="small" onClick={() => window.open(constants.INFO_URL[section], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            
            <Typography variant="body" sx={{ mt: '15px' }}>
                {constants.INFO_TOOLTIP[section]}
            </Typography>
        </Fragment>
    )
}

export default TooltipFragment
