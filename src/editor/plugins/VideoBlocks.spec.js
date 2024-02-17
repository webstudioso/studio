import Plugin from './VideoBlocks'

describe("Video Block", () => {

    let editor;

    beforeAll(() => {
       editor = {
            BlockManager: {
                add: jest.fn(),
            },
            DomComponents: {
                addType: jest.fn()
            }
        }
    });

    describe("Plugin", () => {
        it("Calls add to add list component", async () => {
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(3)
            expect(editor.DomComponents.addType).toHaveBeenCalledTimes(1)
        });
    })
})
