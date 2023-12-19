import { Fragment, useState } from 'react'
import { Button, Typography, CircularProgress, IconButton } from '@mui/material'
import { uploadPagesToIPFS, publishRouting } from 'api/publish'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader } from 'utils/loader'
import { getCidFromDeployment, getCustomFontsMetadatTags, getPages, getUserConfiguredMetadataTags, getWebstudioUrl } from 'utils/publish'
import { showError } from 'utils/snackbar'
import { getProjectUrl } from 'utils/project'
import { queryParams } from 'utils/url'
import { trackEvent } from 'utils/analytics'
import { IconInfoCircle } from '@tabler/icons'
import HtmlTooltip from '../HtmlTooltip'
import constants from 'constant'
import { useIntl } from 'react-intl'
const { ANALYTICS, EVENTS, IPFS_PROVIDER } = constants

const PublishButton = ({ principal, project, editor }) => {
    const intl = useIntl()
    const isLoading = useSelector((state) => state.loader.show)
    const account = useSelector((state) => state.account)
    const [release, setRelease] = useState()
    const dispatch = useDispatch()

    const getCidReleaseUrl = () => `${IPFS_PROVIDER}/${release}`

    const handlePublish = async () => {
        try {
            showLoader({ dispatch, show: true })
            const tags = getUserConfiguredMetadataTags({ project })
            const fonts = getCustomFontsMetadatTags()
            const pages = await getPages({ tags, fonts, editor, project })
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
            document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_PUBLISH_MODAL)); 
            trackEvent({ name: ANALYTICS.PUBLISH_PROJECT, params: account.user })
          } catch (error) {
            showError({ dispatch, error })
        } finally {
            showLoader({ dispatch, show: false })
        }
    }

    const publishTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">{intl.formatMessage({ id:'publish'})}
                <IconButton color="primary" size="small" sx={{ pb:1 }} onClick={() => window.open(constants.INFO_URL['PUBLISH'], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            <Typography variant="body">
                {intl.formatMessage({ id:'publish.tooltip'})}<br/>
                <a style={{ color: '#6366F1'}} href="https://docs.ipfs.tech/concepts/faq/#what-is-ipfs" target="__blank">{intl.formatMessage({id:"publish.ipfs"})}</a>
            </Typography>
            <Button fullWidth size="small" sx={{ my: 1 }} href={`${getProjectUrl({ project })}${queryParams()}`} target="__blank">{intl.formatMessage({id:"publish.view_site"})}</Button>
            {release && (<Button fullWidth size="small" sx={{ m: 1 }} href={getCidReleaseUrl(release)} target="__blank">{intl.formatMessage({id:"publish.view_ipfs"})}</Button>)}
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
                        {intl.formatMessage({ id:'publish'})}
                    </Typography>
                    { spinner }
                </Button>
            </span>
        </HtmlTooltip>
	)
}

export default PublishButton
