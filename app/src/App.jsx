import React, { useState, useEffect } from 'react' 
import {ethers} from 'ethers'; 
import contract  from './contract';
const contractAddress = contract.address;
const contractABI= contract.abi;
function App() { 
    const [isWeb3, setIsWeb3] = useState(false);
    const [provider, setProvider] =useState(null);
    const[contract,setContract]= useState(null);
    const [signer, setSigner] =useState(null);
    const [chainId, setChainId] = useState(0);
    const [acc, setAcc] = useState('');
    const [val, setVal] = useState(0);
    const [tokenBal, setTokenBal] = useState(0);
    const [tx, setTx] = useState()

    useEffect(()=>{
        if(typeof window.ethereum === "undefined"){
            return;
        }

        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);

        const newSigner = newProvider.getSigner();
        setSigner(newSigner);

        const newContract = new ethers.Contract(contractAddress,contractABI,newSigner);
        setContract(newContract);

        const getAcc  = async()=>{
            const accounts = await newProvider.listAccounts();
            if(accounts.length > 0){
                setAcc(accounts[0]);
            }
            
        };
        getAcc();
        const getTokenBal  = async()=>{
            console.log(acc)
            let tokenBal1 = await contract.balanceOf(acc);
            console.log(tokenBal1)
            tokenBal1 = ethers.utils.formatEther(tokenBal1)
            setTokenBal(tokenBal1)
        }
        getTokenBal();
        const getChainId = async()=>{
            const chainId = await newProvider.getNetwork().then(network=> network.chainId);
            setChainId(chainId);

        };
        getChainId();

        window.ethereum.on('chainChanged',handleChainChanged);

        window.ethereum.on('accountsChanged',handleAccountsChanged);
    },[]);

    async function handleChainChanged(){
        let chainId = await window.ethereum.request({method: 'eth_chainId'});
        chainId = parseInt(chainId,16);
        setChainId(chainId);
    }

    async function handleAccountsChanged(){
        let accounts = await window.ethereum.request({method: 'eth_accounts'});
        setAcc(accounts[0]);
    }
    
    const handleConnect = async()=>{
        try{
            await window.ethereum.request({method: "eth_requestAccounts"});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            alert("failed to connect");
        }
    }

    async function buyToken(){
        try{
            let val1 = val;
            val1 = ethers.utils.parseEther(val1);
            val1 = val1.toString();
            let rec = await contract.buyToken({value: val1, gasLimit: 500000});
            rec.wait();
            setTx(rec.hash)
            console.log(rec.hash)
        } catch (e){
            console.log(e)
        }
    } 
    
    async function handleInput(e){
        try{
            let val = e.target.value;
            setVal(val);
        } catch (e){
            console.log(e)
        }
    } 
    return(
        <div className='App'>
            <h1>MyToken Sale</h1>
            {acc?(
                <p>Address:{acc}</p>
            ) :(
                <div>
                    <p>please connect to your metamask wallet</p>
                 <button onClick={handleConnect}>connect </button>
                 </div>
            )
            }
            <p>Token Balance: {tokenBal} MTK</p>
            {chainId ?(
                <p>Chain ID : {chainId}</p>
            ):(
                <p>Unable to detect chainId</p>
            
            )}
            <label>Enter amount of ether</label>
            <input type="text" onChange={handleInput}  />
            <button onClick={buyToken}>Buy</button>
            <p>{tx}</p>
            </div>
    );

    
}

export default App
