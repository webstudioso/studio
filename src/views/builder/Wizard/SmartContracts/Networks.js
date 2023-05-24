import { useState, useEffect, memo } from 'react'
import { FormControl, InputLabel, MenuItem, Select,Box, Grid } from '@mui/material'
import { loadSupportedNeworks } from 'api/networks'

const Networks = ({ value, onChange, intl }) => {
    const [networks, setNetworks] = useState([])

    const loadData = async() => {
        const list = await loadSupportedNeworks()
        setNetworks(list)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="wizard-network-label">{intl.formatMessage({id:'wizard.network_label'})}</InputLabel>
                <Select
                    labelId="wizard-network-label"
                    id="wizard-network"
                    value={value}
                    label={intl.formatMessage({id:'wizard.network_label'})}
                >
                    {networks.map((network) => {
                        return (
                            <MenuItem value={network.chainId} onClick={() => onChange(network)}>
                                <Box display="flex" alignItems="center">
                                    {network.name}
                                </Box>
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Grid>

    )
}

export default memo(Networks)
