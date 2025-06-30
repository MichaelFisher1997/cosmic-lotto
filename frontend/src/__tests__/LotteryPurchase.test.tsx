import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { connectWallet, mockWeb3 } from '../__mocks__/web3';
import { getContract, mockContract } from '../__mocks__/contracts';

// Mock the web3 and contract modules
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn().mockImplementation(() => Promise.resolve(mockWeb3)),
  disconnectWallet: jest.fn().mockResolvedValue(undefined),
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
      // Check that the connect wallet function was called
      expect(connectWallet).toHaveBeenCalledTimes(1);
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

  test('allows purchasing lottery tickets when connected', async () => {
    render(<App />);
    
    // Connect wallet first
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the wallet connection to complete
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // Set ticket quantity and submit
    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '2' } });
    
    const purchaseButton = screen.getByRole('button', { name: /buy tickets/i });
    fireEvent.click(purchaseButton);
    
    // Verify the purchase was attempted
    await waitFor(() => {
      expect(screen.getByText(/purchasing 2 tickets/i)).toBeInTheDocument();
    });
  });

  test('displays error when purchase fails', async () => {
    // Mock a failed purchase
    (mockWeb3.eth.Contract as jest.Mock) = jest.fn().mockImplementation(() => ({
      methods: {
        purchaseTickets: jest.fn().mockReturnValue({
          send: jest.fn().mockRejectedValue(new Error('Failed to purchase')),
        }),
      },
    }));
    
    render(<App />);
    
    // Connect wallet first
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    fireEvent.click(connectButton);
    
    // Wait for the wallet connection to complete
    await waitFor(() => {
      expect(connectWallet).toHaveBeenCalledTimes(1);
    });
    
    // Set ticket quantity and submit
    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: '1' } });
    
    const purchaseButton = screen.getByRole('button', { name: /buy tickets/i });
    fireEvent.click(purchaseButton);
    
    // Verify the error is displayed
    await waitFor(() => {
      expect(screen.getByText(/error purchasing tickets/i)).toBeInTheDocument();
    });
  });
});
