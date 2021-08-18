//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Token is ERC20, Ownable, ERC20Capped {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 decimal,
        uint256 cappedSupply_
    ) ERC20(_name, _symbol) ERC20Capped(cappedSupply_) Ownable() {
        decimals(decimal);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function _mint(address account, uint256 amount)
        internal
        override(ERC20Capped, ERC20)
    {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    function decimals(uint256 _decimals) public pure returns (uint256) {
        return _decimals;
    }
}
