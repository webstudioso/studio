import axios from 'axios'
import sortBy from 'lodash/sortBy'

export const loadSupportedNeworks = async () => {
    const result = await axios.get('https://chainid.network/chains.json')
    const list  = result.data || []
    return sortBy(list, 'name')
}