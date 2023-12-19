import { useRef } from 'react'
import { Typography, Stack, IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ConfigTabs from "./ConfigTabs"
import CloseIcon from '@mui/icons-material/Close'
import { upperFirst } from 'lodash'
import DraggablePaper from './Draggable'
import { IconInfoCircle } from '@tabler/icons'

const DraggableDialog = ({ open, handleClose, editor, intl }) => {
  const ref = useRef(null);

  const getType = () => {
    return editor?.getSelected()?.attributes?.type
  }

  const openTutorialLink = () => {
    window.open(`https://docs.webstudio.so/components#${getType()}`, '__blank')
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaper}
        hideBackdrop
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" sx={{pb:0}}>
            <Stack direction="row" justifyContent="left" alignItems="center">
                <Typography className="title-text">
                    {`${upperFirst(getType())} ${intl.formatMessage({id:'configuration.title'})}`}
                </Typography>
                <IconButton color="primary" onClick={openTutorialLink}>
                    <IconInfoCircle />
                </IconButton>
            </Stack>
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
                            width: 420,
                            height: 470
                        }}>
            <ConfigTabs editor={editor} intl={intl} />
        </DialogContent>
      </Dialog>
  )
}

export default DraggableDialog