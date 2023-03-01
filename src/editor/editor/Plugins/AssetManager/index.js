import axios from 'axios';

export const parseAssetList = (upload) => {
    return upload?.data?.map((file) => file.path) || [];
}

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export const uploadFiles = async (files) => {
    const upload = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
        files,
        {
        headers: {
            "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    });
    return parseAssetList(upload);
}

export const formatFileArrayBase64 = (fileArray, fileContentArray) => {
    return fileArray.map((file, index) => {
        return {
            path: file.name,
            content: fileContentArray[index]
        }
    });
}

export const uploadFile = async (e) => {
    try {
        document.dispatchEvent(new CustomEvent('assetUploadStart'));  
        const editor = window.editor;
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        const fileArray = Array.from(files);
        const fileContentArray = await Promise.all(fileArray.map((file) => getBase64(file)));
        const uploadContentArray = formatFileArrayBase64(fileArray, fileContentArray);
        const uploadedFiles = await uploadFiles(uploadContentArray);
        editor.AssetManager.add(uploadedFiles);
        document.dispatchEvent(new CustomEvent('assetUploadEnd'));  
    } catch (e) {
        document.dispatchEvent(new CustomEvent('assetUploadError'));  
    }
}

export const AssetManager = { uploadFile }