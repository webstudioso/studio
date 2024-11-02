import { 
    pinFilesToIpfs,
} from 'api/ipfs'

import axios from 'axios'

jest.mock('axios')

describe('IPFS api', () => {

    const pinataJwt = 'abc'
    process.env.REACT_APP_PINATA_JWT = pinataJwt

    beforeAll(() => {
        axios.post.mockImplementation(() => Promise.resolve({ data: [] }))
    })

    afterEach(() => {
        axios.post.mockClear()
    })

    describe('pinFilesToIpfs', () => {

        it('Invokes a post call to upload ipfs', async () => {
            const blob = new Blob(['test'], {type: 'text/plain'})
            const file = new File([blob], 'test.name')
            await pinFilesToIpfs([file], 'name')
            expect(axios.post).toHaveBeenCalledWith(
                `https://api.pinata.cloud/pinning/pinFileToIPFS`,
                expect.anything(),
                { headers: {"Authorization": "Bearer abc", "Content-Type": "multipart/form-data"}}
            )
        })

    })
})