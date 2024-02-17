import { forwardRef } from 'react'
import { Dialog, Toolbar, AppBar, Typography, Slide, Button } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import { FormattedMessage } from 'react-intl'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FullScreenFrame = ({ 
    open=false, 
    onLeave, 
    children,
    title,
    tooltip,
    dismissLabel
}) => {
  return (
    <Dialog
        open={open}
        onClose={onLeave}
        TransitionComponent={Transition}
        fullScreen
        sx={{
            "& .MuiPaper-root": {
                padding: "0px"
            }
        }}
    >
        <AppBar sx={{ position: 'relative', background: "#fff", borderTop: '5px solid #6366F1' }}>
            <Toolbar>
                <Typography variant="body" color="black" fontWeight="bolder">
                    <FormattedMessage id={title} />
                    <InfoButton tooltip={tooltip} />
                </Typography>
                <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={onLeave}>
                    <FormattedMessage id={dismissLabel} />
                </Button>
            </Toolbar>
        </AppBar>
        { children }
    </Dialog>
  )
}

export default FullScreenFrame
