# Crypto Lotto - Smart Contracts

A decentralized lottery game built on Moonbeam Network, featuring NFT-based tickets and automated prize distribution.

## Contract Addresses (Moonbase Alpha Testnet)

- **LottoNFT**: [0x3F7c1ffa135969012883503d7eda354124587b1A](https://moonbase.moonscan.io/address/0x3F7c1ffa135969012883503d7eda354124587b1A)
  - Token Name: CryptoLotto Tickets
  - Symbol: CLT
  - Base URI: `https://api.cryptolotto.example/tokens/`

- **LottoGame**: [0xf8D8F2b921964E82030a0DDc218a0afA59840b67](https://moonbase.moonscan.io/address/0xf8D8F2b921964E82030a0DDc218a0afA59840b67)
  - Manages lottery logic and prize distribution
  - Connected to LottoNFT for ticket management

## Features

- NFT-based lottery tickets (ERC-721)
- Automated winner selection
- Prize pool distribution
- Configurable ticket prices and draw schedules
- Secure and transparent on-chain operations

## Tech Stack

- **Smart Contracts**: Solidity (0.8.20)
- **Development Framework**: Hardhat
- **Blockchain**: Moonbeam Network (EVM-compatible)
- **NFT Standard**: ERC-721 (OpenZeppelin)
- **Testing**: Mocha, Chai, Waffle

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- [MetaMask](https://metamask.io/) (for interaction)
- [Moonbeam Testnet (Moonbase Alpha) configured in MetaMask](https://docs.moonbeam.network/builders/get-started/networks/moonbase/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crypto-lotto/contracts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update .env with your private key and API keys
   ```

## Deployment

### Deploy to Moonbase Alpha (Testnet)

1. Ensure you have testnet GLMR tokens from the [Moonbase Alpha Faucet](https://faucet.moonbeam.network/)

2. Deploy the contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network moonbase
   ```

3. Verify the contracts (optional):
   ```bash
   npx hardhat verify --network moonbase <LottoNFT_ADDRESS> "CryptoLotto Tickets" "CLT" "https://api.cryptolotto.example/tokens/"
   npx hardhat verify --network moonbase <LottoGame_ADDRESS> "<LottoNFT_ADDRESS>"
   ```

## Interacting with Contracts

### Using Hardhat Console

```bash
npx hardhat console --network moonbase
```

Example:
```javascript
const LottoNFT = await ethers.getContractFactory("LottoNFT");
const nft = await LottoNFT.attach("0x3F7c1ffa135969012883503d7eda354124587b1A");
console.log("Name:", await nft.name());
console.log("Symbol:", await nft.symbol());
```

## Testing

Run the test suite:
```bash
npx hardhat test
```

## License

MIT

## Security

- Contracts are not audited yet. Use at your own risk.
- Never share your private keys or commit them to version control.
- Always test with small amounts first.

## Support

For support, please open an issue in the repository.
