import { 
    uploadPagesToIPFS,
    publishRouting,
    publishMetadata,
    getRoute
} from 'api/route';
import axios from 'axios'

jest.mock('axios')

describe('Route api', () => {

    const webstudioUrl = 'https://api.webstudio.com'
    const principal = '123abc'
    const cid = 'ipfs_url'
    const id = 'subdomain'
    const moralisKey = 'abc'
    const metadata = {
        a: 1,
        b: 2
    }

    process.env.REACT_APP_WEBSTUDIO_API_URL = webstudioUrl
    process.env.REACT_APP_MORALIS_API_KEY = moralisKey

    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({ data: [] }))
        axios.post.mockImplementation(() => Promise.resolve({ data: [] }))
    })

    afterEach(() => {
        axios.get.mockClear()
        axios.post.mockClear()
    })

    describe('getRoute', () => {

        it('Invokes a get call with principal to obtain list of templates', async () => {
            const route = await getRoute({ id, principal })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/route/${id}`,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(route).toEqual([])
        })

    })

    describe('publishMetadata', () => {

        it('Invokes a post call with project metadata', async () => {
            const meta = await publishMetadata({ id, principal, metadata })
            expect(axios.post).toHaveBeenCalledWith(`${webstudioUrl}/project/${id}/metadata`,
            metadata,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(meta).toEqual([])
        })

    })

    describe('publishRouting', () => {

        it('Invokes a post call with route', async () => {
            const route = await publishRouting({ id, principal, cid })
            expect(axios.post).toHaveBeenCalledWith(`${webstudioUrl}/route/${id}`,
            {
                id,
                cid
            },
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(route).toEqual([])
        })

    })

    describe('uploadPagesToIPFS', () => {

        it('Invokes a post call to upload ipfs', async () => {
            const pages = [
                {
                    id: 1,
                    url: 'test'
                }
            ]
            const uris = await uploadPagesToIPFS({ pages })
            expect(axios.post).toHaveBeenCalledWith(`https://deep-index.moralis.io/api/v2/ipfs/uploadFolder`,
            pages,
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