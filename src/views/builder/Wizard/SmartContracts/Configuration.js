import { useState, memo,useEffect } from 'react'
import { MenuItem, FormControl, InputLabel, Select, TextField, Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Stepper, Step, StepLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, UPDATE_WIZARD } from 'store/actions'
import availableTemplates from 'templates/content'
import { FormattedMessage, useIntl } from 'react-intl'


const Template = ({ activeStep, changeStep }) => {
    const dispatch = useDispatch()
    const wizard = useSelector((state) => state.wizard)
    const configuration = wizard.configuration
    const [selected, setSelected] = useState()

    const writableFns = wizard.abi.filter((item) => item.type==='function' && (item.stateMutability.includes('payable')))

    const configurableField = (input) => {
        console.log(input)
        return (
            <Box sx={{ p: 2, mt:1, border: '1px solid rgba(0,0,0,0.05)'}}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body" fontWeight="normal">{input.name}</Typography>
                    <Box flex={1} />
                        <Chip label={input.type} 
                                    size="small" 
                                    variant="outlined"
                                    color="primary"
                        />
                    </Box>
                <Box flex={1} />
                <Box>
                    <Box sx={{ mt: '10px'}}>
                        <Chip label="User Input"  size="small"  variant={!configuration[input.name]?.type || configuration[input.name]?.type ==='dynamic' ? 'contained' : 'outlined'} color="primary" onClick={() => {
                            configuration[input.name] = { type: 'dynamic' }
                            wizard.configuration = configuration
                            dispatch({ type: UPDATE_WIZARD, payload: wizard})
                        }} /> 
                        <Chip sx={{ mx: '5px' }} label="Static"  size="small"  variant={ configuration[input.name]?.type ==='static' ? 'contained': 'outlined'} color="primary" onClick={() => {
                            configuration[input.name] = { type: 'static' }
                            wizard.configuration = configuration
                            dispatch({ type: UPDATE_WIZARD, payload: wizard})
                        }}  /> 
                        <Chip label="Mapping"  size="small"  variant={configuration[input.name]?.type ==='mapped' ? 'contained' : 'outlined'} color="primary" onClick={() => {
                            configuration[input.name] = { type: 'mapped' }
                            wizard.configuration = configuration
                            dispatch({ type: UPDATE_WIZARD, payload: wizard})
                        }}  /> 
                    </Box>
                    {configuration[input.name]?.type ==='static' && (
                        <Box sx={{ my:1 }}>
                            <TextField fullWidth variant="standard" placeholder="This value will be used and hidden from the user"
                                onChange={(e) => {
                                    configuration[input.name].value = e.target.value
                                    wizard.configuration = configuration
                                    dispatch({ type: UPDATE_WIZARD, payload: wizard})  
                                }} 
                            />
                        </Box>
                    )}
                    {configuration[input.name]?.type ==='mapped' && (
                        <Box sx={{ my:1 }}>
                            <select name="mapping" onChange={(e) => {
                                configuration[input.name].value = e.target.value
                                wizard.configuration = configuration
                                dispatch({ type: UPDATE_WIZARD, payload: wizard})
                            }}>
                                <option value="none">None</option>
                                <option value="userAddress">User Address</option>
                            </select>
                        </Box>
                    )}
                    <Box sx={{ my:1 }}>
                            <select name="format" onChange={(e) => {
                                configuration[input.name].format = e.target.value
                                wizard.configuration = configuration
                                dispatch({ type: UPDATE_WIZARD, payload: wizard})
                            }}>
                                <option value="none">None</option>
                                <option value="toWei">To Wei</option>
                                <option value="toBytes32">To Bytes32</option>
                            </select>
                    </Box>

                </Box>
            </Box>
        )
    }

    useEffect(() => {
        wizard.configuration = {}
        dispatch({ type: UPDATE_WIZARD, payload: wizard})
    }, [selected])

    const fns = writableFns.map((fun, index) => {
        return (
            <Grid item xs={12} sx={{ cursor:'pointer' }} onClick={() => setSelected(fun)}>
                <Paper>
                    <Box sx={{ p:2 }} display="flex" alignItems="center">
                        <Chip   label={fun.stateMutability} 
                                size="small" 
                                sx={{ mr: 1 }}
                                variant="outlined"
                                color={fun.stateMutability === 'payable' ? 'secondary' : 'primary'}
                        /> 
                        <Typography color="#212121" fontWeight="normal">{fun.name}</Typography>
                    </Box>
                </Paper>
            </Grid>
        ) 
    })

    return (
        <Grid item xs={12}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        {fns}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper sx={{ color:"#212121" }}>
                                <Box sx={{ p:2 }}>
                                    <Typography fontWeight="bold" variant="h2">{selected?.name}</Typography>
                                    {selected?.inputs.map((input) => {
                                        return configurableField(input)
                                    })}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default memo(Template)

