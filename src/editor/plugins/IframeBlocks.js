/*eslint no-undef: "off"*/
const Plugin = (editor) => {

    const content = `
        <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI&font=Default&lang=en&initial_zoom=2&height=650' width='650' height='650' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    `

    editor.DomComponents.addType("iframe", {
        isComponent: el => el.tagName === "IFRAME",
        model: {
            defaults: {
                type: "iframe",
                traits: [
                    {
                      type: "text",
                      label: "src",
                      name: "src"
                    }
                ]
            }
        }
    })

    editor.BlockManager.add('iframe',{ 
        category: "iframe",
        type: "iframe",
        media: `
            <div class="scaled-thumbnail-50">
                ${content}
            </div>
        `,
        content,
        selectable: true
    })
}
  
export default Plugin
  
