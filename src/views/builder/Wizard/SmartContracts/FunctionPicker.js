import { FormControl, InputLabel, MenuItem, Select,Box, Grid, Chip } from '@mui/material'

const FunctionPicker = ({ value, onChange, intl, functionList }) => {

    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel id="wizard-function-picker-label">{intl.formatMessage({id:'wizard.function_pick_label'})}</InputLabel>
                <Select
                    labelId="wizard-function-picker-label"
                    id="wizard-function-picker"
                    value={value}
                    label={intl.formatMessage({id:'wizard.function_pick_label'})}
                >
                    {functionList?.map((fun) => {
                        return (
                            <MenuItem value={fun.name}  onClick={() => onChange(fun)}>
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
    )
}

export default FunctionPicker
