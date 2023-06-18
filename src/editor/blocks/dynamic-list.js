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


          const scope = this;






          //     // Get properties
          //     const { body, endpoint, web3Signature } = props
          //     const scope = this;

          //     this.getComponent = () => {
          //       return document.getElementById(this.id)
          //     }

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

              this.getContext = (element) => {
                let actionContext = {}
                const mappedItems = element.parentElement.querySelectorAll('[title]')
                console.log(mappedItems)
                mappedItems.forEach((el) => {
                  console.log(el.attributes.title.value)
                  actionContext[el.attributes.title.value] = el.innerText;
                  // const textItems = node.querySelectorAll('[title]'); 

                })
                console.log(actionContext)
                return actionContext
              }

              this.parseBody = (element, body) => {
                // Check if using map values and find the context
                const parsed = {}
                const jsonBody = JSON.parse(body)
                const paramContext = this.getContext(element)
                Object.keys(jsonBody).forEach((key) => {
                  const value = jsonBody[key]
                  if (value.startsWith('_')) {
                    parsed[key] = paramContext[value.replace('_','')]
                  } else {
                    parsed[key] = value
                  }
                })
                // console.log('Parsed value')
                // console.log(parsed)
                return parsed
              }

              this.post = (element, body={}, headers={}, endpoint, wasParsed=false) => {
                // console.log("POSTing to "+endpoint)
                const parsedBody = wasParsed ? body : this.parseBody(element, body)
                fetch(endpoint, { method: "POST", headers, body: JSON.stringify(parsedBody) })
                .then((r) => scope.sendNotification('success', 'Request sent', null, 5000))
                .catch((e) => scope.sendNotification('error', e.message, null, 5000));
              }

              this.signedPost = (element, body, headers, endpoint) => {
                console.log("Doing signed POST")
                const wallet = new window.ethers.providers.Web3Provider(window.walletProvider)
                const signer = wallet.getSigner()

                // Sign
                
                const parsedBody = this.parseBody(element, body)
                signer.signMessage(JSON.stringify(parsedBody)).then((signature) =>{
                  // Invoke POST
                  const allHeaders = { ...headers, signature }
                  scope.post(element, parsedBody, allHeaders, endpoint, true)
                }).catch((e) => {
                    console.log(e)
                    scope.sendNotification('error', e.message, null, 5000)
                })
              }

              this.onClick = (e) => {
                const element = e.target;
                const endpoint = element.getAttribute('endpoint')
                const web3Signature = element.hasAttribute('web3signature')
                const body = element.getAttribute('body')
                // console.log(`Signed request? ${web3Signature}`)
                // console.log(`Target endpoint ${endpoint}`)
                // console.log(`Payload ${body}`)
                  if (endpoint) {
                    try {
                      console.log(web3Signature)
                      if (web3Signature) {
                        this.signedPost(element, body, {}, endpoint)
                      } else {
                        this.post(element, body, {}, endpoint, false)
                      }
                    } catch (e) {
                      this.sendNotification('error', e.message)
                    }
                  } else {
                    this.sendNotification('error', 'Button endpoint not configured')
                  }
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

        this.getComponent = () => {
            // console.log(this.id)
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

          this.cloneNode = (original, index) => {
            // We clone and change ids
            const cloned = original.cloneNode(true)
            cloned.id = `${cloned.id}${index}`
            const children = cloned.querySelectorAll("*");
            // console.log(children)
            children?.forEach((child) => child.id = `${child.id}${index}`)
            return cloned
          }

          this.buildChildNodes = (items) => {

            const prototype = this.getPrototypeNode();

            this.resetContent();
            items?.forEach((item, index) => {
                // Skip first component since we are gonna modify the mapping
                let node;
                if (index !== 0) {
                    node = scope.cloneNode(prototype, index);
                    scope.getComponent().appendChild(node);
                } else {
                    node = scope.getPrototypeNode();
                }
                
                // Fill content
                const textItems = node.querySelectorAll('[title]'); 
                // console.log(textItems)
                textItems?.forEach((x) => {
                    x.textContent=item
                })

                // Set CTA
                try {
                  const cta = node.querySelectorAll('button')[0]; 
                  // console.log(cta)
                  cta.addEventListener("click", this.onClick)
                } catch (e) {
                  console.log(`No CTA`)
                }

            })
            
          };

          const evalCondition = () => {
      
            if(!props.networkUrl || !props.abi || !props.method) return;
        
            // console.log("Evaling")
            // const provider = this.getProvider()
            const signer = this.getSigner()
            const abi = JSON.parse(props.abi)

            // console.log(signer)
            // console.log(abi)
      
            const contract = new ethers.Contract(
              props.contractAddress,
              abi,
              signer
            )
          
            
            const attrs = [props.attr1, props.attr2, props.attr3, props.attr4, props.attr5, props.attr6].filter((n) => n)
            const fn = contract[props.method]
      
            const scope = this
            // console.log(attrs)
            fn.apply(null, attrs)
                      .then((response) => {
                          console.log(`Response received ${response}`);
                          // console.log(response)
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
  