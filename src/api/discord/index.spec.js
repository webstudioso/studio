import { 
    getDiscordPayloadEmbeds, 
    requestNewDomain, 
    createNewProject, 
    publishProject
} from './index'

describe("Discord API", () => {

    let user, project, domain

    beforeEach(() => {
        user = {
            email: 'test@test.com',
            issuer: 'test123'
        }
        project = {
            subdomain: 'teststudio'
        }
        domain = 'test.io'

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(true)
            })
        )
    })

    describe("getDiscordPayloadEmbeds", () => {
        it("Returns a json array with values", async () => {
            const expectedResponse = [
                {
                    "author": {
                        "name": "test@test.com"
                    }, 
                    "color": 123, 
                    "fields": [{
                        "inline": true, 
                        "name": "User", 
                        "value": "test123"
                    }, {
                        "inline": true, 
                        "name": "Subdomain", 
                        "value": "teststudio"
                    }], 
                    "title": "test.io", 
                    "url": "https://teststudio.undefined.webstudio.so"
                }
            ]
            const embeds = getDiscordPayloadEmbeds(user, project, domain, 123)
            expect(embeds).toEqual(expectedResponse)
        })
    })

    describe("requestNewDomain", () => {
        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when success", async () => {
            const dispatch = jest.fn()
            requestNewDomain(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "success", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "testmsg", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })

        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when error", async () => {
            global.fetch = jest.fn().mockImplementation(() => {
                throw new Error('Invalid request')
            })
            const dispatch = jest.fn()
            requestNewDomain(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "error", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "Invalid request", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })
    })

    describe("createNewProject", () => {
        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when succes", async () => {
            const dispatch = jest.fn()
            createNewProject(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "success", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "testmsg", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })

        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when error", async () => {
            global.fetch = jest.fn().mockImplementation(() => {
                throw new Error('Invalid request')
            })
            const dispatch = jest.fn()
            createNewProject(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "error", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "Invalid request", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })
    })

    describe("publishProject", () => {
        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when succes", async () => {
            const dispatch = jest.fn()
            publishProject(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "success", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "testmsg", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })

        it("calls dispatch 3 times, 2 for loading bar toggling and one for notification when error", async () => {
            global.fetch = jest.fn().mockImplementation(() => {
                throw new Error('Invalid request')
            })
            const dispatch = jest.fn()
            publishProject(dispatch, user, domain, project, 'testmsg')
            expect(dispatch).toHaveBeenCalledWith({"show": true, "type": "@loader/SHOW"})
            expect(dispatch).toHaveBeenCalledWith({"alertSeverity": "error", "anchorOrigin": {"horizontal": "center", "vertical": "top"}, "message": "Invalid request", "open": true, "type": "@snackbar/SNACKBAR_OPEN", "variant": "alert"})
            expect(dispatch).toHaveBeenCalledWith({"show": false, "type": "@loader/SHOW"})
        })
    })
})