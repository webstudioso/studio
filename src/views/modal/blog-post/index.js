import { ContentEditor } from 'editor'
import { useDispatch } from 'react-redux'
import { HIDE_MODAL } from 'store/actions'
import { getLocalStoredBlogContent } from 'utils/content'
import ModalToolbar from 'views/modal/toolbar'
import editorJSHtml from 'editorjs-html'

const BlogPost = ({ intl }) => {
    const dispatch = useDispatch()

    const handlePublish = () => {
        const content = getLocalStoredBlogContent(intl)
        const parser = editorJSHtml()
        let html = parser.parse(content)
        console.log(html)
        dispatch({ type: HIDE_MODAL })
    }

    const handleClose = () => {
        dispatch({ type: HIDE_MODAL })
    }

    return (
        <>
            <ModalToolbar   title='section.blog_tooltip_title'
                            tooltip='section.blog_tooltip_description'
                            ctaLabel='publish'
                            ctaAction={handlePublish}
                            onClose={handleClose} 
            />
            <ContentEditor  intl={intl} />
        </>
    )
}

export default BlogPost