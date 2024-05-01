import { onEditorPreview, onEditorPreviewStop } from './events'

describe('Editor Event Utils', () => {

    document.body.innerHTML = `<div id="gjs" class="gjs-no-preview"></div>`

    describe('onEditorPreview', () => {
        it('edits the needed css classes for rendering', () => {
            onEditorPreview()
            const gjs = document.getElementById('gjs')
            expect(gjs.classList).toContain('gjs-preview')
            expect(gjs.classList).not.toContain('gjs-no-preview')
        })
    })

    describe('onEditorPreviewStop', () => {
        it('edits the needed css classes for rendering', () => {
            onEditorPreviewStop()
            const gjs = document.getElementById('gjs')
            expect(gjs.classList).not.toContain('gjs-preview')
            expect(gjs.classList).toContain('gjs-no-preview')
        })
    })
})