import { useState, useRef } from 'react'
import { Box, Grid, Paper, Button, Typography } from '@mui/material'
import { uploadPagesToIPFS } from 'api/publish'
import { LOADER } from 'store/actions'
import { useDispatch } from 'react-redux'
import constants from 'constant'
import { showError, showSuccess } from 'utils/snackbar'
import { useIntl } from 'react-intl'
const { EVENTS } = constants

const Media = ({ onLeave, editor }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [selected, setSelected] = useState()

    const handleMediaUpload = async (e) => {
        document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY));
        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
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
                const uploadedFilePath = upload[0].path;
                editor.AssetManager.add([uploadedFilePath])
                showSuccess({ dispatch, message: 'Media uploaded' })
            } catch(e) {
                showError({ dispatch, message: e.message })
            } finally {
                dispatch({ type: LOADER, show: false });
            }

        }
        reader.readAsDataURL(file)
    }

    const getSelectedImage = () => {
        const selected = editor.getSelected();
        return selected && selected.is('image') ? selected : null
    }

    return (
        <Grid container spacing={2} sx={{ 
                height: 'calc(100vh - 120px)', 
                overflow: 'auto', 
                background: '#f7f8f8', 
                border: '1px solid #dfe5eb',
                borderLeft: '0px',
                marginTop: '0px',
                p: 1,
                pl:3
            }}
            ref={ref}
        >
            <Box sx={{ position:'absolute', right:20, top: 18}}>
                <Button color="primary" variant="outlined" component="label">
                    { intl.formatMessage({id: 'image_manager.upload_media'})}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onClick={() => document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY)) }
                        onChange={handleMediaUpload}
                    />
                </Button>
            </Box>

            {editor.AssetManager.getAll().models.map((item, index) => (
                <Grid item xs={6} key={index} sx={{ cursor: getSelectedImage() ? 'pointer' : 'normal', position:'relative', padding:'0px !important'}} onMouseEnter={() => setSelected(item.id)}>
                    <Paper elevation={0} sx={{ p:1, background:'transparent' }} className={selected === item.id && getSelectedImage() ? "blurred" : ""}>
                        <img src={item.attributes.src} width="100%" height="auto" alt={item.id} />
                        <Typography fontSize={12} color="#333" fontWeight="light">{item.attributes.src.split('/').pop()}</Typography>
                    </Paper>

                    {selected === item.id && getSelectedImage() && (
                    <Box sx={{
                            width: '102%',
                            height: '102%',
                            background: `rgba(255,255,255,0.85)`,
                            position: 'absolute',
                            top: '-1%',
                            left: '-1%',
                            zIndex: 1000
                        }}
                        className="overlay"
                        >
                            <Button elevation={0} 
                                    onClick={async () => {
                                        const selectedImage = getSelectedImage()
                                        if (selectedImage) {
                                            selectedImage.setAttributes({ src: item.attributes.src })
                                            editor.store()
                                            editor.AssetManager.close()
                                            onLeave()
                                        }
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: '35%',
                                        left: '25%',
                                        width: '50%'
                                    }}
                                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-5 py-3 text-center mr-2 mb-2"
                            >
                                { intl.formatMessage({ id: 'image_manager.pick' })}
                            </Button>
                    </Box>)}

                </Grid>
            ))}
        </Grid>
    )
}

export default Media
