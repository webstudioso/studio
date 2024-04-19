/*eslint no-undef: "off"*/
const script = function (props={}) {

    const {
        ethers
    } = window?.webstudio

    const { 
        BrowserProvider, 
        Contract, 
        parseEther,
        encodeBytes32String
    } = ethers

    const {
        file,
        method,
        contract,
    } = props

    console.log(method)

    this.getComponent = () => {
        return document.getElementById(this.id);
    }

    this.initialize = () => {
        this.getComponent().addEventListener('submit', this.handleSubmit);
    }

    // this.sendNotification = (alertSeverity, message, link, timeout) => {
    //     const detail = { 
    //         detail: { 
    //             alertSeverity, 
    //             message, 
    //             link,
    //             timeout
    //         }
    //     };
    //     const cEvent = new CustomEvent('onToast', detail)
    //     document.dispatchEvent(cEvent);
    // }

    this.sendNotification = (alertSeverity, title, message, cta, ctaUrl) => {
        const detail = { 
            detail: { 
                alertSeverity,
                title,
                message,
                cta,
                ctaUrl,
            }
        };
        const event = new CustomEvent('onToast', detail)
        document.dispatchEvent(event)
    }

    this.formatToWei = (value) => {
        console.log(`formatToWei input received ${value} of type ${typeof value}`);
        const valueInput = typeof value === 'string' ? value : String(value);
        const parsedValue = parseEther(valueInput)?.toString();
        console.log(`formatToWei input ${value} to ${parsedValue} of type ${typeof parsedValue}`);
        return parsedValue;
    }

    this.formatToBytes32 = (value) => {
        const parsedValue = encodeBytes32String(value);
        console.log(`formatToBytes32 input ${value} to ${parsedValue}`);
        return parsedValue;
    }

    this.formatToUint256Array = (value) => {
        return value.split(',').map((val) => parseInt(val));
    }

    this.formatToBoolean = (value) => {
        return /^true$/i.test(value) || (value?.toLowerCase?.() === 'true') || (String(value).toLowerCase() === 'true');
    }

    this.getAccount = () => {
        const provider = window?.modal?.getWalletProvider();
        if (!provider) return;
  
        if (provider.accounts && provider.accounts.length > 0)
          return provider.accounts[0];
  
        return provider.selectedAddress;
    };

    this.getDefaultValue = (component, required) => {
        const attr = component.elements[required];
        // Default value?
        let defaultValue;
        const defaultContent = attr?.attributes?.defaultValue?.value;
        switch (defaultContent) {
            case 'userAddress':
                defaultValue = this.getAccount();
            break;
            default:
        }
        console.log(`Default value for ${required} is ${defaultValue}`);
        return defaultValue;
    }

    this.getValue = (component, required) => {
        console.log(`Requesting value for field name: ${required}`)
        const attr = component.elements[required];
        let value = attr.value || this.getDefaultValue(component, required);
        const format = attr?.attributes?.format?.value;
        // Does it require parsing?
        switch(format) {
            case 'toWei':
                value = this.formatToWei(value);
            break;
            case 'toBytes32':
                value = this.formatToBytes32(value);
            break;
            case 'toUint256[]':
                value = this.formatToUint256Array(value);
            break;
            case 'toBoolean':
                value = this.formatToBoolean(value);
            break;
            default:
                // Do nothing
                
        }
        console.log(`getValue for input ${required}`)
        console.log(value)
        return value
    }

    this.getAbi = () => {
        const content = JSON.parse(file?.content)
        console.log(`getAbi ${content}`)
        return content
    }

    this.getMethod = () => {
        const abiTgt = this.getAbi()
        const methodTgt = abiTgt.filter((item) => item.type === 'function')[method]
        console.log(`getMethod ${methodTgt?.name}`)
        return methodTgt;
    }

    this.getProvider = () => {
        const walletProvider = window?.modal?.getWalletProvider()
        const provider = new BrowserProvider(walletProvider)
        return provider;
    }

    this.getSigner = async () => {
        const provider = this.getProvider();
        const signer = await provider.getSigner();
        return signer;
    }

    this.getFunction = async () => {
        const signer = await this.getSigner();
        const abiTgt = this.getAbi();
        const methodTgt = this.getMethod();
        const contractTgt = new Contract(contract, abiTgt, signer);
        const targetFunction = contractTgt[methodTgt.name];
        console.log(`getFunction ${JSON.stringify(targetFunction)}`);
        return targetFunction;
    }

    this.parseMethodInputs = (methodTgt) => {
        return methodTgt?.inputs?.map((input) => input.name) || [];
    }

    this.getAttributes = () => {
        const methodTgt = this.getMethod();
        const requiredAttributes = this.parseMethodInputs(methodTgt);
        const args = [];
        const component = this.getComponent();
        console.log(`Attributes required ${requiredAttributes}`)
        // Function args
        requiredAttributes.forEach((required) => args.push(this.getValue(component, required)));
        const txOptions = this.getOptions(component)
        // TX args
        if (txOptions) {
            args.push(txOptions)
        }
        console.log(`Attributes to pass ${JSON.stringify(args)}`)
        return args;
    }

    this.isOptional = (attr) => {
        const isOptional = !!attr?.attributes?.txOption
        return isOptional
    }

    this.getOptions = (component) => {
        const attrs = Object.keys(component.elements)
        const args = {}
        attrs.forEach((attr) => {
            const field = component.elements[attr]
            if (this.isOptional(field)) {
                const fieldValue = this.getValue(component, attr)
                args[field.name] = fieldValue
            }
        })
        return args
    }

    this.handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            const targetFunction = await this.getFunction();
            const targetAttributes = this.getAttributes();
            const scope = this;
            console.log(`Invoking target function with attributes ${targetAttributes}, is function? ${targetFunction instanceof Function}`);
            targetFunction.apply(null, targetAttributes)
                .then((response) => {
                    console.log(`Response received ${JSON.stringify(response)}`);
                    scope.sendNotification(
                        'success',
                        'Successful!', 
                        'Your transaction was successful, view it on the explorer',
                        'View transaction in explorer',
                        `${window?.currentChain?.explorerUrl}/tx/${response.hash}`
                    )
                }, (error) => {
                    const errorMessage =    error?.reason ? error?.reason : 
                                            error?.data?.message ? error?.data?.message :
                                            error
                    console.log(`Error received ${error}`);
                    scope.sendNotification(
                        'error',
                        'Something Went Wrong!', 
                        errorMessage
                    )
                });
        } catch (error) {
            console.log(`Method call failed received ${error}`);
            this.sendNotification(
                'error',
                'Something Went Wrong!', 
                error?.message
            )
        }
    }

    this.initialize();
    return this;
};

export default script;