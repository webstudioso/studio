import { Fragment, useState } from 'react'
import { Button, Typography, CircularProgress, IconButton } from '@mui/material'
import { uploadPagesToIPFS, publishRouting } from 'api/publish'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader } from 'utils/loader'
import { getCidFromDeployment, getCustomFontsMetadatTags, getPages, getUserConfiguredMetadataTags, getWebstudioUrl } from 'utils/publish'
import { showSuccess, showError } from 'utils/snackbar'
import { getProjectUrl } from 'utils/project'
import { queryParams, getUrl } from 'utils/url'
import { trackEvent } from 'utils/analytics'
import { IconInfoCircle } from '@tabler/icons'
import HtmlTooltip from '../HtmlTooltip'
import constants from 'constant'
const { ANALYTICS } = constants

const PublishButton = ({ principal, project, editor }) => {
    const isLoading = useSelector((state) => state.loader.show)
    const account = useSelector((state) => state.account)
    const [release, setRelease] = useState()
    const dispatch = useDispatch()

    const getCidReleaseUrl = () => `https://ipfs.moralis.io:2053/ipfs/${release}`

    const handlePublish = async () => {
        try {
            showLoader({ dispatch, show: true })
            // Get latest stored data
            await editor.load()
            const tags = getUserConfiguredMetadataTags({ project })
            const fonts = getCustomFontsMetadatTags()
            const pages = getPages({ tags, fonts, editor })
            const upload = await uploadPagesToIPFS({ pages })
            const cid = getCidFromDeployment({ upload })
            setRelease(cid)

            // Register in AWS deploy defult subdomain
            const defaultSubdomain = getWebstudioUrl({ projectId: project.id })
            await publishRouting({id: defaultSubdomain, cid, principal })
    
            // Register in AWS deploy if custom domain
            const defaultDomain = project?.domain
            if (defaultDomain) {
                await publishRouting({id: defaultDomain, cid, principal })
            }
            window.open(`${getProjectUrl({ project })}${queryParams()}`, '__blank')
            trackEvent({ name: ANALYTICS.PUBLISH_PROJECT, params: account.user })
            showSuccess({ dispatch, message: 'Published' })
          } catch (error) {
            showError({ dispatch, error })
        } finally {
            showLoader({ dispatch, show: false })
        }
    }

    const publishTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">Publish
                <IconButton color="primary" size="small" sx={{ pb:1 }} onClick={() => window.open(constants.INFO_URL['PUBLISH'], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            <Typography variant="body">
                Click Publish to go live with your latest changes. Your website will be hosted in the<br/>
                <a style={{ color: '#6366F1'}} href="https://docs.ipfs.tech/concepts/faq/#what-is-ipfs" target="__blank">Interplanetary File System</a>
            </Typography>
            <Button size="small" sx={{ my: 1 }} href={`${getProjectUrl({ project })}${queryParams()}`} target="__blank">View site 🌐</Button>
            {release && (<Button size="small" sx={{ m: 1 }} href={getCidReleaseUrl()} target="__blank">View in IPFS ✨</Button>)}
        </Fragment>
    )

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

	return (
        <HtmlTooltip title={publishTooltip}>
            <span>
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={handlePublish}
                    size="large"
                    disabled={isLoading}
                    sx={{ 
                        mx: 2, 
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                        borderRadius: 25,
                        minWidth: 120
                    }} 
                    className="primary-color"
                >
                    <Typography fontWeight="bold">
                        Publish
                    </Typography>
                    { spinner }
                </Button>
            </span>
        </HtmlTooltip>
	)
}

export default PublishButton
