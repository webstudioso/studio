import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Typography } from '@mui/material'
import { uploadPagesToIPFS } from 'api/publish'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import { showError, showSuccess } from 'utils/snackbar'
import { publishTemplate } from 'api/template'

const containerStyle = { 
    mb:1, 
    p: 1, 
    background: '#fdfdfd', 
    border:'1px solid #f3f3f3' 
}

const SaveTemplateModal = ({ open, onClose, project, principal, editor }) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const account = useSelector((state) => state.account)
    const [imageUrl, setImageUrl] = useState("https://i.ibb.co/619tC6J/imageonline-co-placeholder-image.jpg")
    const [identifier] = useState(`${account.user.issuer}-${project?.subdomain}-${Math.random().toString(36).slice(2, 7)}`)
    const [name, setName] = useState(project?.name)
    const [description, setDescription] = useState(project?.metadata['og:description'])
    const [tags, setTags] = useState()

    const handlePublishTemplate = async () => {
        try {
            dispatch({ type: LOADER, show: true })
            await publishTemplate({
                id: identifier,
                preview: imageUrl,
                name,
                description,
                tags: tags?.split(',') || [],
                content: JSON.stringify(editor.getProjectData()),
                principal
            })
            showSuccess({ dispatch, message:  intl.formatMessage({id: 'template_page.publish_success'})  })
        } catch (e) {
            console.log(e)
            showError({ dispatch, message: e })
        } finally {
            dispatch({ type: LOADER, show: false })
            onClose()
        }
    }

    const handleMediaUpload = async (e) => {
        dispatch({ type: LOADER, show: true })
        const file = e.target.files[0]

        // Encode the file using the FileReader API
        const reader = new FileReader()
        reader.onloadend = async () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '')
                const pages = [{
                    path: file.name,
                    content: base64String
                }]
            try {
                const upload = await uploadPagesToIPFS({pages})
                const uploadedFilePath = upload[0].path
                setImageUrl(uploadedFilePath)
                showSuccess({ dispatch, message:  intl.formatMessage({id: 'image_manager.media_uploaded'})  })
            } catch(e) {
                showError({ dispatch, message: e.message })
            } finally {
                dispatch({ type: LOADER, show: false });
            }

        }
        reader.readAsDataURL(file)
    }

	return (
        <Dialog
            open={open}
            keepmounted="true"
            onClose={() => console.log("Close")}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ px: 8, pt:5 }}>
                <FormattedMessage id="publish.save_template" />
            </DialogTitle>
            <DialogContent sx={{ px: 8 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormattedMessage id="publish.is_live_description" />
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                        <img src={imageUrl} alt="Placeholder"/>
                        <Button color="primary" variant="outlined" component="label" size="small" fullWidth sx={{ marginTop: 1 }}>
                            { intl.formatMessage({id: 'image_manager.upload_media'})}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleMediaUpload}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={containerStyle}>
                                <Typography color="#555" fontSize={12}>
                                    {intl.formatMessage({ id : 'template_page.name' }) }
                                </Typography>
                                <TextField variant="standard" fullWidth placeholder={intl.formatMessage({id:'template_page.name_placeholder'})} defaultValue={name} onChange={(e) => { setName(e.target.value)}} />
                            </Grid>
                            <Grid item xs={12} sx={containerStyle}>
                                <Typography color="#555" fontSize={12}>
                                    {intl.formatMessage({ id : 'template_page.description' }) }
                                </Typography>
                                <TextField variant="standard" multiline rows={3} fullWidth placeholder={intl.formatMessage({id:'template_page.description_placeholder'})} defaultValue={description}  onChange={(e) => { setDescription(e.target.value)}} />
                            </Grid>
                            <Grid item xs={12} sx={containerStyle}>
                                <Typography color="#555" fontSize={12}>
                                    {intl.formatMessage({ id : 'template_page.tags' }) }
                                </Typography>
                                <TextField variant="standard" fullWidth placeholder={intl.formatMessage({id:'template_page.tags_placeholder'})} defaultValue={tags} onChange={(e) => { setTags(e.target.value)}} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 8, pb: 5 }}>
                <Button onClick={onClose}>{intl.formatMessage({id:'cancel'})}</Button>
                <Button onClick={handlePublishTemplate} variant="outlined">{intl.formatMessage({id:'publish'})}</Button>
            </DialogActions>
        </Dialog>
	)
}

export default SaveTemplateModal
