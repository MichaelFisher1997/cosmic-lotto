import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

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
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  
  return { provider, signer, address };
};

export const getContract = (address: string, abi: any, provider: any) => {
  return new ethers.Contract(address, abi, provider);
};
