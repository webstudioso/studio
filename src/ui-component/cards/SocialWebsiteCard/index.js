import { Paper, Typography, Box } from '@mui/material'

const SocialWebsiteCard = ({ image, title, description, url }) => {
    return (
        <Paper sx={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden' }} elevation={3}>
            <img src={image} width="100%" height="auto" />
            <Box padding="0px 12px 12px 12px" borderTop="1px solid rgba(0,0,0,0.1)">
                <Typography color="#666" fontSize={16} fontWeight={700} mt={1}>
                    {title}
                </Typography>
                <Typography mt={1}>
                    {description}
                </Typography>
                <Typography color="#888" fontSize={14} fontWeight={500} mt={1}>
                    {url}
                </Typography>
            </Box>
        </Paper>
    )
}

export default SocialWebsiteCard
