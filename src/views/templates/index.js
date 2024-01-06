import { forwardRef, useState } from 'react'
import { Dialog, Toolbar, AppBar, Typography, Slide, Button, Box } from '@mui/material'
import InfoButton from 'views/builder/InfoButton'
import Templates from 'views/templates/Templates'
import { FormattedMessage } from 'react-intl'
import PageTypes from 'views/builder/SidePanel/Pages/PageTypes'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TemplateModal = ({ open=false, onLeave, project, principal }) => {
    const [type, setType] = useState('landing_page')

    const handleTypeChange = (selectedType) => setType(selectedType)

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
                        <FormattedMessage id="template_page.title" />
                        <InfoButton tooltip="template_page.title_tooltip" />
                    </Typography>
                    <Box paddingX={10}>
                        <PageTypes onTypeChange={handleTypeChange} defaultType={type}/>
                    </Box>
                    <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={onLeave}>
                        <FormattedMessage id="template_page.pick_later" />
                    </Button>
                </Toolbar>
            </AppBar>
            <Templates fullScreen onLeave={onLeave} type={type} project={project} principal={principal} />
        </Dialog>
    )
}

export default TemplateModal
