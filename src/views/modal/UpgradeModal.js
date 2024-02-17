import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useIntl } from 'react-intl'

const UpgradeModal = ({ open, onClose }) => {
    const intl = useIntl()
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {intl.formatMessage({ id: 'upgrade.title' })}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {intl.formatMessage({ id: 'upgrade.description' })}
            </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px:5, mb:1 }}>
                <Button onClick={onClose}>{intl.formatMessage({ id: 'upgrade.continue' })}</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    window.open('https://www.webstudio.so/plans-pricing','_pplan')
                    onClose()
                }} autoFocus>
                    {intl.formatMessage({ id: 'upgrade.now' })}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpgradeModal
