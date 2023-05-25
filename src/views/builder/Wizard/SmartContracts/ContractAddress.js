import { TextField, Grid } from '@mui/material'

const ContractAddress = ({ value, onChange, intl }) => {

    return (
        <Grid item xs={12}>
            <TextField  placeholder={intl.formatMessage({id:'wizard.contract_address_placeholder'})} 
                        value={value} 
                        label={intl.formatMessage({id:'wizard.contract_address_label'})}
                        fullWidth 
                        onChange={(e) => onChange(e.target.value)}
            />
        </Grid>
    )
}

export default ContractAddress
