import { loadBlocks } from "../blocks"
import {
    typeForm,
    typeInput,
    // typeTextarea,
    // typeSelect,
    // typeCheckbox,
    // typeRadio,
    typeButton,
    typeLabel,
  } from '../components';


describe("Form blocks", () => {

    let editor, opts;
    beforeAll(() => {
        editor = {
            BlockManager: {
                add: jest.fn()
            }
        }
        opts = {
            blocks: [typeForm, typeInput, typeButton, typeLabel],
            block: jest.fn()
        }
    });

    describe("blocks", () => {
        it("Adds form, input, label and button blocks", async () => {
            loadBlocks(editor, opts);
            expect(editor.BlockManager.add).toHaveBeenCalledTimes(3);
        })
    })
})
