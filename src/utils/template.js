// Extract everything in <body> and put it under <div> and copy body classes to parent div.
export const getTemplateBodyContentFromString = (inputs) => {
    const body = inputs[0].split('</head>')[1].replace('</html>','').replace('<body', '<div').replace('body>','div>')
    return body
}

export const getClassesFromSnippet = (inputs) => {
    const classNames = inputs[0]
    console.log(classNames)
    const classesList = classNames.includes("class=") ? classNames.match(/"([^"]+)"/)[1] : classNames.split(" ")
    return classesList
}

// This is a full template to override existing.
export const isHTMLTemplate = (inputs) => {
    return inputs && inputs.length === 1 && inputs[0].includes('<!DOCTYPE html>')
}

// This is a layout, or multiple html components within body, to append.
export const isHTMLSegment = (inputs) => {
    const closures = (inputs[0].match(/\<\//g) || []).length
    return closures > 1 && !isHTMLTemplate(inputs)
}

// This is single component, could be to add or to apply classes to selected component.
export const isHTMLComponent = (inputs) => {
    const closures = (inputs[0].match(/\<\//g) || []).length
    return closures <= 1 && !isHTMLTemplate(inputs)
}