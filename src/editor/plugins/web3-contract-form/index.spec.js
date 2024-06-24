import Plugin from "./index"
import {
    typeForm,
    typeInput,
    // typeTextarea,
    // typeSelect,
    // typeCheckbox,
    // typeRadio,
    typeButton,
    typeLabel,
    loadComponents
  } from './components';


describe("Form plugin", () => {

    let editor, opts;
    beforeAll(() => {
        editor = {
            BlockManager: {
                add: jest.fn()
            },
            Components: {
                addType: jest.fn()
            },
            TraitManager: {
                addType: jest.fn()
            }
        }
        opts = {
            blocks: [typeForm, typeInput, typeButton, typeLabel],
            block: jest.fn()
        }
    });

    describe("traits", () => {
        it("Adds form, input, label and button trait types", async () => {
            Plugin(editor);
            // expect(editor.TraitManager.addType).toHaveBeenCalledTimes(1);
        })
    })
})
