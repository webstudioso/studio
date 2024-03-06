import renderer from 'react-test-renderer'
import Editor from './index'

describe('Editor', () => {

    const onClickHome = jest.fn()
    const project = {
        id: 'demo'
    }
    const principal = 'abc'

    beforeAll(() => {
    })

    it('renders canvas', () => {
        const component = renderer.create(
            <Editor project={project}
                    onClickHome={onClickHome} 
                    principal={principal} 
            />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})