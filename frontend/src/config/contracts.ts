// Contract addresses (Moonbase Alpha Testnet)
export const CONTRACTS = {
  lottoNFT: '0x3F7c1ffa135969012883503d7eda354124587b1A',
  lottoGame: '0xf8D8F2b921964E82030a0DDc218a0afA59840b67',
} as const;

// LottoNFT ABI (simplified - you should import the full ABI from your compiled contracts)
export const LOTTO_NFT_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function minter() view returns (address)',
  'function setMinter(address _minter) external',
  'function mint(address to, uint256 drawNumber) external returns (uint256)',
  'function getDrawNumber(uint256 tokenId) view returns (uint256)',
  'function getTicketsByDraw(address owner, uint256 drawNumber) view returns (uint256[] memory)',
];

// LottoGame ABI (simplified)
export const LOTTO_GAME_ABI = [
  'function ticketPrice() view returns (uint256)',
  'function currentDraw() view returns (uint256)',
  'function drawInterval() view returns (uint256)',
  'function lastDrawTime() view returns (uint256)',
  'function buyTickets(uint256 amount) external payable',
  'function drawWinners() external',
  'function claimPrize(uint256 drawNumber) external',
  'function getDrawWinners(uint256 drawNumber) view returns (address[] memory)',
  'function getDrawPrizePool(uint256 drawNumber) view returns (uint256)',
  'function getDrawEndTime(uint256 drawNumber) view returns (uint256)',
  'function getPlayerTickets(address player, uint256 drawNumber) view returns (uint256)',
  'function getPlayerPendingPrizes(address player) view returns (uint256)',
];
