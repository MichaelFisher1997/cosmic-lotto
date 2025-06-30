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
};

export const connectWallet = jest.fn().mockResolvedValue(mockWeb3);
export const disconnectWallet = jest.fn().mockResolvedValue(undefined);
