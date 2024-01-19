const id = "w3-action-button"
  
const classes = `
    cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
    focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2
`
    
const content = `
      <button class="${classes}">
            Web3 Button
      </button>
    `
const block = {
    category: 'Web3',
    media: content,
    name: id,
    content: {
        tagName: id,
        type: id,
        content: 'Web3 Button',
        classes: classes.split(' ')
    }
}
  
export const script = function (props) {
    // console.log(props)
    // console.log(JSON.stringify(props))
    const { 
    //     Web3Modal,
        constants,
        utils
    } = window.webstudio

    const {
        EVENT,
    //     CACHE,
    //     CONNECT_WALLET
    } = constants

    const {
    //     onErrorMessage,
    //     onSuccessMessage,
    //     getAccount,
    //     getContract,
        getComponent,
    //     setComponentText,
    //     getProviderOptions,
    //     validateNetwork,
    //     getCachedProvider,
    //     isJson
    } = utils

    // this.getValue = (field) => {
    //     const fieldMapping = props.payload.mapping[field]
    //     let value

    //     if (fieldMapping.type === 'static') {
    //         value = fieldMapping.value
    //         console.debug(`Returning static ${value}`)
    //     } 

    //     if (fieldMapping.type === 'userAddress') {
    //         value = getAccount()
    //         console.log(`Returning mapped ${value}`)
    //     }

    //     // If value is json we return a tuple
    //     if (isJson(value)) {
    //         value = JSON.parse(value)
    //     }

    //     return value
    // }
  
    // this.getAttributes = () => {
    //     const method = props.payload.method
    //     const requiredAttributes = method.inputs.map((input) => input.name)
    //     const args = []
    //     // Function args
    //     requiredAttributes.forEach((required) => args.push(this.getValue(required)))
    //     console.debug(`Attributes to pass ${JSON.stringify(args)}`)
    //     return args
    // }

    this.getAbi = () => {
        return [props.payload.method];
    }

    this.getFunction = () => {
        const abi = this.getAbi()
        const method = props.payload.method
        const contract = getContract(props.payload.contractAddress, abi)
        const targetFunction = contract[method.name]
        return targetFunction
    }

    this.invokeMethod = () => {
        if (!props.payload.method) return
        const targetFunction = this.getFunction()
        const tagetAttributes = this.getAttributes()
        targetFunction.apply(null, tagetAttributes)
            .then((response) => {
                const explorers = props?.payload?.network?.explorers
                const defaultExplorer = explorers && explorers.length > 0 ? explorers[0].url : ''
                console.debug(`Response received ${response}`)
                console.debug(`Using explorer ${defaultExplorer}`)
                onSuccessMessage(
                    'Your transaction was successful, view it on the explorer',
                    `${defaultExplorer}/tx/${response.hash}`,
                    10000
                )
            }, (error) => {
                console.log(`Error received ${error}`)
                onErrorMessage(
                    error?.message,
                    null,
                    10000
                )
            })
    }

    getComponent(this.id).addEventListener(EVENT.CLICK, this.invokeMethod)
}

export const properties = {
    model: {
      defaults: {
          script,
          label: "Connect",
          activeLabel: "Click",
          payload: {},
          traits: [
              {
                changeProp: 1,
                type: "Text",
                name: "label"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "activeLabel"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "payload"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "infuraKey"
              },
          ],
          "script-props": ["payload", "label", "activeLabel", "infuraKey"],
      },
    }
}

/*eslint no-undef: "off"*/
const Plugin = (editor) => {
    editor.BlockManager.add(id, block);
    editor.DomComponents.addType(id, properties)
}

export default Plugin
  