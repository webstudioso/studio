import { useRef, useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ConfigTabs from "./ConfigTabs";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ open, handleClose }) {
//   const [open, setOpen] = React.useState(false);
const ref = useRef(null);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//window?.editor?.getSelected()?.attributes?.tagName

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        hideBackdrop
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <Typography fontWeight="bold" color="black">
                <span style={{ 
                    background: '#7572F9', 
                    padding: '5px', 
                    border: '1px solid #2A3EB1;',
                    borderRadius: '4px',
                    color: 'white',
                    marginRight: '5px'
                }}>{window?.editor?.getSelected()?.attributes?.tagName}</span>
                Configuration
            </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent ref={ref}         sx={{
            width: 400,
            height: 450
        }}>
            <ConfigTabs />
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
  );
}