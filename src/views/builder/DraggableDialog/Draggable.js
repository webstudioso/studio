import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'

const DraggablePaper =(props) =>{
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  export default DraggablePaper