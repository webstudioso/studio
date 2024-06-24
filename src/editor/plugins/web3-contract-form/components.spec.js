import {
    form,
    typeForm,
    input,
    typeInput,
    // typeTextarea,
    // typeSelect,
    // typeCheckbox,
    // typeRadio,
    button,
    typeButton,
    label,
    typeLabel,
    loadComponents
  } from './components';


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
            Commands: {
                isActive: jest.fn()
            }
        }
        opts = {
            blocks: [typeForm, typeInput, typeButton, typeLabel],
            block: jest.fn()
        }
    });

    describe("blocks", () => {
        it("Adds form, input, label and button component types", async () => {
            loadComponents(editor);
            expect(editor.Components.addType).toHaveBeenCalledTimes(4);
        })

        // it("Checks if in Preview to disable evt behavior default", async () => {
        //     const cmp = components(editor);
        //     cmp.checkIfInPreview();
        //     expect(editor.Commands.isActive).toHaveBeenCalled();
        // })
        
        // describe("test", () => {
            // const b = blocks(editor, opts);
            // b.test();
        // })

        it("Has Form properties defined", async () => {
            const onSubmit = {
                preventDefault: jest.fn()
            }
            form.view.events.submit(onSubmit)
            expect(form).toBeTruthy()
            expect(form.isComponent({ tagName: 'FORM' })).toBeTruthy()
            expect(onSubmit.preventDefault).toHaveBeenCalled();
            expect(form.model).toBeTruthy()
        })

        it("Has Input properties defined", async () => {
            expect(input).toBeTruthy()
            expect(input.isComponent({ tagName: 'INPUT' })).toBeTruthy()
            expect(input.model).toBeTruthy()
        })

        it("Has Input property value defined with custom accessors", async () => {
            input.view.model = {
                get: jest.fn().mockReturnValue({value:'test123'})
            }
            input.view.el = { value: '' }
            input.view.listenTo = jest.fn()
            input.view.init()
            expect(input.view.listenTo).toHaveBeenCalled()
            input.view.handleValue()
            expect(input.view.model.get).toHaveBeenCalled()
        })

        it("Has Label properties defined", async () => {
            expect(label).toBeTruthy()
            expect(label.isComponent({ tagName: 'LABEL' })).toBeTruthy()
            expect(label.model).toBeTruthy()
        })

        it("Has Button properties defined with custom accessors", async () => {
            const componentContext = {
                length: 1,
                components: [{
                    is: jest.fn().mockReturnValue('textnode'),
                    get: jest.fn().mockReturnValue('Button')
                }],
                models: [{
                    is: jest.fn().mockReturnValue('textnode'),
                    get: jest.fn().mockReturnValue('Button')
                }]
            };
            button.model.components = jest.fn().mockReturnValue(componentContext);
            button.model.get = jest.fn().mockReturnValue('Button');
            button.model.set = jest.fn();
            button.model.on = jest.fn();
            button.model.set('test')
            button.model.get('test', 'val')
            button.model.__onTextChange()
            expect(button).toBeTruthy()
            expect(button.isComponent({ tagName: 'BUTTON' })).toBeTruthy()
            expect(button.model).toBeTruthy()
        })

        it("Has Button properties defined with context of previous component", async () => {
            const componentContext = {
                length: 1,
                components: [{
                    is: jest.fn().mockReturnValue('textnode'),
                    get: jest.fn().mockReturnValue('Button')
                }],
                models: [{
                    is: jest.fn().mockReturnValue('textnode'),
                    get: jest.fn().mockReturnValue('Button')
                }]
            };
            // button.model.init.bind(componentContext);
            button.model.components = jest.fn().mockReturnValue(componentContext);
            button.model.get = jest.fn().mockReturnValue('Button');
            button.model.set = jest.fn();
            button.model.init();
            expect(button.model.components).toHaveBeenCalled();
            expect(componentContext.models[0].is).toHaveBeenCalled();
            expect(componentContext.models[0].get).toHaveBeenCalled();
            expect(button).toBeTruthy()
            expect(button.isComponent({ tagName: 'BUTTON' })).toBeTruthy()
            expect(button.model).toBeTruthy()
        })

        it("Has Button properties defined without context of previous component", async () => {
            const componentContext = {
                length: 0,
                components: [],
                models: []
            };
            // button.model.init.bind(componentContext);
            button.model.components = jest.fn().mockReturnValue(componentContext);
            button.model.get = jest.fn().mockReturnValue('Button');
            button.model.set = jest.fn();
            button.model.on = jest.fn();
            button.model.init();
            button.model.get();
            expect(button.model.get).toHaveBeenCalled();
            expect(button).toBeTruthy()
            expect(button.isComponent({ tagName: 'BUTTON' })).toBeTruthy()
            expect(button.model).toBeTruthy()
        })
    })
})
