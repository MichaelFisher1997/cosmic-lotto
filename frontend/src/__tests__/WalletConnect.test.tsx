import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { connectWallet, mockWeb3, isWalletConnected, getMockAccount } from '../__mocks__/web3';

// Mock the web3 module
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn(),
  disconnectWallet: jest.fn(),
}));

// Mock the App component's dependencies
jest.mock('../components/Web3Provider', () => ({
  useWeb3: () => ({
    connect: connectWallet,
    disconnect: jest.fn(),
    isConnected: isWalletConnected(),
    account: isWalletConnected() ? getMockAccount() : null,
  }),
}));

describe('Wallet Connection', () => {
  beforeEach(() => {
    // Clear all mocks and reset state before each test
    jest.clearAllMocks();
    // Reset the mock wallet connection state
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    (console.error as jest.Mock).mockRestore();
  });

  test('connects wallet when connect button is clicked', async () => {
    // Mock the connectWallet function to resolve with our mock Web3 instance
    (connectWallet as jest.Mock).mockResolvedValueOnce(mockWeb3);
    
    render(<App />);
    
    // Find and click the connect wallet button
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the wallet connection to complete
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // The button should now show the connected address
    const updatedButton = await screen.findByText(/0x1234...7890/);
    expect(updatedButton).toBeInTheDocument();
  });

  test('displays error when wallet connection fails', async () => {
    // Mock the connectWallet function to reject with an error
    const errorMessage = 'Failed to connect to wallet';
    (connectWallet as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
    render(<App />);
    
    // Find and click the connect wallet button
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the error state to be handled
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // The button should still be in the connect state
    expect(connectButton).toHaveTextContent(/connect wallet/i);
  });

  test('disconnects wallet when disconnect is clicked', async () => {
    // First, mock a successful connection
    (connectWallet as jest.Mock).mockResolvedValueOnce(mockWeb3);
    
    render(<App />);
    
    // Connect the wallet
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the connection to complete
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // Now test disconnection
    // Mock the disconnect function
    const { disconnectWallet } = require('../utils/web3');
    disconnectWallet.mockResolvedValueOnce(undefined);
    
    // Click the connected wallet button to show the disconnect option
    fireEvent.click(connectButton);
    
    // Find and click the disconnect button
    const disconnectButton = await screen.findByText(/disconnect/i);
    fireEvent.click(disconnectButton);
    
    // Verify the disconnect function was called
    await waitFor(() => {
      expect(disconnectWallet).toHaveBeenCalledTimes(1);
    });
  });
});
