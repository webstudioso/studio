import { memo } from 'react'
import { FormControl, InputLabel, MenuItem, Select,Box, Grid, Typography, IconButton, Button, Tooltip } from '@mui/material'
import { IconShieldCheck } from '@tabler/icons'
import availableContracts from './SupportedContracts'

const ContractType = ({ value, onChange, intl }) => {

    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel id="wizard-contract-type-label">{intl.formatMessage({id:'wizard.contract_type_label'})}</InputLabel>
                <Select
                    labelId="wizard-contract-type-label"
                    id="wizard-contract-type"
                    value={value}
                    label={intl.formatMessage({id:'wizard.contract_type_label'})}
                >
                    {availableContracts.map((contract) => {
                        return (
                            <MenuItem value={contract.name} onClick={() => onChange(contract)} key={contract.name} sx={{m:1, p:2}}>
                                <Box>
                                    <Box sx={{ wordWrap: 'break-word' }}>
                                        <Typography fontWeight="bold" fontSize={14} color="#212121" marginBottom={1}>{intl.formatMessage({ id: contract.name })}</Typography>

                                        <Typography fontWeight="normal" fontSize={12} color="#999" marginBottom={2} height={20} sx={{ whiteSpace: 'break-spaces'}}>
                                            {intl.formatMessage({id:contract.description})}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Tooltip title={intl.formatMessage({id: 'contract.explore_url'})}>
                                            <Button href={contract.url} target="__blank">
                                                {contract.logo && (<img src={contract.logo} width={32} alt={contract.name} style={{borderRadius: '50%'}}/> )}
                                                {contract.source && (<Typography fontWeight="bold" fontSize={10} color="#212121">{contract.source}</Typography> )}
                                            </Button>
                                        </Tooltip>
                                        <Box flex={1} />
                                        {contract.audited && (
                                            <IconButton color="primary" size="small">
                                                <IconShieldCheck />
                                                <Typography fontSize={10} fontWeight="bold">{intl.formatMessage({ id:'audited' })}</Typography>
                                            </IconButton>    
                                        )}
                                    </Box>
                                </Box>
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default memo(ContractType)
