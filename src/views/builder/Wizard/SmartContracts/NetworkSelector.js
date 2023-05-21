import { useState, memo, useEffect } from 'react'
import { TextField, Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Stepper, Step, StepLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER, UPDATE_WIZARD } from 'store/actions'
import availableTemplates from 'templates/content'
import { FormattedMessage, useIntl } from 'react-intl'
import { loadSupportedNeworks } from 'api/networks'


const NetworkSelector = ({ activeStep, changeStep }) => {
    // useSelector
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const wizard = useSelector((state) => state.wizard)

    const loadNetworks = async() => {
        const list = await loadSupportedNeworks()
        setList(list)
    }

    useEffect(() => {
        loadNetworks()
    },[])

    return (
        <Box display="flex" alignItems="center">
            <select name="format" onChange={(e) => {
                const value = e.target.value
                console.log(value)
                wizard.network = list.find((item) => {
                    console.log(item.chainId, value)
                    return item.chainId.toString() === value.toString()
                })
                console.log(wizard.network)
                dispatch({ type: UPDATE_WIZARD, payload: wizard})
            }}>
                {list.map((network, index) => {
                    return <option value={network.chainId}>{network.name}</option>
                })}
            </select>

            <TextField variant="standard" placeholder="0x...." onChange={(e) => {
                const value = e.target.value
                wizard.contractAddress = value
                dispatch({ type: UPDATE_WIZARD, payload: wizard})
            }}/>
        </Box>
    )
}

export default memo(NetworkSelector)
