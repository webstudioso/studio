
export const id = 'wsm-modal'

export const block = {
    id: `section-${id}`,
    media: `
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Payment successful</h3>
                  <div class="mt-2">
                      <p class="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
                  </div>
              </div>
          </div>
          <div class="mt-5 sm:mt-6">
              <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back to dashboard</button>
          </div>
      </div>
    `,
    category: "Toast",
    content: `
      <div id=${id} class="hidden relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                          <div>

                              <div id="${id}-icon" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full">

                              </div>

                              <div class="mt-3 text-center sm:mt-5">
                                  <h3 id="${id}-title" class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Payment successful</h3>
                                  <div class="mt-2">
                                      <p id="${id}-text" class="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.</p>
                                  </div>
                              </div>
                          </div>
                          <div class="mt-5 sm:mt-6">
                              <button id="${id}-cta" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back to dashboard</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    `
}
 
/**
 * How to trigger this Modal
 * 
 *  const detail = { 
 *       detail: { 
 *           alertSeverity: 'error', // success, error
 *           title: 'To Be Displayed as H3',
 *           message: 'To be displayed as paragraph',
 *           cta: 'Button label',
 *           ctaUrl: 'https://imagetoredirect.to'
 *       }
 *   };
 *   const event = new CustomEvent('onToast', detail)
 *   document.dispatchEvent(event)
 */
export function script() {

    const svgSuccessIcon = `
        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    `

    const svgErrorIcon = `
        <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    `
    let modal, icon, header, text, button

    this.init = () => {
        modal = document.getElementById(this.id)
        icon = document.getElementById(`${this.id}-icon`)
        header = document.getElementById(`${this.id}-title`)
        text = document.getElementById(`${this.id}-text`)
        button = document.getElementById(`${this.id}-cta`)

        document.addEventListener('onToast', this.showModal)
    }

    this.handleCallToAction = (ctaUrl) => {
        if (ctaUrl)
            window.open(ctaUrl, '__blank')
        modal.classList.add('hidden')
    }

    this.showModal = (e) => {
        const {
            alertSeverity,
            title,
            message,
            cta = 'Continue',
            ctaUrl
        } = e.detail

        modal.classList.remove('hidden')
        icon.innerHTML = alertSeverity === 'error' ? svgErrorIcon : svgSuccessIcon
        
        if (alertSeverity === 'error') {
            icon.classList.remove('bg-green-100')
            icon.classList.add('bg-red-100')
        } else {
            icon.classList.add('bg-green-100')
            icon.classList.remove('bg-red-100')
        }

        // Set content
        header.textContent = title
        text.textContent = message            
        button.textContent = cta

        // On click redirect to url
        button.addEventListener('click', () => this.handleCallToAction(ctaUrl))
    }

    this.init()
}

export const properties = {
    isComponent: (el) => el.id === id,
    model: {
        defaults: {
            script
        }
    }
}

const Plugin = (editor) => {
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, properties)
}
  
export default Plugin
  
