import { WSMFontStyles } from "wsm-fonts"

export const getUserConfiguredMetadataTags = ({ project }) => {
    const metadata = project?.metadata
    if (!metadata) return;

    const tags = Object.keys(metadata).map((key) => {
        const value = metadata[key]
        const isProperty =  key.startsWith('og:')      || 
                            key.startsWith('twitter:')
        return `<meta ${ isProperty? "property" : "name" }="${key}" content="${value}"></meta>`
    })
    tags.push(`
        <title>${metadata.description}</title>
        <link rel="icon" sizes="192x192" href="">
        <link rel="shortcut icon" href="${metadata.icon}" type="image/png">
        <link rel="apple-touch-icon" href="${metadata.icon}" type="image/png">
    `)
    return tags
}

export const getCustomFontsMetadatTags = () => WSMFontStyles.map((font) => `<link rel="stylesheet" href="${font}" />`)

export const getPages = async ({ tags=[], fonts=[], editor, project }) => {
    const pages = []

    editor?.Pages.getAll().forEach(async (page) => {
      const component = page.getMainComponent()
      const html = editor.getHtml({ component })
      const js = editor.getJs({ component })
      const css =  editor.getCss({ component })

      const pageName = page.attributes?.type === 'main' ? 'index' : page.attributes?.name;

      const body = html
      const functionalBody = body.replace(
        '</body>', 
        `<script>
            ${js}
          </script>
        </body>`
      ).replace('<video', '<video autoplay');

      const content = `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${tags.join('')}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            ${fonts.join('')}
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"></script>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/webstudio-sdk@0.0.6/dist/main.min.js"></script>
            <style>
                html {
                    scroll-behavior: smooth;
                }
                ${css}
            </style>
          </head>
          ${functionalBody}
        </html>`;

        pages.push({
          path: `${pageName}.html`,
          content:btoa(unescape(encodeURIComponent(content)))
        });
    });

    // Return to original selected page
    // pageManager.select(currentPageId);
    return pages
}

export const getCidFromDeployment = ({ upload }) => {
    const indexPage = upload?.find((item) => item.path.includes('/index.html'))
    const cid = indexPage.path.split('/')[4]
    return cid
}

export const getWebstudioUrl = ({ projectId }) => {
    return process.env.REACT_APP_HOST_ENV === 'dev' ?
    `${projectId}.dev.webstudio.so` :
    `${projectId}.webstudio.so`
}