/*eslint no-undef: "off"*/
const Plugin = (editor) => {
  
    const src = 'https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg'
    editor.BlockManager.add('image-org',{ 
        category: "Image",
        label: 'Original',
        media: `<img src="${src}"/>`, 
        content: { 
            type: 'image', 
            content: `<img src="${src}"/>`,
            src
        }
    })
    editor.BlockManager.add('image-gray',{ 
        category: "Image",
        label: 'Grayscale',
        media: `<img class='grayscale' src="${src}"/>`, 
        content: { 
            type: 'image', 
            content: `<img src="${src}"/>`,
            classes: ['grayscale'],
            src
        }
    })
    editor.BlockManager.add('image-invert',{ 
        category: "Image",
        label: 'Inverted',
        media: `<img class='invert' src="${src}"/>`, 
        content: { 
            type: 'image', 
            content: `<img src="${src}"/>`,
            classes: ['invert'],
            src
        }
    })
    editor.BlockManager.add('image-sepia',{ 
        category: "Image",
        label: 'Sepia',
        media: `<img class='sepia' src="${src}"/>`, 
        content: { 
            type: 'image', 
            content: `<img src="${src}"/>`,
            classes: ['sepia'],
            src
        }
    })
    editor.BlockManager.add('image-blur',{ 
        category: "Image",
        label: 'Blurred',
        media: `<img class='blur-sm' src="${src}"/>`, 
        content: { 
            type: 'image', 
            content: `<img src="${src}"/>`,
            classes: ['blur-sm'],
            src
        }
    })
  }
  
  export default Plugin
  
