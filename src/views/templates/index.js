import { forwardRef } from 'react'
import { Dialog, Toolbar, AppBar, Typography, Slide, Button } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import constants from 'constant'
import Templates from 'views/templates/List'

const { SECTION } = constants;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ModalManager = ({ open=false, onLeave }) => {
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
                <Typography variant="h4" color="black" fontWeight="bolder">
                    Choose Template
                    <InfoButton section={SECTION.TEMPLATE} />
                </Typography>
                <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={onLeave}>
                    Pick Later
                </Button>
            </Toolbar>
        </AppBar>
        <Templates fullScreen onLeave={onLeave}/>
    </Dialog>
  )
}

export default ModalManager
