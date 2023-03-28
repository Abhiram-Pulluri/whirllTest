// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyTokenSale is ERC20 {

    uint unitTokenPrice = 0.001 ether;
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    function buyToken() external payable {
        require(msg.value >= 0.1 ether, "Not enough ether");
        uint amount = msg.value/unitTokenPrice;
        require(balanceOf(address(this)) >= amount, "Not enough tokens") ;
        _transfer(address(this), msg.sender, amount); 
    }
}