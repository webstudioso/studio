import { loadSupportedNeworks } from 'api/networks';
import axios from 'axios'

jest.mock('axios')

describe('Networks api', () => {

    const list = [
        {
            name: 'Ropsten',
            chainId: 3,
            nativeCurrency: {
                symbol: 'C'
            },
            rpc:[
                'C'
            ],
            explorers: [
                {
                    url: 'C'
                }
            ]
        },
        {
            name: 'Ethereum Mainnet',
            chainId: 1,
            nativeCurrency: {
                symbol:'A'
            },
            rpc:[
                'A'
            ],
            explorers: [
                {
                    url: 'A'
                }
            ]
        },
        {
            name: 'Expanse Network',
            chainId: 2,
            nativeCurrency: {
                symbol: 'B'
            },
            rpc:[
                'B'
            ],
            explorers: [
                {
                    url: 'B'
                }
            ]
        },
        {
            name: 'Invalid RPC',
            chainId: 99,
            nativeCurrency: {
                symbol: 'X'
            },
            rpc:[],
            explorers: [
                {
                    url: 'X'
                }
            ]
        },
        {
            name: 'Invalid Explorers',
            chainId: 199,
            nativeCurrency: {
                symbol: 'X'
            },
            rpc:[
                'I'
            ],
            explorers: []
        },
      ]

    beforeAll(() => {
        axios.get.mockImplementation(() => Promise.resolve({ data: list }));
    })

    describe('loadSupportedNeworks', () => {
        it('Returns an ordered list of items that contain both explorers and rpc', async () => {
            expect(await loadSupportedNeworks()).toEqual([
                {
                    chainId: 1,
                    name: 'Ethereum Mainnet',
                    currency: 'A',
                    explorerUrl: 'A',
                    rpcUrl: 'A'
                },
                {
                    chainId: 2,
                    name: 'Expanse Network',
                    currency: 'B',
                    explorerUrl: 'B',
                    rpcUrl: 'B'
                },
                {
                    chainId: 3,
                    name: 'Ropsten',
                    currency: 'C',
                    explorerUrl: 'C',
                    rpcUrl: 'C'
                }
            ])
        })

        it('Returns an empty list if data is empty', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: null }));
            expect(await loadSupportedNeworks()).toEqual([])
        })
    })
})