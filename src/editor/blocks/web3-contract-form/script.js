/*eslint no-undef: "off"*/
const script = function (props={}) {

    const {
        ethers
    } = window?.webstudio

    const { 
        BrowserProvider, 
        Contract, 
        parseUnits,
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

    this.formatToWei = (value) => {
        const valueInput = typeof value === 'string' ? value : String(value);
        const parsedValue = parseUnits(valueInput, "ether");
        console.log(`formatToWei input ${value} to ${parsedValue}`);
        return parsedValue;
    }

    this.formatToBytes32 = (value) => {
        const parsedValue = encodeBytes32String(value);
        console.log(`formatToBytes32 input ${value} to ${parsedValue}`);
        return parsedValue;
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
            default:
                // Do nothing
                
        }
        console.log(`getValue for input ${required} is ${value}`)
        return value
    }

    this.getAbi = () => {
        const content = JSON.parse(file?.content)
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
                    console.log(`Response received ${response}`);
                    scope.sendNotification(
                        'success', 
                        'Your transaction was successful, view it on the explorer',
                        `${window?.currentChain?.explorerUrl}/tx/${response.hash}`,
                        5000
                    )
                }, (error) => {
                    console.log(`Error received ${error}`);
                    scope.sendNotification(
                        'error', 
                        error?.message,
                        null,
                        5000
                    )
                });
        } catch (e) {
            console.log(`Method call failed received ${e}`);
            this.sendNotification(
                'error', 
                e,
                null,
                5000
            )
        }
    }

    this.initialize();
    return this;
};

export default script;