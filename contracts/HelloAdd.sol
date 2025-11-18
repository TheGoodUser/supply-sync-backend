// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloAdd {
    function hello() public pure returns (string memory) {
        return "Hello World from Ethereum!";
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}
