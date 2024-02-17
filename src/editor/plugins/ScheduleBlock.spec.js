import Plugin from './ScheduleBlocks'

describe("Schedule Block", () => {

    let editor;

    beforeAll(() => {
       editor = {
            BlockManager: {
                add: jest.fn(),
            }
        }
    });

    describe("Plugin", () => {
        it("Calls add to add listed component", async () => {
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(2)
        });
    })
})
