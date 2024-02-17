import Plugin from './ImagesBlocks'

describe("Images Block", () => {

    let editor;

    beforeAll(() => {
       editor = {
            BlockManager: {
                add: jest.fn(),
            }
        }
    });

    describe("Plugin", () => {
        it("Calls add to add list component", async () => {
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(5)
        });
    })
})
