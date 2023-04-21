import * as React from 'react';
import { Dialog, Grid, Toolbar, AppBar, IconButton, Typography, Slide, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import Templates from 'views/modal/Templates';
import Launch from 'views/modal/Launch';
import Users from 'views/modal/Users';
import InfoButton from 'views/builder/InfoButton';
import constants from 'constant';
import Templates from 'views/builder/SidePanel/Templates';

const { SECTION } = constants;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ModalManager = ({ open, onLeave, editor, event, principal, projectId }) => {
      const getTitle = () => {
        let title;
        switch (event) {
            case 'toggleTemplates':
                title = 'Choose Template';
                break;
            case 'toggleLaunch':
                title = '🚀 Let\'s configure and launch that project!';
                break;
            case 'toggleUsers':
                title = '👥 Let\'s manage project collaborators!';
                break;
            default:
                title = 'Invalid event'
        };
        return title;
      }

  return (
    <Dialog
        open={open}
        onClose={onLeave}
        TransitionComponent={Transition}
        fullScreen
        sx={{ 
            // width:'80%',
            "& .MuiPaper-root": {
                padding: "0px"
            },
            // width:'80vw'
            // m:2
        }}
    >
        <AppBar sx={{ position: 'relative', background: "#fff", borderTop: '5px solid #6366F1' }}>
        <Toolbar>
            <Typography variant="h4" color="black" fontWeight="bolder">
                {getTitle()}
                <InfoButton section={SECTION.TEMPLATE} />
            </Typography>
            <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={onLeave}>
                Pick Later
            </Button>
            {/* <IconButton
                edge="start"
                color="primary"
                onClick={onLeave}
                aria-label="close"
            >
                <CloseIcon />
            </IconButton> */}
        </Toolbar>
        </AppBar>
        <Templates fullScreen onLeave={onLeave}/>
        {/* <Grid container spacing={2} sx={{ p: 2, background: "#fff", height: '100vh' }}>
            <Templates fullScreen /> */}
{/*             
            { event === 'toggleTemplates' && (
                <Templates  editor={editor} 
                            handleClose={handleClose} />
            )}
            { event === 'toggleLaunch' && (
                <Launch editor={editor} 
                        handleClose={handleClose} 
                        principal={principal}
                        projectId={projectId}
                />
            )}
            { event === 'toggleUsers' && (
                <Users  editor={editor} 
                        handleClose={handleClose} 
                        principal={principal}
                        projectId={projectId}
                />
            )} */}
        {/* </Grid> */}
    </Dialog>
  );
}

export default ModalManager;
