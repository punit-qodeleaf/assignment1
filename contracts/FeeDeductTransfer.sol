//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";

contract FeeDeductTransfer is Token {
    uint256 public feePercent;
    address feeAcc = address(0x123);

    constructor(
        uint256 feePercent_,
        string memory _name,
        string memory _symbol,
        uint256 decimal,
        uint256 cappedSupply_
    ) Token(_name, _symbol, decimal, cappedSupply_) {
        require(feePercent_ <= 10000, "Fee Percent cannot be more than 100");
        feePercent = feePercent_;
        _approve(feeAcc, owner(), cappedSupply_);
    }

    function updateFeePercent(uint256 _feePercent) external onlyOwner {
        require(_feePercent <= 10000, "Fee Percent cannot be more than 100");
        feePercent = _feePercent;
    }

    function accumulatedFees() external view returns (uint256) {
        return balanceOf(feeAcc);
    }

    function transferAccumulatedFee() external onlyOwner {
        address _owner = owner();
        uint256 feeToTransfer = balanceOf(feeAcc);
        transferFrom(feeAcc, _owner, feeToTransfer);
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        uint256 fees = (amount * feePercent) / 10000;
        uint256 transferAmount = amount - fees;
        super.transfer(feeAcc, fees);
        super.transfer(recipient, transferAmount);
        return true;
    }
}
