import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Alert, Button, Fade, Grow, IconButton, Slide } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';

// assets
import CloseIcon from '@mui/icons-material/Close';

// animation function
function TransitionSlideLeft(props) {
    return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
    return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
    return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
    return <Grow {...props} />;
}

// animation options
const transition = {
    SlideLeft: TransitionSlideLeft,
    SlideUp: TransitionSlideUp,
    SlideRight: TransitionSlideRight,
    SlideDown: TransitionSlideDown,
    Grow: GrowTransition,
    Fade
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
    const [open, setOpen] = useState(false);
    const snackbarInitial = useSelector((state) => state.snackbar);
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setOpen(snackbarInitial.open);
    }, [snackbarInitial.action, snackbarInitial.open]);

    const duration = snackbarInitial?.alertSeverity !== 'success' ? 1500 : 6000;

    return (
        <>
            {/* default snackbar */}
            {snackbarInitial.variant === 'default' && (
                <MuiSnackbar
                    anchorOrigin={snackbarInitial.anchorOrigin}
                    open={open}
                    autoHideDuration={duration}
                    onClose={(e, v) => handleClose(v)}
                    message={snackbarInitial.message}
                    TransitionComponent={transition[snackbarInitial.transition]}
                    action={
                        <>
                            <Button color="secondary" size="small" onClick={() => handleClose()}>
                                UNDO
                            </Button>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose()}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            )}

            {/* alert snackbar */}
            {snackbarInitial.variant === 'alert' && (
                <MuiSnackbar
                    TransitionComponent={transition[snackbarInitial.transition]}
                    anchorOrigin={snackbarInitial.anchorOrigin}
                    open={open}
                    autoHideDuration={duration}
                    sx={{
                        top: '5px !important',
                        height: 44
                    }}
                    onClose={(e, v) => handleClose(v)}
                >
                    <Alert
                        className="bg-white"
                        severity={snackbarInitial.alertSeverity}
                        action={
                            <>
                                {snackbarInitial.actionButton !== false && (
                                    <Button color="secondary" size="small" onClick={() => handleClose()}>
                                        UNDO
                                    </Button>
                                )}
                                {snackbarInitial.close !== false && snackbarInitial.alertSeverity !== 'success' && (
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose()}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </>
                        }
                    >
                        {snackbarInitial.message}
                    </Alert>
                </MuiSnackbar>
            )}
        </>
    );
};

export default Snackbar;
