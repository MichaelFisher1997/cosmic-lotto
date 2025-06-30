# 🎰 Cosmic Lotto

A decentralized lottery game with NFT tickets built on Ethereum where players can purchase NFT tickets to participate in draws.

## Features

- 🔒 MetaMask wallet integration
- 🎫 NFT-based lottery tickets (ERC-721)
- 🎰 Automated winner selection
- 💰 Prize distribution to winners
- 📱 Responsive web interface

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Smart Contracts**: Solidity (Hardhat)
- **Blockchain**: Ethereum
- **Wallet**: MetaMask
- **Testing**: Hardhat, Chai, Mocha

## Project Structure

```
crypto-lotto/
├── client/                 # Frontend React application
└── contracts/              # Smart contracts
    ├── LottoNFT.sol        # NFT ticket contract
    └── LottoGame.sol       # Main lottery game logic
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MetaMask browser extension
- Hardhat

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install smart contract dependencies
   cd contracts
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

### Development

1. Start local blockchain:
   ```bash
   cd contracts
   npx hardhat node
   ```

2. Deploy contracts (in a new terminal):
   ```bash
   cd contracts
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. Start the frontend:
   ```bash
   cd client
   npm start
   ```

## Smart Contracts

### LottoNFT
- ERC-721 compliant NFT contract
- Each ticket is a unique NFT
- Tickets have metadata including draw number and purchase timestamp

### LottoGame
- Manages the lottery game logic
- Handles ticket purchases
- Performs random winner selection
- Distributes prizes

## License

MIT
>>>>>>> 5ffe92b (Initial commit: Set up Cosmic Lotto project with frontend and smart contracts)
