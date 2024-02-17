import { 
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    publishMetadata
} from 'api/project';
import axios from 'axios'

jest.mock('axios')

describe('Project api', () => {

    const webstudioUrl = 'https://api.webstudio.com'
    const principal = '123abc'
    const id = 'subdomain'
    const moralisKey = 'abc'
    const appData = {
        subdomain: 'abc'
    }
    const metadata = {
        a: 1,
        b: 2
    }

    process.env.REACT_APP_WEBSTUDIO_API_URL = webstudioUrl
    process.env.REACT_APP_MORALIS_API_KEY = moralisKey

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

    describe('getAllProjects', () => {

        it('Invokes a get call with principal to obtain list of templates', async () => {
            const proj = await getAllProjects({ principal })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/project`,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(proj).toEqual([])
        })

    })

    describe('getProjectById', () => {

        it('Invokes a get call with principal to obtain list of templates', async () => {
            const proj = await getProjectById({ id, principal })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/project/${id}`,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(proj).toEqual([])
        })

    })

    describe('createProject', () => {

        it('Invokes a post call with project data', async () => {
            const proj = await createProject({ principal, appData })
            expect(axios.post).toHaveBeenCalledWith(`${webstudioUrl}/project/${appData.subdomain}`,
            appData,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(proj).toEqual([])
        })

    })

    describe('deleteProject', () => {

        it('Invokes a delete call with project id', async () => {
            const proj = await deleteProject({ principal, id })
            expect(axios.delete).toHaveBeenCalledWith(`${webstudioUrl}/project/${id}`,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(proj).toEqual([])
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
})