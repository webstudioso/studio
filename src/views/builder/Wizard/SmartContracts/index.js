import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Networks from './Networks'
import ContractType from './ContractType'
import ContractAddress from './ContractAddress'
import FunctionPicker from './FunctionPicker'
import ParameterMapping from './ParameterMapping'
import AbiUpload from './AbiUpload'
import { showError } from 'utils/snackbar'
import { useDispatch } from 'react-redux'

const SmartContracts = ({ element, intl }) => {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState(element?.props()?.payload)
    const fns = payload?.contract?.abi?.filter((item) => item.type==='function' && (item.stateMutability.includes('payable')))

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

    const handleContractTypeChange = (contract) => {
        const newPayload = {...payload}
        newPayload.contract = contract
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
        // Load default mapping if any
        newPayload.mapping = payload?.contract?.mapping && payload?.contract?.mapping[fn.name] ? 
            payload?.contract?.mapping[fn.name] : 
            {}
        setPayload(newPayload)
    }

    const handleParameterChangeMapping = (input, type) => {
        const newPayload = {...payload}
        if (!newPayload.mapping[input.name])
            newPayload.mapping[input.name] = {}
        newPayload.mapping[input.name].type = type
        setPayload(newPayload)
    }

    const handleParameterChangeValue = (input, value) => {
        const newPayload = {...payload}
        if (!newPayload.mapping[input.name])
            newPayload.mapping[input.name] = {}
        newPayload.mapping[input.name].value = value
        setPayload(newPayload)
    }

    const handleUploadABI = (e) => {
        let files = e.target.files
        let file = files[0]
        let reader = new FileReader()
        reader.addEventListener('load', (event) => {
            try {
                const abi = JSON.parse(event.target.result)
                const newPayload = {...payload}
                newPayload.contract.abi = abi
                setPayload(newPayload)
            } catch(error) {
                console.log(error)
                showError({ dispatch, error})
            }
         
        })
        reader.readAsText(file)
    }

    return (
        <Grid container spacing={3} paddingTop={2}>            
            <Networks value={payload?.network?.chainId} onChange={handleNetworkChange} intl={intl} />
            <ContractType   value={payload?.contract?.name} 
                            onChange={handleContractTypeChange} 
                            intl={intl} />
            {payload?.contract?.id === 'custom' && (
                <AbiUpload intl={intl} onChange={handleUploadABI} />
            )}
            <ContractAddress value={payload?.contractAddress} onChange={handleContractAddressChange} intl={intl} />
            {fns && fns.length > 0 && (
                <FunctionPicker value={payload?.method?.name} 
                                onChange={handleFunctionPick} 
                                intl={intl} 
                                functionList={fns} />
            )}
            {payload?.method?.inputs && payload?.method?.inputs?.length > 0 && (
                <ParameterMapping   value={payload?.method?.name} 
                                    inputs={payload?.method?.inputs} 
                                    onChangeValue={handleParameterChangeValue} 
                                    onChangeMapping={handleParameterChangeMapping} 
                                    intl={intl} 
                                    mapping={payload?.mapping} /> 
            )}
        </Grid>
    )
}

export default SmartContracts
