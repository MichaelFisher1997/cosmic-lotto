require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// Network RPC URLs
const MOONBEAM_RPC_URL = process.env.MOONBEAM_RPC_URL || "https://rpc.api.moonbeam.network";
const MOONRIVER_RPC_URL = process.env.MOONRIVER_RPC_URL || "https://rpc.api.moonriver.moonbeam.network";
const MOONBASE_RPC_URL = process.env.MOONBASE_RPC_URL || "https://rpc.api.moonbase.moonbeam.network";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const MOONSCAN_API_KEY = process.env.MOONSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local development
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // Moonbeam networks
    moonbeam: {
      url: MOONBEAM_RPC_URL,
      chainId: 1284, // Moonbeam mainnet
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    moonriver: {
      url: MOONRIVER_RPC_URL,
      chainId: 1285, // Moonriver
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    moonbase: {
      url: MOONBASE_RPC_URL,
      chainId: 1287, // Moonbase testnet
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gas: 5198000,
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: {
      // Ethereum
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      // BSC
      bsc: ETHERSCAN_API_KEY,
      bscTestnet: ETHERSCAN_API_KEY,
      // Moonbeam
      moonbeam: MOONSCAN_API_KEY,
      moonriver: MOONSCAN_API_KEY,
      moonbaseAlpha: MOONSCAN_API_KEY,
    },
    customChains: [
      // Moonbeam
      {
        network: "moonbeam",
        chainId: 1284,
        urls: {
          apiURL: "https://api-moonbeam.moonscan.io/api",
          browserURL: "https://moonscan.io"
        }
      },
      // Moonriver
      {
        network: "moonriver",
        chainId: 1285,
        urls: {
          apiURL: "https://api-moonriver.moonscan.io/api",
          browserURL: "https://moonriver.moonscan.io"
        }
      },
      // Moonbase Alpha
      {
        network: "moonbaseAlpha",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io"
        }
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
