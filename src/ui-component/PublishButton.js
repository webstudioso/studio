import { Fragment, useState } from 'react'
import { Button, Typography, CircularProgress, IconButton, Box } from '@mui/material'
import { publishRouting } from 'api/route'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader } from 'utils/loader'
import { getCidFromDeployment, getCustomFontsMetadatTags, getPages, getUserConfiguredMetadataTags, getWebstudioUrl } from 'utils/publish'
import { showError } from 'utils/snackbar'
import { getProjectUrl } from 'utils/project'
import { queryParams } from 'utils/url'
import { trackEvent } from 'utils/analytics'
import { IconInfoCircle } from '@tabler/icons'
import constants from 'constant'
import { useIntl } from 'react-intl'
import { pinFilesToIpfs } from 'api/ipfs'
import HtmlTooltip from 'views/builder/HtmlTooltip'
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
            const upload = await pinFilesToIpfs(pages, project.subdomain)
            const cid = upload.cid
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

    const onSaveAsTemplate = () => document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_SAVE_TEMPLATE_MODAL))

    const publishTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">{intl.formatMessage({ id:'publish'})}
                <IconButton color="primary" size="small" sx={{ pb:1 }} onClick={() => window.open(constants.INFO_URL['PUBLISH'], '__blank')}>
                    <IconInfoCircle />
                </IconButton>
            </Typography>
            <Typography variant="body">
                {intl.formatMessage({ id:'publish.tooltip'})}
                <a className="ml-1 text-indigo-500" href="https://docs.ipfs.tech/concepts/faq/#what-is-ipfs" target="__blank">{intl.formatMessage({id:"publish.ipfs"})}</a>
            </Typography>
            <Box flex={1} marginBottom={1}/>
            <Button fullWidth size="small" href={`${getProjectUrl({ project })}${queryParams()}`} target="__blank">{intl.formatMessage({id:"publish.view_site"})}</Button>
            {release && (<Button fullWidth size="small" href={getCidReleaseUrl(release)} target="__blank">{intl.formatMessage({id:"publish.view_ipfs"})}</Button>)}
            <Button fullWidth size="small" onClick={onSaveAsTemplate}>{intl.formatMessage({id:"publish.save_template"})}</Button>
        </Fragment>
    )

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

	return (
        <HtmlTooltip title={publishTooltip}>
            <span>
                <Button
                    variant="outlined"
                    onClick={handlePublish}
                    disabled={isLoading}
                >
                    {intl.formatMessage({ id:'publish'})}
                    { spinner }
                </Button>
            </span>
        </HtmlTooltip>
	)
}

export default PublishButton
