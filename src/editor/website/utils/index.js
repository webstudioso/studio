export const handleRightClickContextMenu = (e, editor) => {
    e.preventDefault()
    const element = e.target
    editor.select(element)
    editor.runCommand('tlb-settings', editor)
}

export const enableContextMenu = (editor) => {
    editor.DomComponents.addType('default', {
        view: {
            events: {
                contextmenu: (e) => handleRightClickContextMenu(e, editor)
            }
        }
    })
}