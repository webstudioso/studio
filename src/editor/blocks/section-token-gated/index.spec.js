import Plugin, { script, properties } from "./index"
import { ethers } from 'ethers'

describe("Section Token Gated Plugin", () => {

    let initComponent, show, hide, onErrorMessage, getAccount, getSigner, context, getBalances
    beforeAll(() => {
        initComponent = jest.fn()
        show = jest.fn()
        hide = jest.fn()
        onErrorMessage = jest.fn()
        getAccount = jest.fn().mockReturnValueOnce('0xabc')
        getSigner = jest.fn()
        getBalances = jest.fn()

        const originalWindow = { ...window };
        const windowSpy = jest.spyOn(global, "window", "get");
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            webstudio: {
                utils: {
                  show,
                  hide,
                  onErrorMessage,
                  getAccount,
                  getSigner,
                  initComponent,
                  getBalances
                }
            }
        }))

        properties.model.addTrait = jest.fn()
        properties.model.removeTrait = jest.fn()
        properties.model.on = jest.fn()
        properties.model.attributes = {
            exclusiveRule: false
        }

        context = new function() {
            this.properties = properties
            this.attributes = {}
            return this
        }()
    })

    describe("Invokes editor setup with blocks and properties", () => {
        it("Has properties not defined when non premium member", async () => {
            const editor = {
              BlockManager: {
                add: jest.fn()
              },
              DomComponents: {
                addType: jest.fn()
              }
            }
            Plugin(editor)
            expect(editor.BlockManager.add).toHaveBeenCalled()
            // By default being a premium feature, shoul not be added properties to configure it
            expect(editor.DomComponents.addType).not.toHaveBeenCalled()
        })

        it("Has properties defined when premium member", async () => {
            const editor = {
              BlockManager: {
                add: jest.fn()
              },
              DomComponents: {
                addType: jest.fn()
              }
            }
            Plugin(editor, { isPremiumMember: true })
            expect(editor.BlockManager.add).toHaveBeenCalled()
            // By default being a premium feature, shoul not be added properties to configure it
            expect(editor.DomComponents.addType).toHaveBeenCalled()
        })
    })

    describe("Properties", () => {
        it("Only applies to tagname section", () => {
            expect(properties.isComponent({ tagName: 'SECTION' })).toBeTruthy()
            expect(properties.isComponent({ tagName: 'ELSE' })).not.toBeTruthy()
        })

        it("On init adds property listener and invokes rule change", () => {
            properties.model.init()
            expect(properties.model.on).toHaveBeenCalled()
        })

        it("hasExclusiveRule is false if trait is unchecked", () => {
            expect(context.properties.model.hasExclusiveRule()).not.toBeTruthy()
        })

        it("hasExclusiveRule is true if trait is checked", () => {
            context = new function() {
                this.properties = {
                    model: {
                        ...properties.model,
                        attributes: { exclusiveRule: true }
                    }
                }
                return this
            }()
            expect(context.properties.model.hasExclusiveRule()).toBeTruthy()
        })

        it("Refreshes all attributes by removing and then adding the needed ones if checked rule", () => {
            context = new function() {
                this.properties = {
                    model: {
                        hasExclusiveRule: jest.fn().mockReturnValueOnce(true),
                        onExclusiveRuleChange: properties.model.onExclusiveRuleChange,
                        addTrait: jest.fn(),
                        removeTrait: jest.fn(),
                        attributes: { exclusiveRule: true }
                    }
                }
                return this
            }()
            context.properties.model.onExclusiveRuleChange()
            expect(context.properties.model.addTrait).toHaveBeenCalled()
            expect(context.properties.model.removeTrait).toHaveBeenCalled()
        })
    })

    describe("Script", () => {
        it("Does not initialize if rule is unchecked", async () => {
            const props = {
                exclusiveRule: false
            }
            new script(props)
            expect(initComponent).not.toHaveBeenCalled()
        })

        it("Does initialize if rule is checked", async () => {
            const props = {
                exclusiveRule: true
            }
            new script(props)
            expect(initComponent).toHaveBeenCalled()
        })

        it("OnChange hides and retrieves the account", () => {
            const props = {
                exclusiveRule: true,
                contractType: 'ERC721'
            }
            new script(props).onChange()
            expect(hide).toHaveBeenCalled()
            expect(getBalances).toHaveBeenCalled()
        })

        it("OnBalances calls show if one positive balance among multiple", () => {
            const props = {
                exclusiveRule: true,
                contractType: 'ERC721'
            }
            new script(props).onBalances([
                ethers.BigNumber.from("0"),
                ethers.BigNumber.from("1")
            ])
            expect(show).toHaveBeenCalled()
        })

        it("OnBalances calls show if one positive balance single", () => {
            const props = {
                exclusiveRule: true,
                contractType: 'ERC721'
            }
            new script(props).onBalances([
                ethers.BigNumber.from("1")
            ])
            expect(show).toHaveBeenCalled()
        })

        it("OnBalances calls show if no positive balance", () => {
            const props = {
                exclusiveRule: true,
                contractType: 'ERC721'
            }
            new script(props).onBalances([
                ethers.BigNumber.from("0")
            ])
            expect(onErrorMessage).toHaveBeenCalled()
        })
    })
})
