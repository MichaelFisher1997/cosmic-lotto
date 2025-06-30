import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { connectWallet, mockWeb3 } from '../__mocks__/web3';

// Mock the web3 module
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn(),
  disconnectWallet: jest.fn(),
}));

describe('Wallet Connection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
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
    
    // Verify the button text changes to the connected address (shortened)
    expect(connectButton).toHaveTextContent(/0x1234...7890/);
  });

  test('displays error when wallet connection fails', async () => {
    // Mock the connectWallet function to reject with an error
    const errorMessage = 'Failed to connect to wallet';
    (connectWallet as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
    // Mock console.error to prevent error logs in test output
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<App />);
    
    // Find and click the connect wallet button
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the error to be handled
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // Verify the button text remains the same
    expect(connectButton).toHaveTextContent(/connect wallet/i);
    
    // Clean up the mock
    consoleError.mockRestore();
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
