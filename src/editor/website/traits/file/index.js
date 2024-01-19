
const Plugin = (editor) => {
    editor.TraitManager.addType('file', {
        createInput({ component }) {
            const currentValue = component.getTrait('file')?.attributes?.value
            const subtitle = currentValue ? currentValue.name : 'JSON'
            const el = document.createElement('div')
            el.innerHTML = `
                <label for="dropzone-file" class="flex flex-col items-center w-full max-w-lg p-5 mx-auto text-center border border-indigo-300 border-dashed cursor-pointer rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500 dark:text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    <h2 class="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Click to upload or drag and drop</h2>
                    <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">${subtitle}</p>
                    <input id="dropzone-file" type="file" accept=".json, .txt" class="hidden" />
                </label>
            `
            const parent = this
            el.ondragover  = el.ondragenter = (e) => e.preventDefault()
            el.ondrop = (e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                parent.processFile({
                    file: files[0],
                    component
                })
            }
            return el
        },
        processFile({ file, component }) {
            var reader = new FileReader()
            const parent = this
            reader.onload = () => {
                const value =  {
                    name: file.name,
                    content: reader.result
                }
                component.getTrait('file').set('value', value)
                parent.rerender()
            }
            reader.readAsText(file)
        },
        onEvent({ component, event }) {
            const file = event.target.files[0]
            this.processFile({
                file, 
                component
            })
        }
    })
}

export default Plugin