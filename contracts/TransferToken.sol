//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";

contract TransferToken is Token{

  uint256 public feePercent;
  uint256 public accumulatedFees;
  
  constructor(uint feePercent_){
    feePercent = feePercent_;
  }

  function updateFeePercent(uint _feePercent) external onlyOwner{
    feePercent = _feePercent;
  }

  function transferAccumulatedFee() external onlyOwner{
    address _owner = owner();
    accumulatedFees = 0;
    transfer(_owner, accumulatedFees);
  }

 function transfer(address recipient, uint amount) override public returns (bool){
    uint fees;
    uint transferAmount;
    unchecked {
      fees =  (amount * feePercent)/100;
      transferAmount = amount - fees;
    } 
    accumulatedFees += fees;
    super.transfer(recipient, transferAmount);
    return true;
  }
}