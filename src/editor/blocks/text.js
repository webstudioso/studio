/*eslint no-undef: "off"*/
const Plugin = (editor) => {
  
    editor.BlockManager.add('h1',{ 
        category: "Text",
        media: '<h1 class="text-3xl font-bold selected-font">Add Heading 1</h1>', 
        content: { 
            type: 'text', 
            content: '<h1>Add Heading 1</h1>',
            classes: ['text-3xl', 'font-bold']
        }
    })
    editor.BlockManager.add('h2',{ 
        category: "Text", 
        media: '<h2 class="text-2xl font-medium selected-font">Add Heading 2</h2>', 
        content: { 
            type: 'text', 
            content: '<h2>Add Heading 2</h2>',
            classes: ['text-2xl', 'font-medium']
        }
    })
    editor.BlockManager.add('h3',{ 
        category: "Text", 
        media: '<h3 class="text-xl font-normal selected-font">Add Heading 3</h3>', 
        content: { 
            type: 'text', 
            content: '<h3>Add Heading 3</h3>',
            classes: ['text-xl', 'font-normal']
        }
    })
    editor.BlockManager.add('h4',{ 
        category: "Text", 
        media: '<h4 class="text-xl font-bold selected-font">Add Heading 4</h4>', 
        content: { 
            type: 'text', 
            content: '<h4>Add Heading 4</h4>',
            classes: ['text-xl', 'font-bold']
        }
    })
    editor.BlockManager.add('h5',{ 
        category: "Text", 
        media: '<h5 class="text-xl font-light selected-font">Add Heading 5</h5>', 
        content: { 
            type: 'text', 
            content: '<h5>Add Heading 5</h5>',
            classes: ['text-xl', 'font-light']
        }
    })
    editor.BlockManager.add('h6',{ 
        category: "Text", 
        media: '<h6 class="text-xl font-bold selected-font">Add Heading 6</h6>', 
        content: { 
            type: 'text', 
            content: '<h6>Add Heading 6</h6>',
            classes: ['text-xl', 'font-bold']
        }
    })
    const paragraph = "I'm a paragraph. Drag and drop me into the canvas so you can edit. It's easy."
    editor.BlockManager.add('p',{ 
        category: "Text", 
        media: `<p class="text-xl font-bold selected-font">${paragraph}</p>`, 
        content: { 
            type: 'text', 
            content: `<p>${paragraph}</p>`,
            classes: ['text-xl', 'font-bold']
        }
    })
    editor.BlockManager.add('pl',{ 
        category: "Text", 
        media: `<p class="text-lg selected-font">${paragraph}</p>`, 
        content: { 
            type: 'text', 
            content: `<p>${paragraph}</p>`,
            classes: ['text-lg'] 
        }
    })
    editor.BlockManager.add('pm',{ 
        category: "Text", 
        media: `<p class="text-md font-medium selected-font">${paragraph}</p>`, 
        content: { 
            type: 'text', 
            content: `<p>${paragraph}</p>` ,
            classes: ['text-md', 'font-medium']
        }
    })
  }
  
  export default Plugin
  