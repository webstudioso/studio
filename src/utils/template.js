// Extract everything in <body> and put it under <div> and copy body classes to parent div.
export const getTemplateBodyContentFromString = (inputs) => {
    let body = inputs
    const match = body?.match(/<body(.*?)<\/body>/s)
    // If match html code, clean up
    if (match && match?.length > 0) {
        body = match[0]
        body = body.replaceAll('<body', '<div')
        body = body.replaceAll('</body>', '</div>')
    }
    return body
}
