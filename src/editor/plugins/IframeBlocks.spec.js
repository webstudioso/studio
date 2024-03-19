import Plugin from './IframeBlocks'

describe("Iframe Block", () => {

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
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(1)
            expect(editor.DomComponents.addType).toHaveBeenCalledTimes(1)
        });
    })
})
