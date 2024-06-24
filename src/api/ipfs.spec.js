import { 
    uploadFilesToIpfs,
} from 'api/ipfs'

import axios from 'axios'

jest.mock('axios')

describe('IPFS api', () => {

    const moralisKey = 'abc'
    process.env.REACT_APP_MORALIS_API_KEY = moralisKey

    beforeAll(() => {
        axios.post.mockImplementation(() => Promise.resolve({ data: [] }))
    })

    afterEach(() => {
        axios.post.mockClear()
    })

    describe('uploadFilesToIpfs', () => {

        it('Invokes a post call to upload ipfs', async () => {
            const list = [
                {
                    id: 1,
                    url: 'test'
                }
            ]
            const uris = await uploadFilesToIpfs(list)
            expect(axios.post).toHaveBeenCalledWith(`https://deep-index.moralis.io/api/v2/ipfs/uploadFolder`,
            list,
            {
                headers: {
                    'X-API-KEY': moralisKey,
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            expect(uris).toEqual([])
        })

    })
})