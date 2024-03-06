import Plugin, { id, properties } from './TimerBlocks'

describe("Timer Blocks", () => {

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
    })

    describe("Plugin", () => {
        it("Calls add to add listed component", async () => {
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(1)
            expect(editor.DomComponents.addType).toHaveBeenCalledTimes(1)
        })
    })

    describe("Properties", () => {

        it("Has an identifier", () => {
            expect(id).toEqual('timer')
        })

        it("Only applies to id section", () => {
            expect(properties.isComponent({ id })).toBeTruthy()
            expect(properties.isComponent({ id: 'other' })).not.toBeTruthy()
        })
    })

})
