
export const id = `timer`

export const timer = `
    <div id="${id}" class="min-w-screen bg-yellow-500 flex items-center justify-center px-5 py-48">
        <div class="text-yellow-100">
            <h1 class="text-3xl text-center mb-3 font-extralight">When will pubs open in England?*</h1>
            <div class="text-6xl text-center flex w-full items-center justify-center">
                <div class="text-2xl mr-1 font-extralight">in</div>
                <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                    <div class="font-mono leading-none" text-timer="days">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Days</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                    <div class="font-mono leading-none" text-timer="hours">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Hours</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                    <div class="font-mono leading-none" text-timer="minutes">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Minutes</div>
                </div>
                <div class="text-2xl mx-1 font-extralight">and</div>
                <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                    <div class="font-mono leading-none" text-timer="seconds">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Seconds</div>
                </div>
            </div>
            <p class="text-sm text-center mt-3">*<a href="" class="underline hover:text-yellow-200" target="_blank">As per goverment plan</a>. Subject to change.</p>
        </div>
    </div>
`

export const block = {
    id,
    media: `
        <div class="scaled-thumbnail-50">
            ${timer}
        </div>
    `,
    category: 'timer',
    content: timer
}

export function script(props) {
    const component = document.getElementById(this.id)
    const components = component?.querySelectorAll('[text-timer]')

    const getDelta = (target, now) => {
        var d = Math.abs(target - now) / 1000                        // delta
        var r = {}                                                               // result
        var s = {                                                                  // structure
            // years: 31536000,
            // months: 2592000,
            // weeks: 604800, // uncomment row to ignore
            days: 86400,   // feel free to add your own row
            hours: 3600,
            minutes: 60,
            seconds: 1
        }
    
        Object.keys(s).forEach(function(key){
            r[key] = Math.floor(d / s[key])
            d -= r[key] * s[key]
        })
        return r
    }

    const updateComponent = () => {
        const now = Date.now()
        const target = Date.parse(props.date)
        const delta = getDelta(target, now)
        components.forEach((cmp) => {
            const displayValue = delta[cmp.getAttribute('text-timer')]
            cmp.textContent = displayValue
        })
    }

    setInterval(() => {
        updateComponent()
    }, 1000)

    updateComponent()
}

export const properties = {
    isComponent: (el) => el.id === id,
    model: {
        defaults: {
            script,
            date: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            traits: [
                {
                  changeProp: 1,
                  type: "Text",
                  name: "date",
                  label: "ISO Date"
                }
            ],
            "script-props": ["date"],
        }
    }
}

const TimerBlocks = (editor) => {
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, properties)
}

export default TimerBlocks
