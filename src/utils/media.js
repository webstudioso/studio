import { showSuccess, showError } from "./snackbar";
import { uploadFilesToIPFS } from "api/publish";
import { LOADER } from 'store/actions'
import constants from '../constant';

const { EVENTS } = constants

export const handleMediaUpload = async (file, dispatch, editor, intl, onUpload) => {
    document.dispatchEvent(new CustomEvent(EVENTS.CLOSE_DELAY));
    dispatch({ type: LOADER, show: true });

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
            const upload = await uploadFilesToIPFS({pages})
            const uploadedFilePath = upload[0].path;
            editor.AssetManager.add([uploadedFilePath])
            onUpload(uploadedFilePath)
            showSuccess({ dispatch, message:  intl.formatMessage({id: 'image_manager.media_uploaded'})  })
        } catch(e) {
            showError({ dispatch, message: e.message })
        } finally {
            dispatch({ type: LOADER, show: false });
        }

    }
    reader.readAsDataURL(file)
}
