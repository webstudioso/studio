import { forwardRef } from 'react'
import { Dialog, Slide, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { HIDE_MODAL } from 'store/actions'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ModalManager = ({ children }) => {
    const dispatch = useDispatch()
	const modal = useSelector((state) => state.modal)
    const { content, fullScreen } = modal

    const handleClose = () => dispatch({ type: HIDE_MODAL })

    const dialog = (
        <Dialog
            open={!!content}
            onClose={handleClose}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
            sx={{
                "& .MuiPaper-root": {
                    padding: "0px"
                }
            }}
        >   <Box sx={{ paddingTop: '60px' }}>
                { children }
            </Box>
        </Dialog>
    )

    return dialog
}

export default ModalManager
