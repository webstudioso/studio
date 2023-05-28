/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "smart-label";

  const block = {
    id: `section-${componentId}`,
    media: `
      <p class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
        This is a smart label
      </p>
    `,
    category: "Web3",
    content: `
      <p class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
          This is a smart label
        </p>`,
  };

  const script = function (props) {

    this.getComponent = () => {
      return document.getElementById(this.id)
    }
  
    const evalCondition = () => {

      if(!props.networkUrl || !props.abi || !props.method) return;
  
      console.log("Evaling")
      const provider = new ethers.providers.JsonRpcProvider(props.networkUrl)

      const contract = new ethers.Contract(
        props.contractAddress,
        JSON.parse(props.abi),
        provider
      )
    
      const attrs = [props.attr1, props.attr2, props.attr3, props.attr4, props.attr5, props.attr6].filter((n) => n)
      const fn = contract[props.method]

      const scope = this
      fn.apply(null, attrs)
                .then((response) => {
                    console.log(`Response received ${response}`);
                    const finalResponse = props.format ?
                    ethers.utils.formatEther(response) :
                    response;
                    scope.getComponent().innerHTML = finalResponse;
                }, (error) => {
                    console.log(`Error received ${error}`);
                    
                });

    };

    document.addEventListener("Connected", () => evalCondition());
    document.addEventListener("accountsChanged", () => evalCondition());
    document.addEventListener("chainChanged", () => evalCondition());
    document.addEventListener("networkChanged", () => evalCondition());
    document.addEventListener("onDisconnect", () => evalCondition());
    document.addEventListener("onToast", () => evalCondition())

    evalCondition();
  };

  const properties = {
    isComponent: (el) => el.tagName === 'P',
    model: {
      defaults: {
        script,
        contractAddress: "0xDF8aDad4f4057da3b9C25B2e96Ad4A1b90fb1545",
        networkUrl: "https://rpc.ankr.com/polygon_mumbai",
        abi: `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"campaign","outputs":[{"internalType":"uint256","name":"fundingGoal","type":"uint256"},{"internalType":"uint256","name":"sharedReturnPercentage","type":"uint256"},{"internalType":"string","name":"campaignName","type":"string"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"fundingPeriodEndTime","type":"uint256"},{"internalType":"uint256","name":"campaignEndTime","type":"uint256"},{"internalType":"string","name":"nftMetadataIPFSHash","type":"string"},{"internalType":"bool","name":"distributionLocked","type":"bool"},{"internalType":"bool","name":"nftMinted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fund","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"funders","outputs":[{"internalType":"uint256","name":"donatedAmount","type":"uint256"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fundersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"fundersIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fundingGoal","type":"uint256"},{"internalType":"uint256","name":"_sharedReturnPercentage","type":"uint256"},{"internalType":"string","name":"_campaignName","type":"string"},{"internalType":"uint256","name":"_fundingPeriodInDays","type":"uint256"},{"internalType":"uint256","name":"_campaignDurationInDays","type":"uint256"},{"internalType":"string","name":"_nftMetadataIPFSHash","type":"string"}],"name":"setupCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalFundedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`,
        method: 'admin',
        traits: [
          {
            changeProp: 1,
            type: "text",
            name: "contractAddress",
          },
          {
            changeProp: 1,
            type: "text",
            name: "networkUrl",
          },
          {
            changeProp: 1,
            type: "text",
            name: "abi",
          },
          {
            changeProp: 1,
            type: "text",
            name: "method",
          },
          {
            changeProp: 1,
            type: "text",
            name: "format",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr1",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr2",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr3",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr4",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr5",
          },
          {
            changeProp: 1,
            type: "text",
            name: "attr6",
          }
        ],
        "script-props": ["contractAddress","abi", "networkUrl", "method", "format", "attr1","attr2","attr3","attr4","attr5","attr6"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
