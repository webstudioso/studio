import { useState } from 'react'
import { Grid, Button,TextField, Typography } from '@mui/material'
import { LOADER } from "store/actions";
import { useDispatch, useSelector } from 'react-redux'
import { getProjectUrl } from 'utils/project'
import { showError, showSuccess } from 'utils/snackbar'
import { notifyDiscordWebhook } from 'api/discord'
import { useIntl } from 'react-intl'
import constants from 'constant'

const { WEBSTUDIO_LOGO } = constants

const CustomDomain = ({ project, onSubmit }) => {
    const intl = useIntl()
    const isLoading = useSelector((state) => state.loader.show)
    const account = useSelector((state) => state.account)
    const dispatch = useDispatch()
    const [customDomain, setCustomDomain] = useState()
    
    const handleSubmitCustomDomain = async () => {
        const metadata = project?.metadata
        const avatar_url = metadata ? metadata['icon'] : WEBSTUDIO_LOGO
        const image = metadata ? metadata['og:image'] : WEBSTUDIO_LOGO
        try {
            const message = intl.formatMessage({ id: 'discord_event.custom_domain_request' })
            dispatch({ type: LOADER, show: true })
            await notifyDiscordWebhook({
                avatar_url,
                image,
                username: account.user.email,
                content: 'Request setup for custom domain',
                name: account?.user?.issuer,
                title: customDomain,
                url: getProjectUrl({ project }),
                color: 15258703,
                issuer: account?.user?.issuer,
                subdomain: project?.subdomain,
                referral: account?.referral?.email
            })
            showSuccess({ dispatch, message })
        } catch (e) {
            showError({ dispatch, error: e.message })
        } finally {
            dispatch({ type: LOADER, show: false })
            if (onSubmit)
                onSubmit()
        }
    }

    const hasPlan = account?.subscription?.subscriptionId ||
                    account?.referral?.subscriptionId

    const customDomainBlock = (
        <Grid container spacing={1} sx={{ pb: 1, background: '#fdfdfd', border:'1px solid #f3f3f3' }}>
            <Grid item xs={12}>
                <Typography fontWeight="bold" color="#222" fontSize={14}>{intl.formatMessage({ id: 'settings.custom_domain' })}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="#555" fontSize={12}>
                    {intl.formatMessage({ id: 'settings.custom_domain_description' })}
                </Typography>
            </Grid>
            { !hasPlan && (
                <Grid item xs={12} sx={{ mt: 1, pr: 2, pl: 1, pb: 2 }}>
                        <Button fullWidth                 
                                onClick={() => {
                                    window.open(
                                        'https://www.webstudio.so/plans-pricing',
                                        '_pricing'
                                      )
                                }}>
                                    {intl.formatMessage({ id: 'membership.free' })}
                        </Button>
                </Grid>
            )}
            { hasPlan && (
                <Grid item xs={12} sx={{ mt: 1, pr: 2, pl: 1, pb: 2 }}>
                        <TextField  fullWidth
                                    variant="standard"
                                    placeholder={intl.formatMessage({ id: 'settings.custom_domain_placeholder' })}
                                    disabled={isLoading}
                                    onChange={(e) => setCustomDomain(e.target.value)}
                        ></TextField>
                        <Button fullWidth 
                                onClick={handleSubmitCustomDomain} 
                                disabled={isLoading}>
                                    {intl.formatMessage({ id: 'settings.custom_domain_submit_request' })}
                        </Button>
                </Grid>
            )}
        </Grid>
    )

    return customDomainBlock
}

export default CustomDomain;

