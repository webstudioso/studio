import * as React from 'react';
import { Dialog, Grid, Toolbar, AppBar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Templates from 'views/modal/Templates';
import Launch from 'views/modal/Launch';
import Users from 'views/modal/Users';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ModalManager = ({ open, handleClose, editor, event, principal, projectId }) => {
      const getTitle = () => {
        let title;
        switch (event) {
            case 'toggleTemplates':
                title = '🎉 Choose a new template for your current page!';
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
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ 
            "& .MuiPaper-root": {
                padding: "0px"
            },
        }}
    >
        <AppBar sx={{ position: 'relative', background: "#27293D" }}>
        <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h2" component="div">
                {getTitle()}
            </Typography>
            <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
            >
            <CloseIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 2, background: "#1E1E30", height: '100vh' }}>
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
            )}
        </Grid>
    </Dialog>
  );
}

export default ModalManager;
