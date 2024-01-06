import { Grid, Typography, Box } from '@mui/material'
import { useIntl } from 'react-intl'

const Section = ({ children, ...props }) => {
    const intl = useIntl()
    return (
            <Grid container spacing={1} sx={{
                background: '#fdfdfd', 
                border:'1px solid #f3f3f3', 
                mt: 1
            }}>
                <Grid item xs={12}>
                    <Typography fontWeight="bold" color="#222" fontSize={14}>{intl.formatMessage({id: props.title})}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="#555" fontSize={12}>
                    {intl.formatMessage({id: props.description})}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1, pr: 1, pb: 1 }}>
                    {children}
                </Grid>
            </Grid>
    )
}

export default Section