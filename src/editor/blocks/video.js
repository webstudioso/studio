/*eslint no-undef: "off"*/
const Plugin = (editor) => {

    const dc = editor.DomComponents;
    dc.addType('video', {
        extendFn: ['updateTraits'],
        model: {
            init() {
                this.addTrait({ type: 'checkbox', name: 'muted' })
                this.addTrait({ type: 'checkbox', name: 'autoplay' })
            }
        },
    })

    const src = "https://www.shutterstock.com/shutterstock/videos/6606995/preview/stock-footage-earth-from-space-brazil-beautiful-view-of-the-earth-seen-from-space.webm"
    editor.BlockManager.add('video',{ 
        category: "Video",
        media: `<video width="100%" height="100%" autoplay src="${src}">`, 
        label: 'Video',
        content: { 
            type: 'video', 
            src,
            provider: 'so',
            muted: true,
            controls: true,
            autoplay: true
        }
    })

    const srcYT = "https://www.youtube.com/embed/M9DQPT7WZwo"
    editor.BlockManager.add('video-yt',{ 
        category: "Video",
        media: `<iframe width="100%" height="100%" src="${srcYT}"></iframe>`, 
        label: 'Youtube',
        content: { 
            type: 'video', 
            src: 'M9DQPT7WZwo',
            provider: 'yt',
            muted: true,
            controls: true,
            autoplay: true
        }
    })

    editor.BlockManager.add('video-vi',{ 
        category: "Video",
        media: `<iframe src="https://player.vimeo.com/video/783455773" width="100%" height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, 
        label: 'Vimeo',
        content: { 
            type: 'video', 
            src: '783455773',
            provider: 'vi',
            muted: true,
            controls: true,
            autoplay: true
        }
    })
  }
  
  export default Plugin
  