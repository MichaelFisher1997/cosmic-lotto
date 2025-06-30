import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

// Create a wrapper that matches the expected ExternalProvider interface
const getEthereumProvider = () => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('MetaMask is not installed');
  }
  
  return {
    isMetaMask: ethereum.isMetaMask,
    request: (request: { method: string; params?: any[] }) => 
      ethereum.request(request),
    sendAsync: (request: { method: string; params?: any[] }, callback: (error: any, response: any) => void) => {
      ethereum.request(request)
        .then((result: any) => callback(null, { result }))
        .catch((error: any) => callback(error, null));
    },
    on: (event: string, callback: (...args: any[]) => void) => {
      ethereum.on(event, callback);
    },
    removeListener: (event: string, callback: (...args: any[]) => void) => {
      ethereum.removeListener(event, callback);
    },
    isConnected: () => ethereum.isConnected(),
    chainId: ethereum.chainId
  };
};

export const injected = new InjectedConnector({
  supportedChainIds: [1287], // Moonbase Alpha
});

export const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask!');
  }
  
  try {
    // Create a Web3Provider instance with our wrapped provider
    const provider = new ethers.providers.Web3Provider(
      getEthereumProvider(),
      'any' // Enable network auto-detection
    );
    
    // Request account access
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw new Error('Failed to connect to wallet. Please try again.');
  }
};

export const getContract = (address: string, abi: any, provider: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(address, abi, provider);
};

// Add network switching utility
export const switchNetwork = async (chainId: string) => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      throw new Error('This network is not available in your wallet');
    }
    throw switchError;
  }
};
