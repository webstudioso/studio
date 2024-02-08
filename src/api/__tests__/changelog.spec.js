import { 
    getChangelog,
    getCachedChangelogMatchValue,
    setChangelogMatchValue
} from '../changelog'

describe("Changelog API", () => {

    let msg
    beforeEach(() => {
        msg = 'Text that is longer than 35 characters'
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(msg)
            })
        )
    })

    describe("getChangelog", () => {
        it("Returns an object with full message and cropped key for caching", async () => {
            const log = await getChangelog('es')
            expect(global.fetch).toHaveBeenCalledWith('https://s3.amazonaws.com/webstudio.changelog/CHANGELOG_es.md', {cache: 'no-cache'})
            expect(log.changelogText).toBe(msg)
            expect(log.changelogMatchValue).toBe(log.changelogText.substring(0, 35))
        })
        it("Returns object with keys and empty values if error", async () => {
            global.fetch = jest.fn().mockImplementation(() => {
                throw new Error('Invalid request')
            })
            const log = await getChangelog('en')
            expect(global.fetch).toHaveBeenCalledWith('https://s3.amazonaws.com/webstudio.changelog/CHANGELOG_en.md', {cache: 'no-cache'})
            expect(log).toHaveProperty('changelogText')
            expect(log).toHaveProperty('changelogMatchValue')
            expect(log.changelogText).toBe(undefined)
            expect(log.changelogMatchValue).toBe(undefined)
        })
    })

    describe("getCachedChangelogMatchValue", () => {
        const msg = 'This is a sample test with a message longer of what it is stored'
        const expected = msg.substring(0,35)
        setChangelogMatchValue(msg)
        expect(getCachedChangelogMatchValue()).toBe(expected)
    })
})