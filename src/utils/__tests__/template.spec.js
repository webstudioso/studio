import { getTemplateBodyContentFromString } from "../template"

describe('Template utils', () => {
    test('Returns original text is no html code is found', () => {
        const content = `
            Unaltered content
        `
        const result = getTemplateBodyContentFromString(content)
        expect(result).toEqual(content)
    })

    test('Removes all text around body and replaces body tags with divs keeping properties', () => {
        const comment = 'This is text'
        const content = `
            ${comment}
            \`\`\`html
            <html>
                <head>
                    Header
                </head>
                <body class="my classes go here">
                    Body
                    More Body
                </body>
            </html>
            \`\`\`
            ${comment}
        `
        const result = getTemplateBodyContentFromString(content)
        expect(result).not.toContain(comment)
        expect(result).not.toContain('<html>')
        expect(result).not.toContain('</html>')
        expect(result).not.toContain('<head>')
        expect(result).not.toContain('</head>')
        expect(result).not.toContain('<body class="my classes go here">')
        expect(result).not.toContain('</body>')
        expect(result).toContain('</div>')
        expect(result).toContain('<div class="my classes go here">')
        expect(result).toContain('Body')
        expect(result).toContain('More Body')
    })
})