import { fileToBase64 } from "./file"

describe('File utils', () => {
    test('fileToBase64 returns a cleaned up content', async () => {
        const file = new File(["foo"], "foo.txt", {
            type: "text/plain",
        })
        const result = await fileToBase64(file)
        expect(result).toEqual(btoa('foo'))
    })
})