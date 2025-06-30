import { render } from '../test-utils';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the web3 module
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn().mockResolvedValue({
    provider: {
      request: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
      on: jest.fn(),
      removeListener: jest.fn(),
    },
    signer: {
      getAddress: jest.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
    },
    address: '0x1234567890123456789012345678901234567890',
  }),
  disconnectWallet: jest.fn().mockResolvedValue(undefined),
}));

// Mock window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const mockEthereum = {
  isMetaMask: true,
  request: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
  on: jest.fn(),
  removeListener: jest.fn(),
};

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks and reset DOM before each test
    jest.clearAllMocks();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    
    // Mock window.ethereum
    window.ethereum = { ...mockEthereum };
  });

  test('renders without crashing', () => {
    render(<App />);
    // Look for the logo specifically by its class
    const logo = screen.getByText(/CosmicLotto/i, { selector: 'span.text-purple-400' });
    expect(logo).toBeInTheDocument();
  });

  test('toggles dark mode when the theme toggle button is clicked', () => {
    render(<App />);
    
    // Initially should be in dark mode
    expect(document.documentElement).toHaveClass('dark');
    
    // Find the theme toggle button by its aria-label
    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(themeToggle);
    
    // Should remove dark mode class
    expect(document.documentElement).not.toHaveClass('dark');
    
    // Click again to toggle back
    fireEvent.click(themeToggle);
    expect(document.documentElement).toHaveClass('dark');
  });

  test('navigates to different sections', () => {
    // Mock the scrollIntoView function
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    
    // Render the App component
    render(<App />);
    
    // Get all navigation buttons
    const navButtons = [
      { name: /how it works/i },
      { name: /prizes/i },
      { name: /buy tickets/i },
    ];
    
    // Test each navigation button
    navButtons.forEach(({ name }) => {
      const button = screen.getByRole('button', { name });
      fireEvent.click(button);
      
      // Check if scrollIntoView was called with the correct section
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth'
      });
    });
  });

  test('renders navigation buttons', () => {
    render(<App />);
    
    // Check for navigation buttons
    const homeButton = screen.getByRole('button', { name: /home/i });
    const howItWorksButton = screen.getByRole('button', { name: /how it works/i });
    const prizesButton = screen.getByRole('button', { name: /prizes/i });
    
    expect(homeButton).toBeInTheDocument();
    expect(howItWorksButton).toBeInTheDocument();
    expect(prizesButton).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<App />);
    
    // Check for main sections using their IDs
    expect(screen.getByTestId('home-section')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works-section')).toBeInTheDocument();
    expect(screen.getByTestId('prizes-section')).toBeInTheDocument();
  });

  test('renders wallet connect button', () => {
    render(<App />);
    
    // Check for wallet connect button
    const connectButton = screen.getByRole('button', { name: /connect wallet/i });
    expect(connectButton).toBeInTheDocument();
  });
});
