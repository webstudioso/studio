import { 
    publishTemplate,
    getMyTemplates,
    getTemplateById,
    getTemplates
} from 'api/template';
import axios from 'axios'

jest.mock('axios')

describe('Templates api', () => {

    const webstudioUrl = 'https://api.webstudio.com'
    const principal = '123abc'
    const author = 'me'
    const id = 'template_id'

    process.env.REACT_APP_WEBSTUDIO_API_URL = webstudioUrl

    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({ data: [] }))
        axios.post.mockImplementation(() => Promise.resolve({ data: [] }))
    })

    afterEach(() => {
        axios.get.mockClear()
    })

    describe('getTemplates', () => {

        it('Invokes a get call with principal to obtain list of templates', async () => {
            const templates = await getTemplates({ principal })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/template?private=false&status=published`,
            {
                cache: true,
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(templates).toEqual([])
        })

    })

    describe('getMyTemplates', () => {

        it('Invokes a get call with principal to obtain list of templates by author', async () => {
            const templates = await getMyTemplates({ principal, author })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/template?author=${author}`,
            {
                cache: true,
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(templates).toEqual([])
        })

    })

    describe('getTemplateById', () => {

        it('Invokes a get call with principal to obtain template by id', async () => {
            const template = await getTemplateById({ id, principal })
            expect(axios.get).toHaveBeenCalledWith(`${webstudioUrl}/template/${id}`,
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
            expect(template).toEqual([])
        })

    })

    describe('publishTemplate', () => {

        it('Invokes a post call with template content', async () => {
            const content = {
                id, 
                preview: 'url', 
                name: 'test', 
                description: 'descrption', 
                tags: [ 'list' ], 
                documentation: 'url docs', 
                demo: 'url demo', 
                isPrivate: false, 
                content: 'abc', 
                principal
            }
            await publishTemplate({ ...content })
            expect(axios.post).toHaveBeenCalledWith(`${webstudioUrl}/template/${id}`,
            {
                preview: content.preview, 
                name: content.name, 
                description: content.description, 
                tags: content.tags, 
                documentation: content.documentation, 
                demo: content.demo, 
                isPrivate: content.isPrivate, 
                content: content.content, 
            },
            {
                headers: {
                  Accept: 'application/json',
                  AuthorizeToken: 'Bearer 123abc',
                  'Content-Type': 'application/json'
                }
            })
        })

    })
})