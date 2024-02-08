import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, Grid } from '@mui/material'
import { getProjectUrl } from 'utils/project'
import { getRoute } from 'api/publish'
import { getUrlWithoutProtocol, queryParams } from 'utils/url'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import { publishProject } from 'api/discord'
import constants from 'constant'
import SocialWebsiteCard from 'ui-component/cards/SocialWebsiteCard'

const { IPFS_PROVIDER } = constants


const PublishConfirmationModal = ({ open, project, onClose, principal }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [cid, setCid] = useState()
    const account = useSelector((state) => state.account)
    
    const loadCid = async() => {
        try {
            dispatch({ type: LOADER, show: true })
            const id = getUrlWithoutProtocol(project.subdomain)
            const release = await getRoute({ id, principal})
            setCid(release.cid)
            publishProject(dispatch, account.user, null, project, intl.formatMessage({ id: 'discord_event.project_published' }))
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

    const handleOpenSite = () => window.open(`${getProjectUrl({ project })}${queryParams()}`, '__site')

    const handleOpenIpfs = () => window.open(`${IPFS_PROVIDER}/${cid}`, '__ipfs')

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
                <Grid container id="alert-dialog-slide-description" mb={2}>
                    <FormattedMessage id="publish.is_live_description" />
                </Grid>
                <SocialWebsiteCard  image={project.metadata['og:image']} 
                                    title={project.metadata['og:title']}
                                    description={project.metadata['og:description']}
                                    url={getProjectUrl({ project })}
                />
            </DialogContent>
            <DialogActions sx={{ px: 8, pb: 5 }}>
                <Button onClick={handleOpenSite}>{intl.formatMessage({id:"publish.view_site"})}</Button>
                <Button onClick={handleOpenIpfs}>{intl.formatMessage({id:"publish.view_ipfs"})}</Button>
                <Box flex={1} />
                <Button onClick={onClose} variant="outlined">{intl.formatMessage({id:'action.continue'})}</Button>
            </DialogActions>
        </Dialog>
	)
}

export default PublishConfirmationModal
