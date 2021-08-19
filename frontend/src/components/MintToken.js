import React, { useState } from 'react'
import { utils } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { Dialog, DialogActions, DialogContent, Button, TextField } from "@material-ui/core";

import FeeDeductTransfer from '../abi/FeeDeductTransfer.json';

const MintToken = props => {
  const { contract } = props
  const [showDialogue, setShowDialogue] = useState(false)
  const [account, setAccount] = useState()
  const [amount, setAmount] = useState()
  const FeeDeductTransferInterface = new utils.Interface(FeeDeductTransfer);
  const FeeDeductTransferAddress = "0x67d269191c92Caf3cD7723F116c85e6E9bf55933";
  const FeeDeductTransferContract = new Contract(
    FeeDeductTransferAddress,
    FeeDeductTransferInterface
  );
  const { state, send } = useContractFunction(
    contract,
    "mint",
    { transactionName: "Wrap" }
  );

  const mintOnClick = () => {
    send(account, amount)
    setShowDialogue(false)
  }

  return (
    <div className='mint-block'>
      <Button variant='contained' color='primary' onClick={() => setShowDialogue(!showDialogue)}>
        Mint Tokens
      </Button>
      <Dialog open={showDialogue} onClose={() => setShowDialogue(false)}>
        <DialogContent>
          <div>
            <TextField autoFocus margin='dense' label='Account' type='text' onChange={(e) => setAccount(e.target.value)} />
          </div>
          <div>
            <TextField margin='dense' label='Token Amount' type='number' onChange={(e) => setAmount(e.target.value)} />
          </div>
          <DialogActions>
            <Button onClick={mintOnClick} color='primary'>
              Mint
            </Button>
            <Button onClick={() => setShowDialogue(false)} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MintToken