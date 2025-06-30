import { MetaMaskInpageProvider } from '@metamask/providers';

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
  isConnected: () => boolean;
  chainId: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider & MetaMaskInpageProvider;
  }
}
