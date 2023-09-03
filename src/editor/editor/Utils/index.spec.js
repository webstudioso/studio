import { enableContextMenu, handleRightClickContextMenu } from '.'

describe('Editor Utils', () => {

    test('handleRightClickContextMenu', () => {
        const e = {
            preventDefault: jest.fn()
        }
        const editor = {
            select: jest.fn(),
            runCommand: jest.fn()
        }
        handleRightClickContextMenu(e, editor)
        expect(e.preventDefault).toHaveBeenCalled()
        expect(editor.select).toHaveBeenCalled()
        expect(editor.runCommand).toHaveBeenCalled()
    })

    test('enableContextMenu', () => {
        const editor = {
            DomComponents: {
                addType: jest.fn()
            }
        }
        enableContextMenu(editor)
        expect(editor.DomComponents.addType).toHaveBeenCalled()
    })
})
