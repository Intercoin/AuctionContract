require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const bscURL = 'https://bsc-dataseed.binance.org'
const bsctestURL = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const mainnetURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET}`
const maticURL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MATIC}`
const mumbaiURL = 'https://matic-mumbai.chainstacklabs.com';

module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      //[mainnetURL]
      chainId: 1,
      forking: {url: mainnetURL}
    },
    bsc: {
      url: bscURL,
      chainId: 56,
      accounts: [
        process.env.private_key,
        process.env.private_key_auxiliary,
        process.env.private_key_releasemanager,
        process.env.private_key_auction
      ],
      saveDeployments: true
    },
    bsctest: {
      url: bsctestURL,
      chainId: 97,
      //gasPrice: "auto",
      accounts: [process.env.private_key],
      saveDeployments: true
    },
    polygon: {
      url: maticURL,
      chainId: 137,
      accounts: [
        process.env.private_key,
        process.env.private_key_auxiliary,
        process.env.private_key_releasemanager,
        process.env.private_key_auction
      ],
      saveDeployments: true
    },
    polygonMumbai: {
      url: mumbaiURL,
      chainId: 80001,
      gasPrice: "auto",
      accounts: [process.env.private_key],
      saveDeployments: true
    },
    mainnet: {
      url: mainnetURL,
      chainId: 1,
      gasPrice: 3_000000000, //3gwei
      accounts: [
        process.env.private_key,
        process.env.private_key_auxiliary,
        process.env.private_key_releasemanager,
        process.env.private_key_auction
      ],
      saveDeployments: true
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.MATIC_API_KEY,
      polygon: process.env.MATIC_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY
    }
  },
  solidity: {
    compilers: [
        {
          version: "0.8.18",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
            metadata: {
              // do not include the metadata hash, since this is machine dependent
              // and we want all generated code to be deterministic
              // https://docs.soliditylang.org/en/v0.7.6/metadata.html
              bytecodeHash: "none",
            },
          },
        },
        {
          version: "0.6.7",
          settings: {},
          settings: {
            optimizer: {
              enabled: false,
              runs: 200,
            },
            metadata: {
              // do not include the metadata hash, since this is machine dependent
              // and we want all generated code to be deterministic
              // https://docs.soliditylang.org/en/v0.7.6/metadata.html
              bytecodeHash: "none",
            },
          },
        },
      ],
  
    
  },
  
  namedAccounts: {
    deployer: 0,
    },

  paths: {
    sources: "contracts",
  },
  gasReporter: {
    currency: 'USD',
    enabled: (process.env.REPORT_GAS === "true") ? true : false
  },
  mocha: {
    timeout: 200000
  }
}
