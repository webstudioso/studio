import Plugin from './FileTrait'

describe("File Trait", () => {

    let editor;

    beforeAll(() => {
       editor = {
            TraitManager: {
                addType: jest.fn(),
            }
        }
    });

    describe("Plugin", () => {
        it("Calls addType to add drag and drop container", async () => {
            Plugin(editor)
            expect(editor.TraitManager.addType).toHaveBeenCalled()
        });
    })
})
