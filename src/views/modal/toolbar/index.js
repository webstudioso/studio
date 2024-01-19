import { Toolbar, AppBar, Typography, Button, IconButton, Box } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import { FormattedMessage } from 'react-intl'
import { Close } from '@mui/icons-material'

const ModalToolbar = ({ title, tooltip, ctaLabel, onClose, ctaAction }) => {
    return (
        <AppBar sx={{ 
            position: 'fixed', 
            top: '0px',
            left: '0px',
            background: "#fff", 
            borderTop: '5px solid #6366F1'
        }}>
            <Toolbar>

                {/* Back */}
                <IconButton color="primary" sx={{ marginLeft: "8px"}} onClick={onClose}>
                    <Close />
                </IconButton>

                <Box flex={1}/>

                {/* Title */}
                <Typography variant="h4" color="black" fontWeight="bolder">
                    <FormattedMessage id={title} />
                    <InfoButton tooltip={tooltip} />
                </Typography>

                <Box flex={1}/>

                {/* CTA */}
                <Button variant="contained" 
                        color="primary" 
                        onClick={ctaAction}
                        size="large"
                        sx={{ 
                            mx: 2, 
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                            },
                            borderRadius: 25,
                            minWidth: 120
                        }} 
                        className="primary-color"
                    >
                    <Typography fontWeight="bold">
                        <FormattedMessage id={ctaLabel} />
                    </Typography>
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export default ModalToolbar