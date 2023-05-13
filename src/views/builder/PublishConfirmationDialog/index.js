import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Box, DialogActions, Button, Grid, Paper } from '@mui/material'
import { getProjectUrl } from 'utils/project'
import { IconExternalLink, IconShieldLock } from '@tabler/icons'
import { getRoute } from 'api/publish'
import { getUrlWithoutProtocol } from 'utils/url'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'

const PublishConfirmationDialog = ({ open, project, onClose, principal }) => {
    const dispatch = useDispatch()
    const [cid, setCid] = useState()
    const isLoading = useSelector((state) => state.loader.show)
    
    const loadCid = async() => {
        try {
            dispatch({ type: LOADER, show: true })
            const id = getUrlWithoutProtocol(project.subdomain)
            const release = await getRoute({ id, principal})
            setCid(release.cid)
        } catch (e) {
            console.log(e)
        } finally {
            dispatch({ type: LOADER, show: false })
        }
    }

    useEffect(() => {
        if (open)
            loadCid()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

	return (
        <Dialog
            open={open}
            keepMounted
            onClose={() => console.log("Close")}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ px: 8, pt:5 }}>{"Your site is live! 🎉"}</DialogTitle>
            <DialogContent sx={{ px: 8 }}>
                <DialogContentText id="alert-dialog-slide-description">
                    Your changes should be visible for visitors in the next couple of minutes and has been
                    issued it's own certificate.
                </DialogContentText>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ 
                                    borderRadius:2, 
                                    p:2, 
                                    background: '#232424', 
                                    color: 'white', 
                                    fontWeight: 'bold', 
                                    textAlign:'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    console.log("Clicking")
                                    const url = getProjectUrl({ project })
                                    window.open(url, '__blank')
                                }}
                                className="primary-color">
                            <Box display="flex" sx={{ textAlign: "center", width: '100%' }}>
                                <IconExternalLink color="white" size={22} />
                                <Box justifyItems="center" marginLeft={1} lineHeight="25px">
                                    Visit Website
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                            borderRadius:2, 
                            p:2, 
                            background: '#232424', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            textAlign:'center',
                            cursor: 'pointer'
                        }} 
                        disabled={isLoading}
                        onClick={() => {
                            const url = `https://ipfs.moralis.io:2053/ipfs/${cid}/cert.json`
                            window.open(url, '__blank')
                        }}
                        className="primary-color">
                            <Box display="flex" sx={{ textAlign: "center", width: '100%' }}>
                                <IconShieldLock color="white" size={24} />
                                <Box justifyItems="center" marginLeft={1} lineHeight="25px" marginRight={1}>
                                    View Certificate
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 8, pb: 5 }}>
                <Button onClick={onClose} variant="outlined">Continue</Button>
            </DialogActions>
        </Dialog>
	)
}

export default PublishConfirmationDialog
