import {
    publishRouting,
    getRoute,
    deleteRoute
} from 'api/route';
import axios from 'axios'

jest.mock('axios')

describe('Route api', () => {

    const webstudioUrl = 'https://api.webstudio.com'
    const principal = '123abc'
    const cid = 'ipfs_url'
    const id = 'subdomain'

    process.env.REACT_APP_WEBSTUDIO_API_URL = webstudioUrl

    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({ data: [] }))
        axios.post.mockImplementation(() => Promise.resolve({ data: [] }))
        axios.delete.mockImplementation(() => Promise.resolve({ data: [] }))
    })

    afterEach(() => {
        axios.get.mockClear()
        axios.post.mockClear()
        axios.delete.mockClear()
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

    describe('deleteRoute', () => {

        it('Invokes a delete call with principal to remove route', async () => {
            const route = await deleteRoute({ id, principal })
            expect(axios.delete).toHaveBeenCalledWith(`${webstudioUrl}/route/${id}`,
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
})