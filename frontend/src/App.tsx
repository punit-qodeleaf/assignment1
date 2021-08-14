import React, {useState} from 'react';
import { ethers } from 'ethers';
import './App.css';
import TransferToken from '../../artifacts/contracts/TransferToken.sol/TransferToken.json'

const TransferTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState('')
  const [msg, setMsg] = useState("")

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function transfer() {
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(TransferTokenAddress, TransferToken.abi, signer)
      const transaction = await contract.transfer(recipient, amount)
      await transaction.wait()
      setMsg('Transaction successful')
    }
  }

  return (
    <div className="App">
     <input type='text' onChange={e=>setRecipient(e.target.value)} value={recipient} placeholder='Enter recipient'/>
     <input type='number' onChange={e=>setAmount(e.target.value)} value={amount} placeholder='Enter amount'/>
     <button onClick={transfer}>Transfer</button>
    </div>
  );
}

export default App;
