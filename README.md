# whirllTest

This repository contains two files

1.App

2.Solidity

#solidity file:

This is the Backend of the project.

This is developed in hardhat with a contract called MyTokenSale.sol, which is deployed in polygon.

You can deploy with your account by pasting ur private key in the hardhat.config file.

Using this contract we can buyToken at a price of UnitTokenPrice=0.001 ehter.

we can mint "MTK" tokens ,which is a ERC20 token with decimal value "18".

If we deploy the contract ,the owner address is preminted with 1000000000 Tokens.
#App:

This is the react frontEnd part of the project.

Where You can connect your metamask wallet in the frontend.

You can change accounts and networks.This will display the changed address and network with respect to the Metamask.

You can buy Tokens by entering the value of ether you want to send in the "enter amount" field.

It also shows the token Balance.

We used ethers,react and react-dom for this frontend part.

