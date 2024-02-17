const datasource = {
    label: 'Datasource',
    name: 'datasource',
    type: 'select',
    options: [
        {value: 'none', name: 'None'},
        {value: 'smart_contract', name: 'Smart Contract'}
    ]
}

const format = {
    label: 'Format',
    name: 'format',
    type: 'select',
    options: [
        {value: 'none', name: 'None'},
        {value: 'formatEther', name: 'formatEther'}
    ]
}

const abi = {
    name: 'file', 
    type: 'file', 
    label: 'ABI'
}

const contract = {
    name: 'contract'
}

const method = {
    label: 'Method',
    name: 'method',
    type: 'select',
    options: []
}

const Plugin = (editor) => {

    const textTrait = editor.DomComponents.getType("text")
    var _initialize = textTrait.model.prototype.initialize;

    textTrait.model.prototype.renderTraits = function(component) {
        const traits = this.get("traits")

        traits.add(datasource)

        if (this.get("attributes").datasource === "smart_contract") {
            traits.add(contract)
            traits.add(abi)
            traits.add(method)
            traits.add(format)
    
    
    
            const abiTrait = traits.where({name:'file'})[0]
            const abiValue = abiTrait?.attributes?.value?.content ? JSON.parse(abiTrait?.attributes?.value?.content) : []
    
            var methodTrait = traits.where({name: 'method'})[0]
            const methods = abiValue?.filter((item) =>  item.type === 'function' && 
                                                        item.stateMutability === 'view' &&
                                                        item.inputs.length === 0 ) // This last condition to be removed when supported input mapping
            const options = methods.map((item, index) => {
                return { name: item.name, value: btoa(JSON.stringify(item)) }
            })
            methodTrait.set('options', options)
    
            // const methodValueOption = methodTrait?.attributes?.value ? options[methodTrait?.attributes?.value] : null
            // const inputs = methodTrait?.attributes?.value ? methods[methodTrait?.attributes?.value]?.inputs: []

    
            // const listedTraits = []
            // inputs?.forEach((input, index) => {
            //     const id = `input_${index}`
            //     traits.add({
            //         id,
            //         label: input.name  || ' '
            //     })
            //     listedTraits.push(id)
            // })

            // this.get("traits").models.forEach((trait) => {
            //     if (!listedTraits.includes(trait.id) && trait.id.startsWith('input_')) {
            //         // console.log("removing "+trait.id)
            //         traits.remove(trait.id)
            //     }
            // })
    
        } else {
            traits.remove('contract')
            traits.remove('file')
            traits.remove('method')
            traits.remove('format')
            // this.get("traits").models.forEach((trait) => {
            //     if (trait.id.startsWith('input_')) {
            //         // console.log("removing "+trait.id)
            //         traits.remove(trait.id)
            //     }
            // })
        }
        // console.log(traits)

        editor.TraitManager.render()
        // const methodAttrs = abiValue.inputs.find((input) => input.name ===)


        // // Initialize
        // if (!attributes.datasource) {
        //     traits.add(datasource)
        //     this.setAttributes({ datasource: 'none' })
        // }

        // if (attributes.datasource === 'smart_contract' && !attributes.contract) {
        //     traits.add(abi)
        // }
        // console.log(traits)
        // traits.add(datasource)
        // console.log(traits)
        // console.log("DETECTED CHANGE IN BUILDING")
        // console.log(a)
        // console.log(b)
        // console.log(c)
        // if (a?.changed?.attributes?.datasource === 'smart_contract') {

        //     this.get("traits").add(          {
        //         name: 'contract'
        //     });
    
        //       this.get("traits").add(          {
        //         name: 'file', 
        //         type: 'file', 
        //         label: 'ABI'
        //     });
    
        //     this.get("traits").add(          {
        //         label: 'Method',
        //         name: 'method',
        //         type: 'select',
        //         options: []
        //     });
        //     this.get("traits").remove('test')
        // } else {
        //     // this.get("traits").remove('contract')
        //     // this.get("traits").remove('file')
        //     // this.get("traits").remove('method')
        // }
        // editor.TraitManager.render()
        // this.model.trigger('rerender')
    }

    textTrait.model.prototype.initialize = function() {
        _initialize.apply(this, arguments)
        // const traits = this.get("traits")
        // traits.add(datasource)
        //   this.setAttributes({"datasource":'none'})


        this.listenTo(this, 'change', this.renderTraits)
        this.renderTraits()
    }

}

export default Plugin