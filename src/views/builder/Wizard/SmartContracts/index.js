import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Networks from './Networks'
import ContractType from './ContractType'
import ContractAddress from './ContractAddress'
import FunctionPicker from './FunctionPicker'
import ParameterMapping from './ParameterMapping'

const SmartContracts = ({ element, intl }) => {
    const [payload, setPayload] = useState(element?.props()?.payload)
    const fns = payload?.contract?.abi.filter((item) => item.type==='function' && (item.stateMutability.includes('payable')))

    useEffect(() => {
        setPayload(element?.props()?.payload)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        element.getTrait('payload').set({value: payload})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload])

    const handleNetworkChange = (network) => {
        const newPayload = {...payload}
        newPayload.network = network
        setPayload(newPayload)
    }

    const handleContractTypeChange = (contractType) => {
        const newPayload = {...payload}
        newPayload.contract = contractType
        setPayload(newPayload)
    }

    const handleContractAddressChange = (address) => {
        const newPayload = {...payload}
        newPayload.contractAddress = address
        setPayload(newPayload)
    }

    const handleFunctionPick = (fn) => {
        const newPayload = {...payload}
        newPayload.method = fn
        setPayload(newPayload)
    }

    const handleParameterChangeMapping = (input, value) => {
        const newPayload = {...payload}
        if (!newPayload.mapping) {
            newPayload.mapping = {}
        }
        newPayload.mapping[input.name] = {
            ...payload.mapping,
            ...value
        }
        setPayload(newPayload)
    }

    const handleParameterChangeValue = (input, value) => {
        const newPayload = {...payload}
        if (!newPayload.defaultValue) {
            newPayload.defaultValue = {}
        }
        newPayload.defaultValue[input.name] = value
        setPayload(newPayload)
    }

    return (
        <Grid container spacing={3}>            
            <Networks value={payload?.network?.chainId} onChange={handleNetworkChange} intl={intl} />
            <ContractType value={payload?.contract?.name} onChange={handleContractTypeChange} intl={intl} />
            <ContractAddress value={payload?.contractAddress} onChange={handleContractAddressChange} intl={intl} />
            <FunctionPicker value={payload?.method?.name} onChange={handleFunctionPick} intl={intl} functionList={fns} />
            <ParameterMapping   value={payload?.method?.name} 
                                inputs={payload?.method?.inputs} 
                                onChangeValue={handleParameterChangeValue} 
                                onChangeMapping={handleParameterChangeMapping} 
                                intl={intl} 
                                mapping={payload?.mapping} 
                                defaultValue={payload?.defaultValue}
            /> 
        </Grid>
    )
}

export default SmartContracts
