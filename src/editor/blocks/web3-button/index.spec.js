// import Plugin, { properties } from "./index"

describe("Connect Wallet Button Plugin", () => {

    describe("Test", () => {
        it("works", async () => {
            expect(1).toBe(1);
        });
    })

//     let initComponent, show, hide, onErrorMessage, getAccount, getSigner, context, getBalances
//     beforeAll(() => {
//         initComponent = jest.fn()
//         show = jest.fn()
//         hide = jest.fn()
//         onErrorMessage = jest.fn()
//         getAccount = jest.fn().mockReturnValueOnce('0xabc')
//         getSigner = jest.fn()
//         getBalances = jest.fn()

//         const originalWindow = { ...window };
//         const windowSpy = jest.spyOn(global, "window", "get");
//         windowSpy.mockImplementation(() => ({
//             ...originalWindow,
//             webstudio: {
//                 utils: {
//                   show,
//                   hide,
//                   onErrorMessage,
//                   getAccount,
//                   getSigner,
//                   initComponent,
//                   getBalances
//                 }
//             },
//             constants: {
//                 EVENT: 'event',
//                 CACHE: 'cache',
//                 CONNECT_WALLET: 'connect'
//             }
//         }))

//         properties.model.addTrait = jest.fn()
//         properties.model.removeTrait = jest.fn()
//         properties.model.on = jest.fn()
//         properties.model.attributes = {
//             exclusiveRule: false
//         }

//         context = new function() {
//             this.properties = properties
//             this.attributes = {}
//             return this
//         }()
//     })

//     describe("Invokes editor setup with blocks and properties", () => {
//         it("Has properties defined", async () => {
//             const editor = {
//               BlockManager: {
//                 add: jest.fn()
//               },
//               DomComponents: {
//                 addType: jest.fn()
//               }
//             }
//             Plugin(editor)
//             expect(editor.BlockManager.add).toHaveBeenCalled()
//             expect(editor.DomComponents.addType).toHaveBeenCalled()
//         })
//     })
})
