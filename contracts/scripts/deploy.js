const hre = require("hardhat");

async function main() {
  console.log("Deploying LottoNFT contract...");
  
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Deploy LottoNFT
  const LottoNFT = await hre.ethers.getContractFactory("LottoNFT");
  const lottoNFT = await LottoNFT.deploy(
    "CryptoLotto Tickets",
    "CLT",
    "https://api.cryptolotto.example/tokens/" // Base URI for token metadata
  );
  
  await lottoNFT.deployed();
  console.log(`LottoNFT deployed to: ${lottoNFT.address}`);
  
  // Deploy LottoGame
  console.log("Deploying LottoGame contract...");
  const LottoGame = await hre.ethers.getContractFactory("LottoGame");
  const lottoGame = await LottoGame.deploy(lottoNFT.address);
  
  await lottoGame.deployed();
  console.log(`LottoGame deployed to: ${lottoGame.address}`);
  
  // Set the minter role to LottoGame contract
  console.log("Setting minter role to LottoGame...");
  await lottoNFT.setMinter(lottoGame.address);
  console.log("Minter role set successfully!");
  
  console.log("\nDeployment completed successfully!");
  console.log("LottoNFT:", lottoNFT.address);
  console.log("LottoGame:", lottoGame.address);
  
  // Return contract addresses for potential verification
  return {
    lottoNFT: lottoNFT.address,
    lottoGame: lottoGame.address
  };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
