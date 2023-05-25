/*eslint no-undef: "off"*/
const Plugin = (editor) => {
    const componentId = "web-button";
  
    const classes = 'cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    
    const content = `
      <span type="button" class="${classes}" id="${componentId}">
        Web3 Button
      </span>
    `
    const block = {
      id: `section-${componentId}`,
      media: content,
      category: "Web3",
      content,
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
        CONNECT_WALLET: 'Connect'
      }
    
      const {
        EVENT,
        CACHE,
        SEVERITY,
        CONNECT_WALLET,
      } = this.constants
    
      const { 
          Web3Modal, 
          WalletConnectProvider
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
      const infuraKey = props.infuraKey || process.env.REACT_APP_INFURA_API_KEY
      console.log(`Infura ${infuraKey}`)
      this.getProviderOptions = () => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: infuraKey
                }
            }
        }
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
          const button = this.getComponent()
          button.textContent = text
      }
    
      this.handleGetAddress = (address) => {
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
          const fieldMapping = props.payload.mapping[field]
          let value;
          if (fieldMapping.type === 'static') {
            value = fieldMapping.value
            console.log(`Returning static ${value}`)
          } 

          if (fieldMapping.type === 'userAddress') {
            value = this.getAccount()
            console.log(`Returning mapped ${value}`)
          }

          // If value is json we return a tuple
          if (this.isJson(value)) {
            value = JSON.parse(value)
          }

          return value
        }
      
        this.getAttributes = () => {
            const method = props.payload.method;
            const requiredAttributes = method.inputs.map((input) => input.name);
            const args = [];
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
          const signer = this.getSigner();
          const abi = this.getAbi();
          const method = props.payload.method;
          const contract = new ethers.Contract(props.payload.contractAddress, abi, signer);
          const targetFunction = contract[method.name];
          return targetFunction;
      }

      this.invokeMethod = () => {
        if (!props.payload.method) return;
        const targetFunction = this.getFunction()
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
          const modal = this.getModal()
          modal.connect().then(this.onConnect)
        } catch (e) {
          console.log("Could not get a wallet connection", e)
          this.sendNotification(SEVERITY.ERROR, e.message, null, 5000)
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
        if (window.walletProvider) {
          const chainId = ethers.utils.hexValue(props.payload.network.chainId).trim()
          const scope = this
          window.walletProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          }).then(() => {
            scope.invokeMethod()
          }).catch((switchError) => {
            const network = props.payload.network
            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              window.walletProvider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                      chainId: chainId, 
                      chainName: network.name,
                      rpcUrls: network.rpc,                   
                      blockExplorerUrls: network.explorers,  
                      nativeCurrency: network.nativeCurrency
                    }
                ]});
            } else {
              const errMsg = "Cannot switch to the network";
              console.log(errMsg)
              this.sendNotification(SEVERITY.ERROR, errMsg, null, 5000)
            }
          });
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
            label: "Connect",
            activeLabel: "Send",
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
                {
                  changeProp: 4,
                  type: "Text",
                  name: "infuraKey"
                },
            ],
            "script-props": ["payload", "label", "activeLabel", "infuraKey"],
        },
      },
    };
  
    editor.BlockManager.add(componentId, block);
    editor.DomComponents.addType(componentId, properties);
  };
  
  export default Plugin;
  