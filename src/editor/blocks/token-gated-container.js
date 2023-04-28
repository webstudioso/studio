/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "token-gated-container";

  const block = {
    id: `section-${componentId}`,
    label: `
    <svg width="266" height="150" viewBox="0 0 266 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3_96)">
    <path d="M0 0H266V150H0V0Z" fill="white"/>
    <path d="M207.351 29H51.6493C49.6338 29 48 29.9857 48 31.2016V117.798C48 119.014 49.6338 120 51.6493 120H207.351C209.366 120 211 119.014 211 117.798V31.2016C211 29.9857 209.366 29 207.351 29Z" fill="white" stroke="#CBD5E0"/>
    <path d="M60 45.5C60 45.1022 60.298 44.7206 60.8285 44.4393C61.3589 44.158 62.0784 44 62.8286 44H123.171C123.922 44 124.641 44.158 125.172 44.4393C125.702 44.7206 126 45.1022 126 45.5C126 45.8978 125.702 46.2794 125.172 46.5607C124.641 46.842 123.922 47 123.171 47H62.8286C62.0784 47 61.3589 46.842 60.8285 46.5607C60.298 46.2794 60 45.8978 60 45.5Z" fill="#4A5568"/>
    <path d="M122 74C122 73.4696 122.181 72.9609 122.502 72.5858C122.824 72.2107 123.26 72 123.714 72H160.286C160.74 72 161.176 72.2107 161.498 72.5858C161.819 72.9609 162 73.4696 162 74C162 74.5304 161.819 75.0391 161.498 75.4142C161.176 75.7893 160.74 76 160.286 76H123.714C123.26 76 122.824 75.7893 122.502 75.4142C122.181 75.0391 122 74.5304 122 74Z" fill="#6366F1"/>
    <path d="M148 76C148.796 76 149.559 76.0542 150.121 76.1506C150.684 76.2471 151 76.3779 151 76.5143L151 87.4857C151 87.6221 150.684 87.7529 150.121 87.8494C149.559 87.9458 148.796 88 148 88C147.204 88 146.441 87.9458 145.879 87.8494C145.316 87.7529 145 87.6221 145 87.4857L145 76.5143C145 76.3779 145.316 76.2471 145.879 76.1506C146.441 76.0542 147.204 76 148 76Z" fill="#6366F1"/>
    <circle cx="116" cy="75" r="10.5" fill="white" stroke="#6366F1" stroke-width="5"/>
    </g>
    <defs>
    <clipPath id="clip0_3_96">
    <rect width="266" height="150" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `,
    category: "Token Gates",
    content: `
      <div id=${componentId}>
        <span>This is a token gated container. Add content inside and then remove this text.</span>
      </div>
      <style>
          #${componentId} {
            min-width: 100px;
            min-height: 50px;
          }
      </style>
    `,
  };

  const script = function (props) {
    const componentId = "token-gated-container";
    console.log(`Running script ${componentId}`);
    if (!props.contract) return;

    const abi = [
      {
        constant: true,
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "accounts",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          }
        ],
        "name": "balanceOfBatch",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    const getAccount = () => {
      const provider = window.walletProvider;
      if (!provider) return;

      if (provider.accounts && provider.accounts.length > 0)
        return provider.accounts[0];
      
      return provider.selectedAddress;
    };
  
    const evalCondition = () => {
      hide();
      if (!window.walletProvider) return false;
      let numericBalance = 0;

      // Retrieve account
      try {
        const provider = new ethers.providers.Web3Provider(window.walletProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contract, abi, signer);
        const account = getAccount();

        switch(props.asset) {
          case 'erc721':
            contract.balanceOf(account).then((balance) => {
              numericBalance = balance.toNumber();
              if (numericBalance > 0) {
                show();
              }    
            });
            break
          case 'erc1155':
            const accounts = [account];
            const tokens = props.tokenIds.split(",");
            contract.balanceOfBatch(accounts, tokens).then((balances) => {
              const numBalances = balances.map((balance) => balance.toNumber());
              const positiveBalances = numBalances.find((item) => item > 0);
              console.log(`Current balance ${positiveBalances} for tokens ${tokens}`);
              if (positiveBalances) {
                show();
              }    
            });
            break;
          default:
            console.log('Not supported');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const hide = () => {
      if (!props.isEdit)
        $(`#${componentId}`).css("display", "none");
    };

    const show = () => {
      if (!props.isEdit)
        $(`#${componentId}`).css("display", "block");
    };

    document.addEventListener("Connected", () => evalCondition());
    document.addEventListener("accountsChanged", () => evalCondition());
    document.addEventListener("chainChanged", () => evalCondition());
    document.addEventListener("networkChanged", () => evalCondition());
    document.addEventListener("onDisconnect", () => hide());

    evalCondition();
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        contract: "0x93FF8c6E074a97d60328a6823633b6dE93Da8F55",
        isEdit: true,
        traits: [
          {
            changeProp: 1,
            type: "select",
            name: "asset",
            options: [
              { id: "erc721", name: "ERC721" },
              { id: "erc1155", name: "ERC1155" }
            ],
          },
          {
            changeProp: 1,
            type: "text",
            name: "contract",
          },
          {
            changeProp: 1,
            type: "text",
            name: "tokenIds",
          },
          {
            type: "checkbox",
            label: "Edit Mode",
            name: "isEdit",
            changeProp: 2,
          },
        ],
        "script-props": ["asset","contract", "tokenIds", "isEdit"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
