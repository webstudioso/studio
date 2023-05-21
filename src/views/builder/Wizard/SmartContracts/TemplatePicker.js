import { useState, memo } from 'react'
import { IconButton, Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Stepper, Step, StepLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, UPDATE_WIZARD } from 'store/actions'
import availableContracts from './SupportedContracts'
import { FormattedMessage, useIntl } from 'react-intl'
import { IconShieldCheck } from '@tabler/icons'


const TemplatePicker = ({ activeStep, changeStep, intl }) => {
    const dispatch = useDispatch()
    return availableContracts.map((contract, index) => (
        <Grid item xs={6} md={4} key={index} sx={{ cursor: 'pointer' }}
            onClick={() => {
                dispatch({ type: UPDATE_WIZARD, payload:contract})
                changeStep(1)
            }}
        >
            <Paper elevation={1} sx={{ p: 2, height: 200 }}>
                <Box>
                    <IconButton color="primary" size="large">
                        <IconShieldCheck />
                        <Typography fontSize={14} marginLeft={1} fontWeight="bold">{intl.formatMessage({ id:'audited' })}</Typography>
                    </IconButton>                    
                </Box>
                <Box sx={{ px: 2, mb: 1, wordWrap: 'break-word' }}>
                    <Typography fontWeight="bold" fontSize={16} color="#212121" marginBottom={1}>{intl.formatMessage({ id: contract.name })}</Typography>

                    <Typography fontWeight="normal" fontSize={12} color="#999" height={70}>
                        {intl.formatMessage({id:contract.description})}
                    </Typography>
                </Box>
                <Box sx={{ px: 1}} display="flex" alignItems="center">
                   <img src={contract.logo} width={32} /> 
                   <Typography fontWeight="bold" fontSize={12} color="#212121">{contract.source}</Typography>
                </Box>
            </Paper>
        </Grid>
    ))
}

export default memo(TemplatePicker)
