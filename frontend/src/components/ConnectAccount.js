import React, { useState } from 'react'
import { Button, Snackbar } from "@material-ui/core";
import { useEthers, useTokenBalance } from '@usedapp/core';
import { formatUnits } from '@ethersproject/units'

import './CommonCSS.css';

const ConnectAccount = props => {
  const {tokenAddress} = props
  const [showBalance, setShowBalance] = useState(false)
  const { activateBrowserWallet, account } = useEthers()

  const tokenBalance = useTokenBalance(tokenAddress, account)

  return (<div className='connect-account'>
    {account ? (
      <Button variant="outlined" color="secondary" onClick={() => setShowBalance(true)}>
        Check Balance
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        onClick={() => activateBrowserWallet()}
      >
        Click to connect wallet
      </Button>
    )}
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={showBalance} onClose={() => setShowBalance(false)}
     message={'Balance: '+ tokenBalance} />
  </div>)
}

export default ConnectAccount