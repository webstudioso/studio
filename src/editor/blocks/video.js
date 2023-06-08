/*eslint no-undef: "off"*/
const Plugin = (editor) => {
  
    const src = "https://www.shutterstock.com/shutterstock/videos/6606995/preview/stock-footage-earth-from-space-brazil-beautiful-view-of-the-earth-seen-from-space.webm"
    editor.BlockManager.add('video',{ 
        category: "Video",
        media: `<video width="100%" height="auto" autoplay src="${src}">`, 
        label: 'Video',
        content: { 
            type: 'video', 
            src,
            provider: 'so',
            muted: true,
            controls: true
        }
    })

    const srcYT = "https://www.youtube.com/embed/M9DQPT7WZwo"
    editor.BlockManager.add('video-yt',{ 
        category: "Video",
        media: `<iframe width="100%" height="auto" src="${srcYT}"></iframe>`, 
        label: 'Youtube',
        content: { 
            type: 'video', 
            src: 'M9DQPT7WZwo',
            provider: 'yt',
            muted: true,
            controls: true
        }
    })

    editor.BlockManager.add('video-vi',{ 
        category: "Video",
        media: `<iframe src="https://player.vimeo.com/video/783455773" width="100%" height="auto" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, 
        label: 'Vimeo',
        content: { 
            type: 'video', 
            src: '783455773',
            provider: 'vi',
            muted: true,
            controls: true
        }
    })

    const dc = editor.DomComponents;
    dc.addType('video', {
        extendFn: ['updateTraits'],
        model: {
            init() {
                this.addMutedTrait();
            },
    
            updateTraits() {
                this.addMutedTrait();
            },
    
            addMutedTrait() {
                if (!this.getTrait('muted')) {
                    this.addTrait({
                        type: 'checkbox',
                        name: 'muted',
                    })
                }
            },
        },
    })

    // editor.BlockManager.add('h2',{ 
    //     category: "Text", 
    //     media: '<h2 class="text-2xl font-medium selected-font">Add Heading 2</h2>', 
    //     content: { 
    //         type: 'text', 
    //         content: '<h2>Add Heading 2</h2>',
    //         classes: ['text-2xl', 'font-medium']
    //     }
    // })
    // editor.BlockManager.add('h3',{ 
    //     category: "Text", 
    //     media: '<h3 class="text-xl font-normal selected-font">Add Heading 3</h3>', 
    //     content: { 
    //         type: 'text', 
    //         content: '<h3>Add Heading 3</h3>',
    //         classes: ['text-xl', 'font-normal']
    //     }
    // })
    // editor.BlockManager.add('h4',{ 
    //     category: "Text", 
    //     media: '<h4 class="text-xl font-bold selected-font">Add Heading 4</h4>', 
    //     content: { 
    //         type: 'text', 
    //         content: '<h4>Add Heading 4</h4>',
    //         classes: ['text-xl', 'font-bold']
    //     }
    // })
    // editor.BlockManager.add('h5',{ 
    //     category: "Text", 
    //     media: '<h5 class="text-xl font-light selected-font">Add Heading 5</h5>', 
    //     content: { 
    //         type: 'text', 
    //         content: '<h5>Add Heading 5</h5>',
    //         classes: ['text-xl', 'font-light']
    //     }
    // })
    // editor.BlockManager.add('h6',{ 
    //     category: "Text", 
    //     media: '<h6 class="text-xl font-bold selected-font">Add Heading 6</h6>', 
    //     content: { 
    //         type: 'text', 
    //         content: '<h6>Add Heading 6</h6>',
    //         classes: ['text-xl', 'font-bold']
    //     }
    // })
    // const paragraph = "I'm a paragraph. Drag and drop me into the canvas so you can edit. It's easy."
    // editor.BlockManager.add('p',{ 
    //     category: "Text", 
    //     media: `<p class="text-xl font-bold selected-font">${paragraph}</p>`, 
    //     content: { 
    //         type: 'text', 
    //         content: `<p>${paragraph}</p>`,
    //         classes: ['text-xl', 'font-bold']
    //     }
    // })
    // editor.BlockManager.add('pl',{ 
    //     category: "Text", 
    //     media: `<p class="text-lg selected-font">${paragraph}</p>`, 
    //     content: { 
    //         type: 'text', 
    //         content: `<p>${paragraph}</p>`,
    //         classes: ['text-lg'] 
    //     }
    // })
    // editor.BlockManager.add('pm',{ 
    //     category: "Text", 
    //     media: `<p class="text-md font-medium selected-font">${paragraph}</p>`, 
    //     content: { 
    //         type: 'text', 
    //         content: `<p>${paragraph}</p>` ,
    //         classes: ['text-md', 'font-medium']
    //     }
    // })
  }
  
  export default Plugin
  