import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { mockWeb3 } from '../__mocks__/web3';
import { getContract, mockContract } from '../__mocks__/contracts';

// Mock the web3 and contract modules
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn().mockResolvedValue(mockWeb3),
  disconnectWallet: jest.fn(),
}));

jest.mock('../config/contracts', () => ({
  getContract: jest.fn(),
}));

describe('Lottery Purchase', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock contract
    (getContract as jest.Mock).mockResolvedValue(mockContract);
    
    // Mock the window.ethereum object
    (global.window as any).ethereum = {
      request: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
      on: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  test('displays ticket purchase form when connected', async () => {
    render(<App />);
    
    // Connect wallet first
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the connection to complete
    await waitFor(() => {
      expect(connectButton).toHaveTextContent(/0x1234...7890/);
    });
    
    // Find the ticket purchase section
    const ticketSection = screen.getByTestId('ticket-purchase-section');
    expect(ticketSection).toBeInTheDocument();
    
    // Check if the ticket price is displayed
    expect(screen.getByText(/ticket price: 0.1 eth/i)).toBeInTheDocument();
    
    // Check if the quantity input is present
    const quantityInput = screen.getByLabelText(/quantity/i);
    expect(quantityInput).toBeInTheDocument();
    
    // Check if the buy button is present
    const buyButton = screen.getByRole('button', { name: /buy tickets/i });
    expect(buyButton).toBeInTheDocument();
  });

  test('allows purchasing tickets', async () => {
    render(<App />);
    
    // Connect wallet
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the connection to complete
    await waitFor(() => {
      expect(connectButton).toHaveTextContent(/0x1234...7890/);
    });
    
    // Set ticket quantity
    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '5' } });
    
    // Click the buy button
    const buyButton = screen.getByRole('button', { name: /buy tickets/i });
    fireEvent.click(buyButton);
    
    // Verify the contract was called with the correct parameters
    await waitFor(() => {
      expect(mockContract.methods.buyTickets).toHaveBeenCalledWith('5');
    });
  });

  test('displays error when purchase fails', async () => {
    // Mock a failed transaction
    const errorMessage = 'Transaction failed';
    mockContract.methods.buyTickets = jest.fn().mockImplementation(() => ({
      send: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));
    
    // Mock console.error to prevent error logs in test output
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<App />);
    
    // Connect wallet
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the connection to complete
    await waitFor(() => {
      expect(connectButton).toHaveTextContent(/0x1234...7890/);
    });
    
    // Set ticket quantity and submit
    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '5' } });
    
    const buyButton = screen.getByRole('button', { name: /buy tickets/i });
    fireEvent.click(buyButton);
    
    // Verify the error is handled
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error purchasing tickets:', expect.any(Error));
    });
    
    // Clean up the mock
    consoleError.mockRestore();
  });
});
