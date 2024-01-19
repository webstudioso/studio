import { useState, useRef } from 'react'
import { Box, Grid, Paper, Button, Typography, Tooltip, TextField, InputAdornment, IconButton } from '@mui/material'
import { uploadFilesToIPFS } from 'api/publish'
import { LOADER } from 'store/actions'
import { useDispatch } from 'react-redux'
import constants from 'constant'
import { showError, showSuccess } from 'utils/snackbar'
import { useIntl } from 'react-intl'
import { AddCircle } from '@mui/icons-material'
import { fileToBase64 } from 'utils/file'
const { EVENTS } = constants

const Media = ({ onLeave, editor }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const ref = useRef(null)
    const [selected, setSelected] = useState()
    const [assetUrl, setAssetUrl] = useState()

    const handleMediaUpload = async (e) => {
        document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY));
        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];
        const content = await fileToBase64(file)
        const pages = [{
            path: file.name,
            content
        }]
        try {
            const upload = await uploadFilesToIPFS({pages})
            const uploadedFilePath = upload[0].path;
            editor.AssetManager.add([uploadedFilePath])
            showSuccess({ dispatch, message:  intl.formatMessage({id: 'image_manager.media_uploaded'})  })
        } catch(e) {
            showError({ dispatch, message: e.message })
        } finally {
            dispatch({ type: LOADER, show: false })
        }
    }

    const uploadButton = (
        <Box sx={{ position:'absolute', right:20, top: 15}}>
            <Button color="primary" variant="outlined" component="label" size="small">
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
    )

    const handleImageUrlAdd = async () => {
        try {
            dispatch({ type: LOADER, show: true })
            editor.AssetManager.add([assetUrl])
            showSuccess({ dispatch, message: intl.formatMessage({id: 'image_manager.media_uploaded'}) })
        } catch(e) {
            showError({ dispatch, message: e.message })
        } finally {
            dispatch({ type: LOADER, show: false })
        }
    }

    return (
        <Box sx={{ 
            height: 'calc(100vh - 120px)',
            background: '#f7f8f8', 
            overflow: 'auto',
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 1
        }}>

            {uploadButton}

            <Box sx={{ my: 2, px: 1 }}>
                <TextField  size="small" 
                            type="url"
                            fullWidth 
                            variant="outlined" 
                            placeholder={ intl.formatMessage({id: 'image_manager.paste_url' })} 
                            label={ intl.formatMessage({id: 'image_manager.paste_url' })} 
                            defaultValue={assetUrl}
                            onChange={(e) => setAssetUrl(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton color="primary" onClick={handleImageUrlAdd}>
                                      <AddCircle />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                >
                </TextField>
            </Box>

            <Typography>{ intl.formatMessage({id: 'image_manager.uploaded_assets' })}</Typography>
            <Grid container spacing={2} ref={ref} sx={{ pl: 2, pt: 2 }}>
                {editor.AssetManager.getAll().models.map((item, index) => (
                    <Grid item xs={4} key={index} sx={{ cursor: selected ? 'pointer' : 'normal', position:'relative', padding:'0px !important' }} onMouseEnter={() => setSelected(item.id)}>
                        <Paper elevation={0} sx={{ p:1, background:'transparent' }} className={selected === item.id ? "blurred" : ""}>
                            <Tooltip title={item.attributes.src.split('/').pop()}>
                                <img src={item.attributes.src} width="100%" alt={item.id} />
                            </Tooltip>
                        </Paper>

                        {selected === item.id && (
                            
                        <Tooltip title={item.attributes.src.split('/').pop()}>
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
                                                const component = editor.getSelected()
                                                if (component.is('image')) {
                                                    component.set("src", item.attributes.src)
                                                } else {
                                                    component.setStyle({ 
                                                        'background-image': `url("${item.attributes.src}")`,
                                                        'background-size': 'cover',
                                                        'background-repeat': 'no-repeat',
                                                        'background-position': 'center'
                                                    });
                                                }
                                                editor.store()
                                                editor.AssetManager.close()
                                                onLeave()
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
                            </Box>
                        </Tooltip>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Media
