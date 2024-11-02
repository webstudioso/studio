import { useState } from 'react'
import { Box, Grid, Paper, Button, Typography, Tooltip, TextField, InputAdornment, IconButton, Stack } from '@mui/material'
import { LOADER } from 'store/actions'
import { useDispatch } from 'react-redux'
import constants from 'constant'
import { showError, showSuccess } from 'utils/snackbar'
import { useIntl } from 'react-intl'
import { AddCircle, Clear } from '@mui/icons-material'
import { IconEye } from '@tabler/icons'
import { pinFilesToIpfs } from 'api/ipfs'
const { EVENTS } = constants

const Media = ({ onLeave, editor, project }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const [assetUrl, setAssetUrl] = useState()

    const handleMediaUpload = async (e) => {
        document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY));
        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];
        try {
            const upload = await pinFilesToIpfs([file], project.subdomain)
            editor.AssetManager.add([upload.url])
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

    const handleImageUrlRemove = async (asset) => {
        try {
            dispatch({ type: LOADER, show: true })
            editor.AssetManager.remove(asset)
            editor.store()
            showSuccess({ dispatch, message: intl.formatMessage({id: 'image_manager.media_removed'}) })
        } catch(e) {
            showError({ dispatch, message: e.message })
        } finally {
            dispatch({ type: LOADER, show: false })
        }
    }

    const imageUrlField = (
        <Grid item xs={12}>
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
        </Grid>
    )

    const assetLabel = (
        <Grid item xs={12}>
            <Typography>{ intl.formatMessage({id: 'image_manager.uploaded_assets' })}</Typography>
        </Grid>
    )

    return (        
        <Grid container spacing={2} sx={{ 
            height: 'calc(100vh - 120px)', 
            overflow: 'auto', 
            background: '#f7f8f8', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 2,
            pt: 0
        }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>

                {uploadButton}

                <Grid container sx={{ p: 2 }} spacing={1} width="600px">
                    {imageUrlField}
                    {assetLabel}
                    {editor.AssetManager.getAll().models.map((item, index) => (
                        <Grid item xs={3} key={index} sx={{ cursor: selected ? 'pointer' : 'normal', position:'relative', padding:'0px !important' }} onMouseEnter={() => setSelected(item.id)}>
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
                                            <Stack direction="horizontal" sx={{
                                                        position: 'absolute',
                                                        top: '5%',
                                                        left: '5%',
                                                        width: '90%'
                                                    }}>
                                                    <IconButton 
                                                            size="small"
                                                            onClick={() => window.open(item.attributes.src, '__img')}
                                                    >
                                                        <IconEye />
                                                    </IconButton>
                                                    <Box flex={1} />
                                                    <IconButton 
                                                            size="small"
                                                            onClick={() => handleImageUrlRemove(item)}
                                                    >
                                                        <Clear />
                                                    </IconButton>
                                            </Stack>

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
                                                    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-3 py-2 text-center mr-2 mb-2"
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
        </Grid>
    )
}

export default Media
