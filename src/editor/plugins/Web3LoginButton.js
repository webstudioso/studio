const id = "w3m-button"

const block = {
    category: 'Web3',
    media: `
      <button class="bg-sky-600 text-white rounded-full font-semibold px-3 py-2">
        Connect Wallet
      </button>
    `,
    name: id,
    content: {
      tagName: id,
      type: id
    }
}
  
export const script = function (props) {

    const {
        projectId, // Get projectId at https://cloud.walletconnect.com
        name,
        description,
        url,
        icon,
        defaultNetworkId,
        themeMode,
        networks
    } = props

    const defaultNetwork = networks.find((network) => network.chainId.toString() === defaultNetworkId.toString())

    const { createWeb3Modal, defaultConfig } = window.webstudio.web3Modal
    const metadata = { name, description, url, icons: [icon] }
    
    window.networks = networks
    window.modal = createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [defaultNetwork],
        defaultChain: [defaultNetwork],
        projectId
    })
    window.modal.setThemeMode(themeMode)

    this.handleChange = ({ provider, providerType, address, chainId, isConnected }) => {
        console.log("Status changed!")
        window.currentChain = networks.find((network) => network.chainId === chainId)
        document.dispatchEvent(new CustomEvent('DataChanged'))
    }

    window.modal.subscribeProvider(this.handleChange)

    // Init datasource changes from SDK
    const { initializeDatasource } = window?.webstudio?.modules?.datasource
    if (initializeDatasource) 
      initializeDatasource()
}

export const getProperties = (networks) => {
  return {
    model: {
      defaults: {
          script,
          projectId: "8673e17dd1a8e64e757ef82b6198f800",
          name: 'Webstudio',
          description: 'Webstudio No-Code Web3 Platform',
          url: 'https://webstudio.so',
          icon: 'https://tse3.mm.bing.net/th?id=OIP.XFeasV5g0fiLQpPU0TaQawAAAA&pid=Api&P=0&h=180',
          themeMode: 'dark',
          defaultNetworkId: '1',
          networks,
          traits: [
              {
                changeProp: 1,
                type: "Text",
                name: "projectId",
                label: "WalletConnect Project ID"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "name",
                label: "Modal Name"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "description",
                label: "Modal Description"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "url",
                label: "Modal URL"
              },
              {
                changeProp: 1,
                type: "Text",
                name: "icon",
                label: "Modal Icon"
              },
              {
                label: 'Theme Mode',
                name: 'themeMode',
                type: 'select',
                options: [
                    {
                        name: 'Light', value: 'light'
                    },
                    {
                        name: 'Dark', value: 'dark'
                    }
                ],
                changeProp: 1
              },
              {
                  label: 'Default Network',
                  name: 'defaultNetworkId',
                  type: 'select',
                  options: networks.map((network) => { return { value: network.chainId, name: network.name } }),
                  changeProp: 1
              }
          ],
          "script-props": ["projectId", "name", "description", "url", "icon", "themeMode", "defaultNetworkId", "networks"],
      },
    }
  }
}

/*eslint no-undef: "off"*/
const Web3LoginButton = async (editor, options) => {
    const { supportedNetworks } = options
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, getProperties(supportedNetworks))
}

export default Web3LoginButton
  