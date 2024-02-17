import { forwardRef } from 'react'
import { Dialog, Toolbar, AppBar, Typography, Slide, Button } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import Templates from 'views/templates/List'
import { FormattedMessage } from 'react-intl'

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
                <Typography variant="body" color="black" fontWeight="bolder">
                    <FormattedMessage id="template_page.title" />
                    <InfoButton tooltip="template_page.title_tooltip" />
                </Typography>
                <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={onLeave}>
                    <FormattedMessage id="template_page.pick_later" />
                </Button>
            </Toolbar>
        </AppBar>
        <Templates fullScreen onLeave={onLeave}/>
    </Dialog>
  )
}

export default ModalManager
