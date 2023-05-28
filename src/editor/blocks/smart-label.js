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
