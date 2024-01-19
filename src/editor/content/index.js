import { useEffect } from 'react'
import 'editor/content/assets/sass/styles.scss'
import EditorJS from '@editorjs/editorjs'
import tools from 'editor/content/tools'
import { getLocalStoredBlogContent, saveLocalStoredBlogContent } from 'utils/content'

const ContentEditor = ({ intl }) => {

    const onChange = async (api) => {
        const content = await api.saver.save()
        saveLocalStoredBlogContent(content)
    }

    const initializeEditor = async () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            tools,
            data: getLocalStoredBlogContent(intl),
            autofocus: true,
            onChange
        })
    }

    useEffect(() => {
        initializeEditor()
    }, [])

    return (
        <div id="editorjs" />
    )
}

export default ContentEditor