import Plugin from './FaqBlock'

describe("Faq Block", () => {

    let editor;

    beforeAll(() => {
       editor = {
            BlockManager: {
                add: jest.fn(),
            }
        }
    });

    describe("Plugin", () => {
        it("Calls add to add static and dynamic component", async () => {
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(2)
        });
    })
})
