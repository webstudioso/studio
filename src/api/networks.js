import axios from 'axios'

export const loadSupportedNeworks = async () => {
    const result = await axios.get('https://chainid.network/chains.json')
    return result.data
}