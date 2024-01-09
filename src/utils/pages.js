export const isHome = (page) => {
    return page?.attributes?.type === 'main'
}

export const getName = (page) => {
    return isHome(page) ? 'index' : page?.attributes?.name
}

export const getContractsInTemplate = (template) => {
    const contracts = template?.metadata?.contracts || []
    const inTemplate = Object.keys(contracts)
    console.log(`Contracts in template found ${inTemplate}`)
    return inTemplate
}

export const getContractsInMetadata = (metadata) => {
    console.log(metadata)
    const metadataKeys = Object.keys(metadata)
    const contractKeys = metadataKeys?.filter((key) => key.startsWith('webstudio:') && key.endsWith('_contract'))
    const items = contractKeys ? contractKeys?.map((key) => {
        return {
            key,
            value: metadata[key]
        }
    }) : []
    console.log(items)
    return items
}

export const getContractsInTemplateNotInProjectMetadata = ({ template, metadata }) => {
    // Contracts in template, not in project metadata
    const requiredContracts = getContractsInTemplate(template)
    const pendingContracts = requiredContracts.filter((required) => !(`webstudio:${required}_contract` in metadata))
    console.log(`Pending contracts ${pendingContracts}`)
    // return pendingContracts
    return requiredContracts
}