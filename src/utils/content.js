import editorjsParser from 'editorjs-html'
import constants from 'constant'

const { BLOG_CONTENT } = constants

export const getLocalStoredBlogContent = (intl) => {
    const rawContent = window.localStorage.getItem(BLOG_CONTENT)
    const defaultBlocks = {
        blocks:[
            {
                type: 'header',
                data: {
                    text: intl.formatMessage({ id: 'blog.title' }),
                    level: '1',
                },
            },
            {
                type : "paragraph",
                data : {
                    text : intl.formatMessage({ id: 'blog.tell_your_story' }),
                }
            }
        ]
    }
    return rawContent ? JSON.parse(rawContent) : defaultBlocks
}

export const saveLocalStoredBlogContent = (content) => {
    window.localStorage.setItem(BLOG_CONTENT, JSON.stringify(content))
}

export const getBlogContentHTML = (intl) => {
    const parser = editorjsParser()
    const content = getLocalStoredBlogContent(intl)
    let html = parser.parse(content)
    return html
}