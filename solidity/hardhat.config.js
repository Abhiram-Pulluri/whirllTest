require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai:{
      url:"https://rpc-mumbai.maticvigil.com",
      //paste your account privatekey in accounts""
      accounts:[""]
    },
  },
};
