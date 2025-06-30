// Mock Web3 provider for testing
export const mockWeb3 = {
  eth: {
    getAccounts: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
    getChainId: jest.fn().mockResolvedValue(1),
  },
  utils: {
    fromWei: (value: string) => (parseInt(value) / 1e18).toString(),
    toWei: (value: string) => (parseFloat(value) * 1e18).toString(),
  },
  currentProvider: {
    on: jest.fn(),
    removeListener: jest.fn(),
  },
};

// Mock wallet connection state
let isConnected = false;

export const connectWallet = jest.fn().mockImplementation(async () => {
  isConnected = true;
  return mockWeb3;
});

export const disconnectWallet = jest.fn().mockImplementation(async () => {
  isConnected = false;
  return true;
});

// Helper to get current connection state
export const isWalletConnected = () => isConnected;

// Helper to get the mocked account
export const getMockAccount = () => '0x1234...7890';
