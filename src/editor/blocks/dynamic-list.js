/*eslint no-undef: "off"*/

const Plugin = (editor) => {
    const componentId = "dynamic-list";
  
    const block = {
      id: `section-${componentId}`,
      label: `
      <div>Dynamic List</div>
      `,
      category: "Web3",
      content: `
        <div id=${componentId} class="py-8">
          
        </div>
      `,
    };
  
    const script = function (props) {

        
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

        this.getComponent = () => {
            console.log(this.id)
            return document.getElementById(this.id)
          }
        
          this.getPrototypeNode = () => {
            const children = this.getComponent().getElementsByTagName('div');
            return children?.length > 0 ? children[0] : null;
          }

          this.resetContent = () => {
            const prototype = this.getPrototypeNode();
            this.getComponent().replaceChildren(prototype);
          }

          this.buildChildNodes = (items) => {

            const prototype = this.getPrototypeNode();
            const scope = this;
            items?.forEach((item, index) => {
                // Skip first component since we are gonna modify the mapping
                let node;
                if (index !== 0) {
                    node = prototype.cloneNode(true);
                    scope.getComponent().appendChild(node);
                } else {
                    node = scope.getPrototypeNode();
                }
                
                // // Fill content
                const textItems = node.querySelectorAll('[title]'); 
                console.log(textItems)
                textItems?.forEach((x) => {
                    x.textContent=item
                })

            })
            // children?.forEach(function(item){
            //   var cln = item.cloneNode(true);
            //   parent.appendChild(cln);
            // });
          };

          const evalCondition = () => {
      
            if(!props.networkUrl || !props.abi || !props.method) return;
        
            console.log("Evaling")
            // const provider = this.getProvider()
            const signer = this.getSigner()
            const abi = JSON.parse(props.abi)

            console.log(signer)
            console.log(abi)
      
            const contract = new ethers.Contract(
              props.contractAddress,
              abi,
              signer
            )
          
            this.resetContent();
            const attrs = [props.attr1, props.attr2, props.attr3, props.attr4, props.attr5, props.attr6].filter((n) => n)
            const fn = contract[props.method]
      
            const scope = this
            console.log(attrs)
            fn.apply(null, attrs)
                      .then((response) => {
                          console.log(`Response received ${response}`);
                          console.log(response)
                          scope.buildChildNodes(response)
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
      isComponent: (el) => el.id === componentId,
      model: {
        defaults: {
          script,
          networkUrl: 'https://rpc-mumbai.maticvigil.com',
          contractAddress: "0x79cCa3FDF91d83B2d98AFb22d36D7848892De72B",
          abi: `[
                {
                    "inputs": [],
                    "name": "list",
                    "outputs": [
                        {
                            "internalType": "string[]",
                            "name": "",
                            "type": "string[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]`,
            method: 'list',
          isEdit: true,
          traits: [
            {
                changeProp: 1,
                type: "text",
                name: "networkUrl",
            },
            {
                changeProp: 1,
                type: "text",
                name: "contractAddress",
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
          "script-props": ["networkUrl", "contractAddress","abi", "method", "attr1", "attr2", "attr3", "attr4", "attr5", "attr6"],
        },
      },
    };
  
    editor.BlockManager.add(componentId, block);
    editor.DomComponents.addType(componentId, properties);
  };
  
  export default Plugin;
  