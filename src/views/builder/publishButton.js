import { Fragment } from "react"
import { Button, Typography, CircularProgress } from "@mui/material"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getProjectById } from "api/project"
import { uploadPagesToIPFS, publishRouting } from "api/publish"
import { useDispatch, useSelector } from "react-redux"
import { showLoader } from "utils/loader"
import { getCidFromDeployment, getCustomFontsMetadatTags, getPages, getUserConfiguredMetadataTags, getWebstudioUrl } from "utils/publish"
import { showSuccess, showError } from "utils/snackbar"
import { getProjectUrl } from "utils/project";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltipArrow}`]: {
        backgroundColor: '#fff'
      },
      [`& .${tooltipClasses.arrow}`]: {
        "&:before": {
          border: `1px solid #dadde9`
        },
        color: '#fff'
      },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: '#333',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
      padding: '15px'
    },
  }));

const PublishButton = ({ principal, projectId }) => {
    const isLoading = useSelector((state) => state.loader.show);
    const dispatch = useDispatch()

    const handlePublish = async () => {
        try {
            showLoader({ dispatch, show: true })

            const project = await getProjectById({ projectId, principal })
            const tags = getUserConfiguredMetadataTags({ project })
            const fonts = getCustomFontsMetadatTags()
            const pages = getPages({ tags, fonts })
            const upload = await uploadPagesToIPFS({ pages })
            const cid = getCidFromDeployment({ upload })

            // Register in AWS deploy defult subdomain
            const defaultSubdomain = getWebstudioUrl({ projectId });
            await publishRouting({id: defaultSubdomain, cid, principal });
    
            // Register in AWS deploy if custom domain
            const defaultDomain = project?.domain;
            if (defaultDomain) {
                await publishRouting({id: defaultDomain, cid, principal });
            }

            showSuccess({ dispatch, message: 'Published' })
          } catch (error) {
            showError({ dispatch, error })
        } finally {
            showLoader({ dispatch, show: false })
        }
    }

    const publishTooltip = (
        <Fragment>
            <Typography fontWeight="bold" color="inherit">Publish</Typography>
            <Typography variant="body" sx={{ mt: '15px' }}>
                Click Publish to go live with your latest changes.
            </Typography>
            <Button href={getProjectUrl()} target="__blank">View site</Button>
        </Fragment>
    )

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

	return (
        <HtmlTooltip title={publishTooltip}>
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
            >
                <Typography fontWeight="bold">
                    Publish
                </Typography>
                { spinner }
            </Button>
        </HtmlTooltip>
	);
};

export default PublishButton
