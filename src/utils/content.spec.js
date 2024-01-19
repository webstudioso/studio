import { 
    getLocalStoredBlogContent, 
    saveLocalStoredBlogContent 
} from "./content"

import constants from 'constant'

const { BLOG_CONTENT } = constants

describe('Blog Content utils', () => {

    let intl

    beforeEach(() => {
        intl = {
            formatMessage: jest.fn().mockReturnValue('sample text')
        }
    })

    test('If no previous data on local storage returns default from intl', () => {
        const defaultContent = getLocalStoredBlogContent(intl)
        expect(defaultContent.blocks.length).toEqual(2)
        expect(defaultContent.blocks[0].type).toEqual('header')
        expect(defaultContent.blocks[1].type).toEqual('paragraph')
    })

    test('If previous data, return instead of default', () => {
        const storedData = {
            blocks: [
                {
                    type: 'test'
                }
            ]
        }
        window.localStorage.setItem(BLOG_CONTENT, JSON.stringify(storedData))
        const defaultContent = getLocalStoredBlogContent(intl)
        expect(defaultContent.blocks.length).toEqual(1)
        expect(defaultContent.blocks[0].type).toEqual('test')
    })
})