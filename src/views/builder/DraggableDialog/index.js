import { useRef } from 'react'
import { Typography} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ConfigTabs from "./ConfigTabs"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { upperFirst } from 'lodash'
import DraggablePaper from './Draggable'

const DraggableDialog = ({ open, handleClose, editor, intl }) => {
  const ref = useRef(null);

  const getType = () => {
    return editor?.getSelected()?.attributes?.type
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaper}
        hideBackdrop
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <Typography className="title-text">
                {`${upperFirst(getType())} ${intl.formatMessage({id:'configuration.title'})}`}
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
                            width: 370,
                            height: 450
                        }}>
            <ConfigTabs editor={editor} intl={intl} />
        </DialogContent>
      </Dialog>
  )
}

export default DraggableDialog