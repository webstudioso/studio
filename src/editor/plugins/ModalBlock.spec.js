import { script, properties, id } from "./ModalBlock"

describe("Modal Plugin", () => {

    let spyAdd, spyFind, spyButton, buttonMock

    beforeEach(() => {
        spyFind = jest.spyOn(document, 'getElementById')
        spyAdd = jest.spyOn(document, 'addEventListener')
        spyButton = jest.spyOn(buttonMock, 'addEventListener')
    })

    beforeAll(() => {
        buttonMock = document.createElement("button")
        buttonMock.setAttribute("id", "wsm-modal-cta")
        document.body.appendChild(buttonMock)
    })

    describe("Properties", () => {

        it("Has an identifier", () => {
            expect(id).toEqual('wsm-modal')
        })

        it("Only applies to tagname section", () => {
            expect(properties.isComponent({ id })).toBeTruthy()
            expect(properties.isComponent({ id: 'other' })).not.toBeTruthy()
        })
    })

    describe("Script", () => {

        it("Calls init to get the components and add the listener to show modal", () => {
            const fn = new script()
            expect(spyFind).toHaveBeenCalledTimes(5)
            expect(spyAdd).toHaveBeenCalledWith('onToast', fn.showModal)
        })
    
    })
})
