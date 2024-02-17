import axios from 'axios'

export const uploadFilesToIpfs = async (files) => {
    const upload = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    files,
        {
            headers: {
                "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    )
    return upload?.data
}
