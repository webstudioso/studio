export const handleRightClickContextMenu = (e, editor) => {
    e.preventDefault()
    const element = e.target
    editor.select(element)
    editor.runCommand('tlb-settings', { element })
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

export const disableDefaultRTE = (editor) => {
    editor.setCustomRte({
        // ...
        /**
         * The signature of the function is the same of the `enable`
         */
        disable(el, rte) {
          el.contentEditable = true;
          rte?.focusManager?.blur(true);
        },
        // enable() {}
      });
}