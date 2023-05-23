/*eslint no-undef: "off"*/
const Plugin = (editor) => {
    const componentId = "web-button";
  
    const classes = 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    
    const block = {
      id: `section-${componentId}`,
      label: `
        <span type="button" class="${classes}" id="${componentId}">
          Connect
        </span>
      `,
      category: "Web3",
      content: `
          <span type="button" class="${classes}" id="${componentId}">
            Connect
          </span>
      `,
    };
  
    const script = function (props) {

      this.constants = {
        CACHE: 'WEB3_CONNECT_CACHED_PROVIDER',
        EVENT: {
            CLICK: 'click',
            CONNECTED: 'Connected',
            ACCOUNT_CHANGED: 'accountsChanged',
            CHAIN_CHANGED: 'chainChanged',
            NETWORK_CHANGED: 'networkChanged',
            TOAST: 'onToast',
            DISCONNECTED: 'onDisconnect'
        },
        SEVERITY: {
          ERROR: 'error'
        },
        SCOPE: 'openid wallet',
        CONNECT_WALLET: 'Connect'
      }
    
      const {
        EVENT,
        CACHE,
        SEVERITY,
        CONNECT_WALLET,
        SCOPE
      } = this.constants
    
      const { 
          Web3Modal, 
          WalletConnectProvider,
          UAuthWeb3Modal,
          UAuthSPA
      } = window.webstudio
    
      const {
        ethers
      } = window
    
      this.getComponent = () => {
        return document.getElementById(this.id)
      }

  
      this.sendNotification = (alertSeverity, message, link, timeout) => {
          const detail = { 
              detail: { 
                  alertSeverity, 
                  message, 
                  link,
                  timeout
              }
          };
          const cEvent = new CustomEvent('onToast', detail)
          document.dispatchEvent(cEvent);
      }

    
      this.originalText = this.getComponent()?.textContent || CONNECT_WALLET;
    
      this.getProviderOptions = () => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: 'af44aafb86bd4af08ccc104a0423c014',
                    // rpc: {
                        // 1: `https://mainnet.infura.io/v3/af44aafb86bd4af08ccc104a0423c014`,
                        // 42: `https://kovan.infura.io/v3/af44aafb86bd4af08ccc104a0423c014`,
                        // 137: `https://polygon-mainnet.infura.io/v3/af44aafb86bd4af08ccc104a0423c014`,
                        // 80001: "https://matic-mumbai.chainstacklabs.com",
                    // }
                }
            }
        }
        // Unstoppable Domains support?
        // if (props.udAppId) {
        //     providerOptions["custom-uauth"] = {
        //         display: UAuthWeb3Modal.display,
        //         connector: UAuthWeb3Modal.connector,
        //         package: UAuthSPA,
        //         options: {
        //           clientID: props.udAppId,
        //           scope: SCOPE,
        //           redirectUri: props.udCallback
        //         },
        //     }
        // }
        return providerOptions
      }

    
      this.onConnect = (provider) => {
          window.walletProvider = provider;
          document.dispatchEvent(new Event(EVENT.CONNECTED, window.walletProvider));
          this.setupProviderListeners()
          this.fetchAccountData()
      }
    
      this.handleAccountChanged = (accounts) => {
          document.dispatchEvent(new Event(EVENT.ACCOUNT_CHANGED, accounts))
          this.fetchAccountData()
      }
    
      this.handleChainChanged = (chainId) => {
          document.dispatchEvent(new Event(EVENT.CHAIN_CHANGED, chainId))
          this.fetchAccountData()
      }
    
      this.handleNetworkChanged = (networkId) => {
          document.dispatchEvent(new Event(EVENT.NETWORK_CHANGED, networkId))
          this.fetchAccountData()
      }
    
      this.setupProviderListeners = () => {
          window.walletProvider.on(EVENT.ACCOUNT_CHANGED, this.handleAccountChanged)
          window.walletProvider.on(EVENT.CHAIN_CHANGED, this.handleChainChanged)
          window.walletProvider.on(EVENT.NETWORK_CHANGED, this.handleNetworkChanged)
      }
    
      this.setButtonText = (text) => {
        console.log(`Setting text ${text}`)
          const button = this.getComponent()
          button.textContent = text
      }
    
      this.handleGetAddress = (address) => {
          // const parsedAddress = this.formatAddress(address)
          // this.setButtonText(parsedAddress)
          this.setButtonText(props.activeLabel)
      }
    
      this.fetchAccountData = () => {
          const wallet = new ethers.providers.Web3Provider(window.walletProvider)
          const signer = wallet.getSigner()
          signer.getAddress().then(this.handleGetAddress);
      }
    

    
      this.sendNotification = (alertSeverity, message, link, timeout) => {
        const detail = { 
            detail: { 
                alertSeverity, 
                message, 
                link,
                timeout
            }
        }
        const cEvent = new CustomEvent(EVENT.TOAST, detail)
        document.dispatchEvent(cEvent)
      }
    
      this.disconnect = () => {
        console.log("Disconnecting wallet", window.walletProvider)
        document.dispatchEvent(new Event(EVENT.DISCONNECTED, window.walletProvider))
        try {
            localStorage.removeItem(CACHE);
            localStorage.clear();
            window.walletProvider = null
            this.getModal()?.clearCachedProvider();
        } catch (e) {
            console.log("Could not disconnect wallet completly", e)
            this.sendNotification(SEVERITY.ERROR, e.message, null, 5000)
        } finally {
            this.setButtonText(this.props.label)
        }
      }

      this.getAccount = () => {
        const provider = window.walletProvider;
        if (!provider) return;
  
        if (provider.accounts && provider.accounts.length > 0)
          return provider.accounts[0];
  
        return provider.selectedAddress;
    };
  
     this.isJson = (str) =>{
          try {
              const val = JSON.parse(str);
              if (val && typeof val === 'object')
                return true
          } catch (e) {
              console.log(e)
          }
          return false
      }
  
      this.getValue = (field) => {
        console.log(`Getting value....`)
        console.log(field)
        console.log(props.payload.mapping)
        const type = props.payload.mapping[field].value
        let value;
        console.log(props.payload.defaultValue)
        console.log(field)
        if (type === 'static') {
          value = props.payload.defaultValue[field]
          console.log(`Returning static ${value}`)
          // return value
        } 

        if (type === 'userAddress') {
          value = this.getAccount()
          console.log(`Returning mapped ${value}`)
          // return account
        }

        // console.log(value)
        // console.log(typeof value)
        // If value is json we return a tuple
        if (this.isJson(value)) {
        //   console.log("Value is an object, turn to tuple")
        //   console.log(value)
          const data = JSON.parse(value)
          return data
          const keys = Object.keys(data)
          console.log(keys)
          value = keys.map((key) => data[key])
          value = ("${value.join('","')}");
          console.log(`Is the final parsed value ${value}`)
        }

        return value
      }
    
      this.getAttributes = () => {
        const method = props.payload.method;
        const requiredAttributes = method.inputs.map((input) => input.name);
        const args = [];
        const component = this.getComponent();
        // Function args
        requiredAttributes.forEach((required) => args.push(this.getValue(required)));

        console.log(`Attributes to pass ${JSON.stringify(args)}`)
        return args;
    }

    this.getProvider = () => {
      const provider = new ethers.providers.Web3Provider(window?.walletProvider);
      return provider;
    }

    this.getSigner = () => {
      const provider = this.getProvider();
      const signer = provider.getSigner();
      return signer;
    }

    this.getAbi = () => {
      return [props.payload.method];
    }

    this.getFunction = () => {
      console.log(`Getting function`)
      const signer = this.getSigner();
      const abi = this.getAbi();

      console.log(signer)
      console.log(abi)
      const method = props.payload.method;
      const contract = new ethers.Contract(props.payload.contractAddress, abi, signer);
      const targetFunction = contract[method.name];
      console.log(`getFunction ${targetFunction}`);
      return targetFunction;
  }

      this.invokeMethod = () => {
        if (!props.payload.method) return;

        const targetFunction = this.getFunction()
        console.log(`Invoking this/?`)
        console.log(targetFunction)
        // const targetFunction = props.payload.method.name
        const scope = this
        const tagetAttributes = this.getAttributes()
        targetFunction.apply(null, tagetAttributes)
                .then((response) => {
                    const explorers = props?.payload?.network?.explorers
                    const defaultExplorer = explorers && explorers.length > 0 ? explorers[0].url : ''
                    console.log(`Response received ${response}`);
                    console.log(`Using explorer ${defaultExplorer}`)
                    scope.sendNotification(
                        'success', 
                        'Your transaction was successful, view it on the explorer',
                        `${defaultExplorer}/tx/${response.hash}`,
                        10000
                    )
                }, (error) => {
                    console.log(`Error received ${error}`);
                    scope.sendNotification(
                        'error', 
                        error?.message,
                        null,
                        10000
                    )
                });
      }

      this.connect = () => {
        try {
          console.log(`Connecting wallet`)
          const modal = this.getModal()
          modal.connect().then(this.onConnect)
        } catch (e) {
          console.log("Could not get a wallet connection", e)
          this.sendNotification(SEVERITY.ERROR, e.message, null, 5000)
        }
      }

      this.handleToggleConnect = () => {
        console.log(window.walletProvider)
        if (window.walletProvider) {
          // this.disconnect()
          this.invokeMethod()
        } else {
          this.connect()
        }
      }
    
      this.getCachedProvider = () => {
        return localStorage.getItem(CACHE)
      }
    
          
      this.getModal = () => {
        const providerOptions = this.getProviderOptions()
        const modal = new Web3Modal({
          cacheProvider: true,
          providerOptions,
          disableInjectedProvider: false
        })
        return modal
    }

      this.handleToggleConnect = () => {
        console.log(window.walletProvider)
        if (window.walletProvider) {
          // this.disconnect()
          this.invokeMethod()
        } else {
          this.connect()
        }
      }

      this.initialize = () => {
        this.setButtonText(props.label || CONNECT_WALLET)
        this.getComponent().addEventListener(EVENT.CLICK, this.handleToggleConnect)
        const cachedProvider = this.getCachedProvider()
        if (cachedProvider) {
          this.connect()
        }
      }
    
      this.initialize()
    };
  
    const properties = {
      isComponent: (el) => el.id === componentId,
      model: {
        defaults: {
            script,
            payload: {},
            traits: [
                {
                  changeProp: 1,
                  type: "Text",
                  name: "label"
                },
                {
                  changeProp: 2,
                  type: "Text",
                  name: "activeLabel"
                },
                {
                changeProp: 3,
                type: "Text",
                name: "payload"
                },
            ],
            "script-props": ["payload", "label", "activeLabel"],
        },
      },
    };
  
    editor.BlockManager.add(componentId, block);
    editor.DomComponents.addType(componentId, properties);
  };
  
  export default Plugin;
  