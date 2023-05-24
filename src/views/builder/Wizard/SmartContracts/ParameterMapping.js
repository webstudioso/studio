import { FormControl, InputLabel, MenuItem, Select,Box, Grid, Chip, Typography, TextField } from '@mui/material'

const ParameterMapping = ({ value, onChangeMapping, onChangeValue, intl, inputs, mapping, defaultValue }) => {

    const configurableField = (input) => {
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
                        <InputLabel id="fn_attr_mapping_label">{intl.formatMessage({id:'wizard.function_attribute_mapping_label'})}</InputLabel>
                        <Select
                            labelId="fn_attr_mapping_label"
                            id="fn_attr_mapping"
                            value={mapping && mapping[input.name] && mapping[input.name].value }
                            size="small"
                            name="valueType"
                            label={intl.formatMessage({id:'wizard.function_attribute_mapping_label'})}
                            onChange={(e) => onChangeMapping(input, e.target)}
                        >
                            <MenuItem value={'static'}>{intl.formatMessage({id:'wizard.function_attribute_mapping_static_value'})}</MenuItem>
                            <MenuItem value={'userAddress'}>{intl.formatMessage({id:'wizard.function_attribute_mapping_user_address'})}</MenuItem>
                        </Select>
                        </FormControl>
                        

                    </Box>
                    { mapping && mapping[input.name] && mapping[input.name].value === 'static'  &&
                        (<Box sx={{ mt: 2 }}>
                            <TextField  fullWidth size="small" 
                                        value={defaultValue && defaultValue[input.name] }
                                        placeholder={intl.formatMessage({id:'wizard.function_attribute_mapping_static_value_description'})}
                                onChange={(e) => onChangeValue(input, e.target.value)} 
                            />
                    </Box>)}
            </Box>
        )
    }
    
    return (
        <Grid item xs={12}>
                <Typography fontWeight="bold" variant="body">{value}</Typography>
                {inputs?.map((input) => {
                    return configurableField(input)
                })}
        </Grid>
    )
}

export default ParameterMapping
