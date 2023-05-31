import { useEffect, useState } from 'react'
import { Typography, Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, Grid, Paper } from '@mui/material'
import { getProjectUrl } from 'utils/project'
import { getRoute } from 'api/publish'
import { getUrlWithoutProtocol, queryParams } from 'utils/url'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import { LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'

const PublishConfirmationDialog = ({ open, project, onClose, principal }) => {
    const intl = useIntl()
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
            keepmounted="true"
            onClose={() => console.log("Close")}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ px: 8, pt:5 }}>
                <FormattedMessage id="publish.is_live" />
            </DialogTitle>
            <DialogContent sx={{ px: 8 }}>
                <Grid container id="alert-dialog-slide-description">
                    <FormattedMessage id="publish.is_live_description" />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ 
                                    borderRadius:2, 
                                    p:2, 
                                    background: '#212121', 
                                    color: 'white', 
                                    fontWeight: 'normal', 
                                    textAlign:'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    const url = `${getProjectUrl({ project })}${queryParams()}`
                                    window.open(url, '__blank')
                                }}>
                            <Box display="flex">
                                <Box justifyItems="center">
                                    {intl.formatMessage({id:"publish.view_site"})}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Paper sx={{ 
                            borderRadius:2, 
                            p:2, 
                            background: '#212121', 
                            color: 'white', 
                            fontWeight: 'normal', 
                            textAlign:'center',
                            cursor: 'pointer'
                        }} 
                        disabled={isLoading}
                        onClick={() => {
                            const url = `https://ipfs.moralis.io:2053/ipfs/${cid}`
                            window.open(url, '__blank')
                        }}>
                            <Box display="flex">
                                <Box justifyItems="center">
                                    {intl.formatMessage({id:"publish.view_ipfs"})}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{mt:2}}>
                    <Typography color="black" fontWeight="light" fontSize={14} sx={{ marginRight: 1 }}>
                        {intl.formatMessage({id:"social.text"})}
                    </Typography>
                    <Box sx={{ marginRight: '5px' }}>
                        <LinkedinShareButton 
                            title={intl.formatMessage({id:"social.share"})}
                            url={getProjectUrl({ project })}
                        >
                            <LinkedinIcon round size={32} />
                        </ LinkedinShareButton>
                    </Box>
                    <Box>
                        <TwitterShareButton
                            title={intl.formatMessage({id:"social.share"})}
                            url={getProjectUrl({ project })}
                            hashtags={["Web3", "NoCode"]} 
                        >
                            <TwitterIcon round size={32} />
                        </TwitterShareButton>
                    </Box>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 8, pb: 5 }}>
                <Button onClick={onClose} variant="outlined">{intl.formatMessage({id:'action.continue'})}</Button>
            </DialogActions>
        </Dialog>
	)
}

export default PublishConfirmationDialog
