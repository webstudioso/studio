import { parseNetworks } from 'utils/networks'
import axios from 'axios'
import sortBy from 'lodash/sortBy'

export const loadSupportedNeworks = async () => {
    const result = await axios.get('https://chainid.network/chains.json', { cache: true })
    const list  = result.data || []
    const sortedList = sortBy(list, 'name')
    return parseNetworks(sortedList) 
}
