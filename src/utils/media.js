import { showSuccess, showError } from './snackbar'
import { LOADER } from 'store/actions'
import constants from '../constant'
import { pinFilesToIpfs } from 'api/ipfs'

const { EVENTS } = constants

export const handleMediaUpload = async (file, dispatch, editor, intl, onUpload) => {
    document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY))
    dispatch({ type: LOADER, show: true })

    try {
        const upload = await pinFilesToIpfs([file])
        editor.AssetManager.add([upload.url])
        onUpload(upload.url)
        showSuccess({ dispatch, message:  intl.formatMessage({id: 'image_manager.media_uploaded'})  })
    } catch(e) {
        showError({ dispatch, message: e.message })
    } finally {
        dispatch({ type: LOADER, show: false });
    }
}
