export const onEditorPreview = () => {
    const ed = document.getElementById('gjs')
    ed.classList.remove('gjs-no-preview')
    ed.classList.add('gjs-preview')
}

export const onEditorPreviewStop = () => {
    const ed = document.getElementById('gjs')
    ed.classList.remove('gjs-preview')
    ed.classList.add('gjs-no-preview')
}