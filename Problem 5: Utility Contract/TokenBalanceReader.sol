// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Interface of the ERC20 standard, which describes how a token contract should behave
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    // Takes an address as input and returns balance of given account as an unsigned integer.
}

// Contract that provides a function to get the balances of an address for a given set of tokens
contract BalanceReader {
    // A function that takes an address and an array of token addresses as input and returns an array of balances as output
    function getBalances(address wallet, address[] calldata tokens)
        external
        view
        returns (uint256[] memory)
    {
        // Creates an array of unsigned integers of the same length as the input array
        uint256[] memory balances = new uint256[](tokens.length);
        // Loops through each token in the array
        for (uint256 i = 0; i < tokens.length; i++) {
            // Creates an instance of the token contract at the given address
            IERC20 token = IERC20(tokens[i]);
            // Calls balanceOf function on the token contract with the given wallet address as input
            // and stores the result in the corresponding position in the balances array
            balances[i] = token.balanceOf(wallet);
        }
        // Returns the balances array
        return balances;
    }
}