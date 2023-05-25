import { useRef } from 'react'
import { Typography} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import ConfigTabs from "./ConfigTabs"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useIntl } from 'react-intl'

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
  const intl = useIntl()
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
            <Typography className="title-text">
                <span style={{ 
                    background: '#7572F9', 
                    padding: '3px 6px',
                    borderRadius: '4px',
                    color: 'white',
                    marginRight: '8px'
                }}>{editor?.getSelected()?.attributes?.tagName}</span>
                {intl.formatMessage({id:'configuration.title'})}
            </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 24,
                top: 24,
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
            <ConfigTabs editor={editor} />
        </DialogContent>
      </Dialog>
  )
}

export default DraggableDialog