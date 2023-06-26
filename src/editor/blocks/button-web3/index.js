const id = "Web3Button"
  
const classes = 'cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    
const content = `
      <button type="button" data-gjs-type="${id}" class="${classes}">
        Web3 Button
      </button>
    `
const block = {
    category: 'Web3',
    media: content,
    label: 'Web3 Button',
    name: id,
    content
}
  
export const script = function (props) {
    const { 
        Web3Modal,
        constants,
        utils
    } = window.webstudio

    const {
        EVENT,
        CACHE,
        CONNECT_WALLET
    } = constants

    const {
        onErrorMessage,
        onSuccessMessage,
        getAccount,
        getContract,
        getComponent,
        setComponentText,
        getProviderOptions,
        validateNetwork,
        getCachedProvider,
        isJson
    } = utils

    // Propagate events from provider to other components
    this.onDisconnectedEvent = () => document.dispatchEvent(new Event(EVENT.DISCONNECTED, window.walletProvider))
    this.onConnectedEvent = () => document.dispatchEvent(new Event(EVENT.CONNECTED, window.walletProvider))
    this.onNetworkChangedEvent = () => document.dispatchEvent(new Event(EVENT.NETWORK_CHANGED, window.walletProvider))
    this.onAccountChangedEvent = () => document.dispatchEvent(new Event(EVENT.ACCOUNT_CHANGED, window.walletProvider))
    this.onChainChangedEvent = () => document.dispatchEvent(new Event(EVENT.CHAIN_CHANGED, window.walletProvider))

    this.disconnect = () => {
        this.onDisconnectEvent()
        try {
            localStorage.removeItem(CACHE);
            localStorage.clear();
            window.walletProvider = null
            this.getModal()?.clearCachedProvider();
        } catch (e) {
            console.log("Could not disconnect wallet completly", e)
            // this.sendNotification(SEVERITY.ERROR, e.message, null, 5000)
            onErrorMessage(e.message)
        } finally {
            setComponentText(this.id, this.props.label)
        }
    }

    this.getValue = (field) => {
        const fieldMapping = props.payload.mapping[field]
        let value

        if (fieldMapping.type === 'static') {
            value = fieldMapping.value
            console.debug(`Returning static ${value}`)
        } 

        if (fieldMapping.type === 'userAddress') {
            value = getAccount()
            console.log(`Returning mapped ${value}`)
        }

        // If value is json we return a tuple
        if (isJson(value)) {
            value = JSON.parse(value)
        }

        return value
    }
  
    this.getAttributes = () => {
        const method = props.payload.method
        const requiredAttributes = method.inputs.map((input) => input.name)
        const args = []
        // Function args
        requiredAttributes.forEach((required) => args.push(this.getValue(required)))
        console.debug(`Attributes to pass ${JSON.stringify(args)}`)
        return args
    }

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

    this.onClick = (action=false) => {
        // We are connected
        const scope = this
        validateNetwork(props.payload.network, () => {
            setComponentText(scope.id, props.activeLabel)
            if (props?.payload?.contractAddress && action) {
                // Try calling smart contract
                scope.invokeMethod()
            }
        })
    }

    this.onConnect = (provider) => {
        window.walletProvider = provider
        window.walletProvider.on(EVENT.CONNECTED, this.onConnectedEvent)
        window.walletProvider.on(EVENT.DISCONNECTED, this.onDisconnectedEvent)
        window.walletProvider.on(EVENT.NETWORK_CHANGED, this.onNetworkChangedEvent)
        window.walletProvider.on(EVENT.ACCOUNT_CHANGED, this.onAccountChangedEvent)
        window.walletProvider.on(EVENT.CHAIN_CHANGED, this.onChainChangedEvent)
        this.onConnectEvent()
        this.onClick()
    }

    this.connect = () => {
        try {
            const modal = this.getModal()
            modal.connect().then(this.onConnect)
        } catch (e) {
            console.debug("Could not get a wallet connection", e)
            onErrorMessage(e.message)
        }
    }

    this.disconnect = () => {
        console.log("Disconnecting wallet", walletProvider)
        document.dispatchEvent(new Event(EVENT.DISCONNECTED, walletProvider))
        try {
            localStorage.removeItem(CACHE);
            localStorage.clear();
            window.walletProvider = null
            this.getModal()?.clearCachedProvider();
        } catch (e) {
            console.log("Could not disconnect wallet completly", e)
            onErrorMessage(e.message)
        } finally {
            setComponentText(this.id, props.label || CONNECT_WALLET)
        }
    }

    this.getModal = () => {
        const infuraKey = props.infuraKey || process.env.REACT_APP_INFURA_API_KEY
        const providerOptions = getProviderOptions(infuraKey)
        const modal = new Web3Modal({
            cacheProvider: true,
            providerOptions,
            disableInjectedProvider: false
        })
        return modal
    }

    this.handleToggleConnect = () => {
        const isConnected = getAccount()
        const hasActionDefined = props?.payload?.contractAddress
        if (isConnected && !hasActionDefined) {
            // Disconnect
            this.disconnect()
        } else if (window.walletProvider) {
            this.onClick(true)
        } else {
            this.connect()
        }
    }

    this.initialize = () => {
        console.debug(`Component ${this.id} init`)
        setComponentText(this.id, props.label || CONNECT_WALLET)
        console.debug(`Adding click event listener for ${this.id}`)
        getComponent(this.id).addEventListener(EVENT.CLICK, this.handleToggleConnect)
        const cachedProvider = getCachedProvider()
        if (cachedProvider) {
            this.connect()
        }
    }

    this.initialize()
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
  