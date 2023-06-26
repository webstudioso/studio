const id = 'Section'

const block =  { 
    category: 'Web3',
    media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="50.91 65.95 355.33 167.34">  <rect x="51.413" y="66.447" width="354.331" height="166.343" style="fill: rgb(245, 245, 245); stroke: rgb(234, 234, 234); stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 4px;"></rect>  <g transform="matrix(0.048289, 0, 0, 0.048289, 200.890991, 119.933388)" style="">    <path d="M500,57.2c59.8,0,117.8,11.7,172.3,34.8c52.7,22.3,100.1,54.2,140.8,94.9c40.7,40.7,72.6,88,94.9,140.8c23.1,54.6,34.8,112.5,34.8,172.3c0,59.8-11.7,117.8-34.8,172.3c-22.3,52.7-54.2,100.1-94.9,140.8c-40.7,40.7-88,72.6-140.8,94.9c-54.6,23.1-112.5,34.8-172.3,34.8c-59.8,0-117.8-11.7-172.3-34.8c-52.7-22.3-100.1-54.2-140.8-94.9c-40.7-40.7-72.6-88-94.9-140.8C68.9,617.8,57.2,559.8,57.2,500c0-59.8,11.7-117.8,34.8-172.3c22.3-52.7,54.2-100.1,94.9-140.8c40.7-40.7,88-72.6,140.8-94.9C382.2,68.9,440.2,57.2,500,57.2 M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10L500,10z" style="stroke-opacity: 0.47; fill: rgb(178, 176, 176);"></path>    <path d="M651.2,461.6h-33.4v-79.1c0-66.3-52.8-120.1-117.8-120.1c-65,0-117.8,53.9-117.8,120.1v79.1h-33.3c-16.1,0-29.1,13.3-29.1,29.7v216.6c0,16.4,13,29.7,29.1,29.7h302.4c16.1,0,29.1-13.3,29.1-29.7V491.3C680.3,474.9,667.2,461.6,651.2,461.6L651.2,461.6z M516.4,605.3v47.3c0,2.1-1.7,3.9-3.8,3.9h-25c-2.1,0-3.8-1.8-3.8-3.9v-47.3c-11.8-6.1-19.9-18.4-19.9-32.8c0-20.4,16.2-36.9,36.2-36.9c20,0,36.2,16.6,36.2,36.9C536.2,586.8,528.1,599.1,516.4,605.3L516.4,605.3z M572.6,461.6H427.4v-77.2c0-40.8,32.6-74,72.6-74c40,0,72.6,33.2,72.6,74L572.6,461.6L572.6,461.6z" style="stroke-opacity: 0.47; fill: rgb(178, 176, 176);"></path>  </g>  <text style="fill: rgb(154, 154, 154); font-family: Avenir; font-size: 14px; white-space: pre;" x="64.717" y="90.057">&lt;section /&gt;</text></svg>
    `,
    label: `
        <div class="w-full py-1 text-center bg-blue-600 text-white font-bold">
            Premium
        </div>
    `,
    tagName: 'section',
    content: '<section class="p-8"></section>',
    premium: true
}

const traits = [
    {
        changeProp: 1,
        type: "select",
        label: "Contract Type",
        name: "contractType",
        options: [
            { id: "ERC1155", name: "ERC1155" },
            { id: "ERC721", name: "ERC721" }
        ],
    },
    {
        type: "text",
        label: "Contract Address",
        name: "contract",
        changeProp: 1,
    },
    {
        type: "text",
        label: "Token IDs",
        name: "tokenIds",
        changeProp: 1,
    }
];

const traitsList = traits.map((trait) => trait.name)

export const properties = {
    isComponent: (el) => el.tagName === 'SECTION',
    model: {
        defaults:{
            script,
            exclusiveRule: false,
            traits: [
                {
                    changeProp: 1,
                    type: "checkbox",
                    label: "Exclusive Rule",
                    name: "exclusiveRule"
                },
                ...traits
            ],
            "script-props": ['exclusiveRule', ...traitsList],
        },
        init() {
            this.on('change:exclusiveRule', this.onExclusiveRuleChange)
            this.onExclusiveRuleChange()
        },
        onExclusiveRuleChange() {
            this.removeTrait(traitsList)
            if (this.hasExclusiveRule()) {
                this.addTrait(traits)
            }
        },
        hasExclusiveRule() {
            return this?.attributes?.exclusiveRule
        }
    }
}

export function script(props) {
    const {
      show,
      hide,
      onErrorMessage,
      getAccount,
      getBalances,
      initComponent
    } = window.webstudio.utils

    this.parseTokenIds = () => {
        return props?.tokenIds?.split(",") || []
    }

    this.onBalances = (balances) => {
        console.debug(`Retrieving balances from component ${this.id}`)
        const numBalances = balances?.map((balance) => balance.toNumber())
        const positiveBalances = numBalances?.find((item) => item > 0)
        console.debug(`Balance retrieved ${positiveBalances}`)
        if (positiveBalances) {
            show(this.id);
        } else {
            onErrorMessage('Your balance is insuficient')
        }
    }

    this.onChange = () => {
        console.debug(`Component ${this.id} reacting to event change`)
        hide(this.id)
        try {
            const account = getAccount()
            console.debug(`Current account ${account} of connected wallet`)
            if (!account) return

            getBalances({
                address: props.contract,
                standard: props.contractType,
                tokenIds: this.parseTokenIds(),
                handler: this.onBalances
            })
        } catch (e) {
            console.debug(e);
            onErrorMessage(e.message)
        }
    }

    if (props.exclusiveRule) {
        initComponent(this.id, this.onChange)
    }
}

/*eslint no-undef: "off"*/
const Plugin = async (editor) => {
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, properties)
}
  
export default Plugin