export const parseNetworks = (networks) => {
    const parsedNetworks = networks.filter((network) => network?.rpc?.length > 0 && network?.explorers?.length > 0)
                                .map((network) => {
                                    return {
                                        chainId: network.chainId,
                                        name: network.name,
                                        currency: network.nativeCurrency.symbol,
                                        explorerUrl: network.explorers[0].url,
                                        rpcUrl: network.rpc[0].replace('${INFURA_API_KEY}', process.env.REACT_APP_INFURA_API_KEY)
                                    }
                                })
    return parsedNetworks
}