
import { Button, Grid } from '@mui/material'

const AbiUpload = ({ onChange, intl }) => {
    return (
        <Grid item xs={12}>
            <Button variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ textTransform: 'none' }}
            >
                {intl.formatMessage({id:'contract.upload_abi_json'})}
                <input
                    accept="application/JSON"
                    onChange={onChange}
                    type="file"
                    hidden
                />
            </Button>
        </Grid>
    )
}

export default AbiUpload
