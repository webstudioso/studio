import { useRef } from 'react'
import { Typography} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import ConfigTabs from "../ConfigTabs"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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

const DraggableDialog = ({ open, handleClose, editor }) => {
  const ref = useRef(null);

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
                }}>{editor?.getSelected()?.attributes?.tagName}</span>
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
        <DialogContent  ref={ref}         
                        sx={{
                            width: 400,
                            height: 450
                        }}>
            <ConfigTabs />
        </DialogContent>
      </Dialog>
  )
}

export default DraggableDialog