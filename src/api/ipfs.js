import axios from 'axios'
import FormData from 'form-data'
import constants from 'constant'
const { IPFS_PROVIDER } = constants

/**
 * Upload a folder of files to Pinata API
 * @param {*} files Array of File objects
 */
export const pinFilesToIpfs = async (files, projectName='webstudio') => {

    // Prepare form
    const data = new FormData()

    try {
        Array.from(files).forEach((file) => data?.append("file", file, `${projectName}/${file.name}`))
        
        // Set display name for pinata file manager
        const pinataMetadata = JSON.stringify({ name: projectName })
        data.append("pinataMetadata", pinataMetadata)
    } catch (e) {

    }

    // Upload to pinata
    const upload = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS',
    data,
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
                "Content-Type": 'multipart/form-data',
            }
        }
    )
    const cid = upload?.data?.IpfsHash
    return {
        cid,
        url: `${IPFS_PROVIDER}/${cid}/${files[0].name}`
    }
}