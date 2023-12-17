import { loadTraits } from "../traits"
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


describe("Form components", () => {

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
            loadTraits(editor);
            // expect(editor.TraitManager.addType).toHaveBeenCalledTimes(1);
        })
    })
})
