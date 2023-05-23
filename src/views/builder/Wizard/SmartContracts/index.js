import { useState, memo, useEffect } from 'react'
import { TextField, FormControl, InputLabel, MenuItem, Select,Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Stepper, Step, StepLabel, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import availableTemplates from 'templates/content'
import { FormattedMessage, useIntl } from 'react-intl'
import TemplatePicker from './TemplatePicker'
import Configuration from './Configuration'
import NetworkSelector from './NetworkSelector'
import { loadSupportedNeworks } from 'api/networks'
import availableContracts from './SupportedContracts'
import { IconShieldCheck } from '@tabler/icons'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const SmartContracts = ({ element, editor, activeStep, changeStep, intl }) => {
    const [networks, setNetworks] = useState([])
    const [payload, setPayload] = useState(element?.props()?.payload)

    console.log(payload)

    const fns = payload?.contract?.abi.filter((item) => item.type==='function' && (item.stateMutability.includes('payable')))

    const loadData = async() => {
        const list = await loadSupportedNeworks()
        setNetworks(list)
    }

    useEffect(() => {
        // setPayload()
        setPayload(element?.props()?.payload)
        loadData()
    }, [])

    useEffect(() => {
        // try {
            // const element = editor.getSelected()
            // if (element && element.attributes.payload)
            //     element.attributes.payload = payload
        // } catch (e) {

        // }
        // if (element)
            // element.payload = JSON.stringify(payload)

        // editor.getSelected().setAttributes({
        //     attributes:{
        //         payload:"gg"
        //     }
        // })

        // console.log(payload)
        // element.addAttributes({ payload: JSON.stringify(payload) })
        // console.log(element)
        element.getTrait('payload').set({value: payload})
    }, [payload])

    
    const configurableField = (input) => {
        const configuration = payload?.method
        console.log(input)
        return (
            <Box sx={{ p: 2, mt:1, border: '1px solid rgba(0,0,0,0.05)'}}>
                   <Box display="flex" alignItems="center">
                        <Typography variant="body" fontWeight="bold">{input.name}</Typography>
                        <Box flex={1} />
                            <Chip label={input.type} 
                                        size="small" 
                                        variant="outlined"
                                        color="primary"
                            />
                        </Box>
                    <Box flex={1} />
                    <Box sx={{ mt: 2 }}>
                        <FormControl 
                            fullWidth>
                        <InputLabel id="demo-simple-select-label">How is this value input</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payload?.mapping && payload?.mapping[input.name] && payload?.mapping[input.name].value }
                            size="small"
                            name="valueType"
                            // variant="standard"
                            label="How is this value input"
                            onChange={(e) => {
                                const newPayload = {...payload}
                                if (!newPayload.mapping) {
                                    newPayload.mapping = {}
                                }
                                console.log(newPayload.mapping)
                                newPayload.mapping[input.name] = {
                                    ...payload.mapping,
                                    ...e.target
                                }
                                setPayload(newPayload)
                            }}
                        >
                            {/* <MenuItem value={'dynamic'}>User will manually input</MenuItem> */}
                            <MenuItem value={'static'}>Static Value</MenuItem>
                            <MenuItem value={'userAddress'}>User Address</MenuItem>
                        </Select>
                        </FormControl>
                        

                    </Box>
                    { payload?.mapping && payload?.mapping[input.name] && payload?.mapping[input.name].value === 'static'  &&
                        (<Box sx={{ mt: 2 }}>
                            <TextField  fullWidth size="small" 
                                        value={payload?.defaultValue && payload?.defaultValue[input.name] }
                                        placeholder="This value will be used and hidden from the user"
                                onChange={(e) => {
                                    const newPayload = {...payload}
                                    if (!newPayload.defaultValue) {
                                        newPayload.defaultValue = {}
                                    }
                                    console.log(newPayload.defaultValue)
                                    newPayload.defaultValue[input.name] = e.target.value
                                    setPayload(newPayload)
                                }} 
                            />
                    </Box>)}
                    {/* <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">How is this value formatted</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payload?.format && payload?.format[input.name] && payload?.format[input.name].value }
                            size="small"
                            name="valueFormat"
                            // variant="standard"
                            label="How is this value formatted"
                            onChange={(e) => {
                                const newPayload = {...payload}
                                if (!newPayload.format) {
                                    newPayload.format = {}
                                }
                                console.log(newPayload.format)
                                newPayload.format[input.name] = {
                                    ...payload.format,
                                    ...e.target
                                }
                                setPayload(newPayload)
                            }}
                        >
                            <MenuItem value={'none'}>No Format</MenuItem>
                            <MenuItem value={'toWei'}>ToWei</MenuItem>
                            <MenuItem value={'toBytes32'}>ToBytes32</MenuItem>
                        </Select>
                        </FormControl>
                    </Box> */}
            </Box>
        )
        // return (
        //     <Box sx={{ p: 2, mt:1, border: '1px solid rgba(0,0,0,0.05)'}}>
                // <Box display="flex" alignItems="center">
                //     <Typography variant="body" fontWeight="normal">{input.name}</Typography>
                //     <Box flex={1} />
                //         <Chip label={input.type} 
                //                     size="small" 
                //                     variant="outlined"
                //                     color="primary"
                //         />
                //     </Box>
                // <Box flex={1} />
        //         <Box>
                    // <Box sx={{ mt: '10px'}}>
                    //     <Chip label="User Input"  size="small"  variant={!configuration[input.name]?.type || configuration[input.name]?.type ==='dynamic' ? 'contained' : 'outlined'} color="primary" onClick={() => {
                    //         configuration[input.name] = { type: 'dynamic' }
                    //         wizard.configuration = configuration
                    //         dispatch({ type: UPDATE_WIZARD, payload: wizard})
                    //     }} /> 
                    //     <Chip sx={{ mx: '5px' }} label="Static"  size="small"  variant={ configuration[input.name]?.type ==='static' ? 'contained': 'outlined'} color="primary" onClick={() => {
                    //         configuration[input.name] = { type: 'static' }
                    //         wizard.configuration = configuration
                    //         dispatch({ type: UPDATE_WIZARD, payload: wizard})
                    //     }}  /> 
                    //     <Chip label="Mapping"  size="small"  variant={configuration[input.name]?.type ==='mapped' ? 'contained' : 'outlined'} color="primary" onClick={() => {
                    //         configuration[input.name] = { type: 'mapped' }
                    //         wizard.configuration = configuration
                    //         dispatch({ type: UPDATE_WIZARD, payload: wizard})
                    //     }}  /> 
                    // </Box>
                    // {configuration[input.name]?.type ==='static' && (
                    //     <Box sx={{ my:1 }}>
                    //         <TextField fullWidth variant="standard" placeholder="This value will be used and hidden from the user"
                    //             onChange={(e) => {
                    //                 configuration[input.name].value = e.target.value
                    //                 wizard.configuration = configuration
                    //                 dispatch({ type: UPDATE_WIZARD, payload: wizard})  
                    //             }} 
                    //         />
                    //     </Box>
                    // )}
                    // {configuration[input.name]?.type ==='mapped' && (
                    //     <Box sx={{ my:1 }}>
                    //         <select name="mapping" onChange={(e) => {
                    //             configuration[input.name].value = e.target.value
                    //             wizard.configuration = configuration
                    //             dispatch({ type: UPDATE_WIZARD, payload: wizard})
                    //         }}>
                    //             <option value="none">None</option>
                    //             <option value="userAddress">User Address</option>
                    //         </select>
                    //     </Box>
                    // )}
                    // <Box sx={{ my:1 }}>
                    //         <select name="format" onChange={(e) => {
                    //             configuration[input.name].format = e.target.value
                    //             wizard.configuration = configuration
                    //             dispatch({ type: UPDATE_WIZARD, payload: wizard})
                    //         }}>
                    //             <option value="none">None</option>
                    //             <option value="toWei">To Wei</option>
                    //             <option value="toBytes32">To Bytes32</option>
                    //         </select>
                    // </Box>

        //         </Box>
        //     </Box>
        // )
    }
    
    return (
        <Grid container spacing={3}>
            

            <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Network</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={payload?.network?.chainId}
                        label="Network"
                    >
                        {networks.map((network) => {
                            // console.log(network)
                            return (
                                <MenuItem value={network.chainId}  onClick={() => {
                
                                    const newPayload = {...payload}
                                    newPayload.network = network
                                    console.log(newPayload)
                                    setPayload(newPayload)
                                }}>
                                    <Box display="flex" alignItems="center">
                                        {network.name}
                                    </Box>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>

        
            <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Contract Type</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={payload?.contract?.name}
                        label="Contract Type"
                    >
                        {availableContracts.map((contract) => {
                            return (
                                <MenuItem value={contract.name} onClick={() => {
                                    console.log("yes?!")
                                    const newPayload = {...payload}
                                    newPayload.contract = contract
                                    console.log(newPayload)
                                    setPayload(newPayload)
                                }}>
                                    <Box>
                                        <Box sx={{ px: 2, mb: 1, wordWrap: 'break-word' }}>
                                            <Typography fontWeight="bold" fontSize={14} color="#212121" marginBottom={1}>{intl.formatMessage({ id: contract.name })}</Typography>

                                            <Typography fontWeight="normal" fontSize={12} color="#999" height={20}>
                                                {intl.formatMessage({id:contract.description})}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ px: 1}} display="flex" alignItems="center">
                                            <img src={contract.logo} width={32} /> 
                                            <Typography fontWeight="bold" fontSize={10} color="#212121">{contract.source}</Typography>
                                            <Box flex={1} />
                                            <IconButton color="primary" size="small">
                                                <IconShieldCheck />
                                                <Typography fontSize={10} fontWeight="bold">{intl.formatMessage({ id:'audited' })}</Typography>
                                            </IconButton>    
                                        </Box>
                                    </Box>
                                </MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
            </Grid>


            <Grid item xs={12}>
                <TextField placeholder="0x..." value={payload?.contractAddress} label="Contract Address" fullWidth onChange={(e) => {
                    const newPayload = {...payload}
                    newPayload.contractAddress = e.target.value
                    console.log(newPayload)
                    setPayload(newPayload)
                }}/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Function Name</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={payload?.method?.name}
                        label="Function Name"
                        onChange={() => {}}
                    >
                        {fns?.map((fun) => {
                            console.log(fun)
                            return (
                                <MenuItem value={fun.name}  onClick={() => {
                                    const newPayload = {...payload}
                                    newPayload.method = fun
                                    console.log(newPayload)
                                    setPayload(newPayload)
                                }}>
                                    <Box display="flex" alignItems="center" sx={{ width:'100%'}}>
                                        {fun.name}
                                        <Box flex={1} />
                                        <Chip label={fun.stateMutability} 
                                                    size="small" 
                                                    variant="outlined"
                                                    color={fun.stateMutability === 'payable' ? 'secondary':'primary'}
                                        />
                                    </Box>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                    <Typography fontWeight="bold" variant="body">{payload?.method?.name}</Typography>
                    {payload?.method?.inputs.map((input) => {
                        return configurableField(input)
                    })}
            </Grid>


        </Grid>
    )
}

export default SmartContracts
