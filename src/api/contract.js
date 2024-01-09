import { ethers } from 'ethers'
import { Magic } from 'magic-sdk'
// import contractByteCode from 'assets/contracts/blog/bytecode.json'
import contractAbi from 'assets/contracts/blog/abi.json'

const contractByteCode = "608060405234801561000f575f80fd5b506101438061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d919061009b565b60405180910390f35b610070600480360381019061006b91906100e2565b61007a565b005b5f8054905090565b805f8190555050565b5f819050919050565b61009581610083565b82525050565b5f6020820190506100ae5f83018461008c565b92915050565b5f80fd5b6100c181610083565b81146100cb575f80fd5b50565b5f813590506100dc816100b8565b92915050565b5f602082840312156100f7576100f66100b4565b5b5f610104848285016100ce565b9150509291505056fea26469706673582212207ca8a77a375aff548bc76892f6b2093ea5bec72e34f6638bcd6bc43f620679bc64736f6c63430008160033"

export const deployContract = async ({ project, contractInfo }) => {

    const {
        BrowserProvider,
        ContractFactory
    } = ethers

    const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY,{
        network: {
            rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
            chainId: 80001, // Polygon chain id
        }
    });
    // console.log(magic.rpcProvider)
    const provider = new BrowserProvider(magic.rpcProvider);

    const signer = await provider.getSigner();

    // const originalMessage = 'YOUR_MESSAGE';
    // const signedMessage = await signer.signMessage(originalMessage);
    // console.log(signedMessage)
    // const signer = await provider.getSigner();
    console.log(signer)

    // console.log(contractByteCode)
    // console.log(ethers)
    // console.log(ContractFactory)
    const {
        abi,
        bytecode
    } = contractInfo
    const cf = new ContractFactory(abi, bytecode, signer);

    console.log(abi)
    console.log(bytecode)

    const deployedContract = await cf.deploy('asdadsa', 'xxx');
    console.log("deployed....")
    console.log(deployedContract.target)

    return deployedContract.target
}