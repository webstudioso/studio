import { useState, memo } from 'react'
import { Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Stepper, Step, StepLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import availableTemplates from 'templates/content'
import { FormattedMessage, useIntl } from 'react-intl'
import TemplatePicker from './TemplatePicker'
import Configuration from './Configuration'
import NetworkSelector from './NetworkSelector'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const SmartContracts = ({ activeStep, changeStep, intl }) => {

    return (
        <Grid container spacing={2} sx={{ 
            height: 'calc(100vh - 250px)', 
            overflow: 'auto', 
            background: '#f7f8f8', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            px: 2,
            pb: 4
        }}>
            {activeStep === 0 && <TemplatePicker changeStep={changeStep} intl={intl} />}
            {activeStep === 1 && <Configuration changeStep={changeStep} intl={intl} />}
            {activeStep === 2 && <NetworkSelector changeStep={changeStep} intl={intl} />}
        </Grid>
    )
}

export default memo(SmartContracts)
