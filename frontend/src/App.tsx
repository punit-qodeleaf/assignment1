import React, {useState} from 'react';
import { utils } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'

import './App.css';
import TransferToken from './abi/TransferToken.json';

function App() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState('')
  const [msg, setMsg] = useState("")

  const TransferTokenInterface = new utils.Interface(TransferToken)
  const TransferTokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const TransferTokenContract = new Contract(TransferTokenAddress, TransferTokenInterface)

  const transfer = () => {
    const { state, send } = useContractFunction(TransferTokenContract, 'transfer', {transactionName: 'Wrap'})
  }

  return (
    <div className="App">
     <input type='text' onChange={e=>setRecipient(e.target.value)} value={recipient} placeholder='Enter recipient'/>
     <input type='number' onChange={e=>setAmount(e.target.value)} value={amount} placeholder='Enter amount'/>
     <button onClick={transfer}>
       Transfer</button>
    </div>
  );
}

export default App;
