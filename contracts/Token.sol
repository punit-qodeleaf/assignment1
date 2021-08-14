//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable{
  
  constructor() ERC20("USDC", "ud") Ownable(){
  }

  function mint(address account, uint amount) public onlyOwner{
    _mint(account, amount);
  }

  function decimals() override pure public returns (uint8){
    return 3;
  }

}