import React, { useState } from "react";
import { utils } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";

import "./App.css";
import FeeDeductTransfer from "./abi/FeeDeductTransfer.json";
import ConnectAccount from "./components/ConnectAccount";
import MintToken from "./components/MintToken";

function App() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const FeeDeductTransferInterface = new utils.Interface(FeeDeductTransfer);
  const FeeDeductTransferAddress = "0x67d269191c92Caf3cD7723F116c85e6E9bf55933";
  const FeeDeductTransferContract = new Contract(
    FeeDeductTransferAddress,
    FeeDeductTransferInterface
  );
  const { state, send } = useContractFunction(
    FeeDeductTransferContract,
    "transfer",
  );

  const transfer = () => {
    send(recipient, amount);
    console.log(state);
  };

  return (
    <div className="App">
      <ConnectAccount tokenAddress={FeeDeductTransferAddress}/>
      <MintToken contract={FeeDeductTransferContract}/>
      <input
        type="text"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
        placeholder="Enter recipient"
      />
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        placeholder="Enter amount"
      />
      <button onClick={transfer}>Transfer</button>
    </div>
  );
}

export default App;
