
import { Fragment } from 'react'
import { Typography } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import constants from 'constant'

const TooltipFragment = ({ section }) => {

    return (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">
                {constants.SIDEPANEL.TITLE[section]}
                <InfoButton section={section} />
            </Typography>
            
            <Typography variant="body" sx={{ mt: '15px' }}>
                {constants.INFO_TOOLTIP[section]}
            </Typography>
        </Fragment>
    )
}

export default TooltipFragment
