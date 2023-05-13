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

export const getCertificate = ({ project }) => {
    // We add a cert.json
    const certificate = {
      path: 'cert.json',
      content:{
        issuedTo:{
          name: project.name,
          type: 'website',
          owner: project.owner,
          domain: project.domain,
          alternateDomain: getWebstudioUrl({ projectId: project.id })
        },
        issuedBy: {
          authority: 'Webstudio',
          url: 'https://webstudio.so',
          legalEntity: {
            name: "Dappity Limited",
            type: "LTD - Private Company Limited by Shares",
            identifier: "727872",
            link: 'https://core.cro.ie/e-commerce/company/4975428'
          }
        },
        issuedTime: {
          timestamp: new Date().getTime()
        }
      }
    }
    return certificate
}

export const getPages = ({ tags=[], fonts=[], editor, project }) => {
    const certificate = getCertificate({ project })
    const pages = [certificate]
    const pageManager = editor?.Pages
    const currentPageId = pageManager.getSelected().id
    pageManager.getAll().forEach(async (page) => {

      pageManager.select(page.id);
      const pageName = page.attributes?.type === 'main' ? 'index' : page.attributes?.name;
      const body = page.getMainComponent().toHTML();

      const functionalBody = body.replace(
        '</body>', 
        `
          <div id="ipfs-cert-badge" class="fixed left-0 bottom-0 rounded-tr-lg px-2 py-2 bg-white drop-shadow-sm cursor-pointer opacity-10 hover:opacity-100 transition ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shield-check-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#a905b6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor" />
              </svg>
          </div>

          <script>
            ${editor.getJs()}
          </script>

          <script>
              const el = document.getElementById("ipfs-cert-badge");
              el.addEventListener("click", () => {
                  fetch("https://api.dev.webstudio.so/route/testo.dev.webstudio.so")
                    .then((r) => r.json())
                    .then((r) => {
                      window.open("https://ipfs.moralis.io:2053/ipfs/"+r.cid+"/cert.json",'__blank')
                    })
              })
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
                ${editor.getCss()}
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
    pageManager.select(currentPageId);
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