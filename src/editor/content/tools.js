import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter' 
import List from '@editorjs/list' 
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote' 
import CodeTool from '@editorjs/code' 
import Embed from '@editorjs/embed' 
import Table from '@editorjs/table' 
import LinkTool from '@editorjs/link' 
import Warning from '@editorjs/warning'
import Marker from '@editorjs/marker' 
import InlineCode from '@editorjs/inline-code'
import ImageTool from '@editorjs/image'
import { uploadFilesToIPFS } from 'api/publish'
import { fileToBase64 } from 'utils/file'

const tools = {
    // /**
    //  * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
    //  */
    header: {
      class: Header,
    //   inlineToolbar: ['marker', 'link'],
      config: {
        placeholder: 'Header',
        placeholder: 'Title',
        levels: [1, 2],
        defaultLevel: 1
      },
      shortcut: 'CMD+SHIFT+H'
    },

    image: {
        class: ImageTool,
        config: {
            /**
             * Custom uploader
             */
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByFile(file){
                    const content = await fileToBase64(file)
                    const pages = [{
                        path: file.name,
                        content
                    }]
                    const upload = await uploadFilesToIPFS({pages})
                    let url = upload[0].path;
                    return {
                        success: 1,
                        file: {
                            url
                        }
                    }
                }
            }
        }
    },
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },
    warning: Warning,
    marker: {
      class:  Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    code: {
      class:  CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
    linkTool: LinkTool,
    embed: Embed,
    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: 'CMD+ALT+T'
    }
}

export default tools