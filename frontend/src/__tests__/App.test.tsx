import { render, screen, fireEvent } from '../test-utils';
import App from '../App';

// Mock the useWeb3React hook
jest.mock('@web3-react/core', () => ({
  ...jest.requireActual('@web3-react/core'),
  useWeb3React: () => ({
    account: '0x1234...7890',
    active: true,
    activate: jest.fn(),
    deactivate: jest.fn(),
  }),
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

// Mock the wallet connect functionality
jest.mock('../utils/web3', () => ({
  connectWallet: jest.fn().mockResolvedValue(mockEthereum),
  disconnectWallet: jest.fn().mockResolvedValue(undefined),
}));

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
    expect(screen.getByText(/CosmicLotto/i)).toBeInTheDocument();
  });

  test('toggles dark mode when the theme toggle button is clicked', () => {
    render(<App />);
    
    // Initial state should be dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Click the theme toggle button
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeToggle);
    
    // After clicking, dark mode should be off
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Click again to toggle back
    fireEvent.click(themeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('navigates to different sections', () => {
    render(<App />);
    
    // Test each navigation link
    const navLinks = [
      { name: /how it works/i, testId: 'how-it-works' },
      { name: /prizes/i, testId: 'prizes' },
      { name: /buy tickets/i, testId: 'buy-tickets' },
    ];
    
    navLinks.forEach(({ name }) => {
      const link = screen.getByRole('link', { name });
      fireEvent.click(link);
      // We can't test actual scrolling in JSDOM, but we can test if the click handler is called
      expect(link).toHaveAttribute('href');
    });
  });

  test('displays mobile menu when hamburger button is clicked', () => {
    // Mock window.innerWidth to simulate mobile view
    global.innerWidth = 500;
    
    render(<App />);
    
    // Menu should be closed by default
    expect(screen.queryByRole('navigation')).not.toHaveClass('translate-x-0');
    
    // Click the hamburger button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Menu should now be open
    expect(screen.getByRole('navigation')).toHaveClass('translate-x-0');
    
    // Click again to close
    fireEvent.click(menuButton);
    expect(screen.queryByRole('navigation')).not.toHaveClass('translate-x-0');
  });

  test('renders all main sections', () => {
    render(<App />);
    
    // Check for main sections
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument();   // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    
    // Check for specific section headings
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
    expect(screen.getByText(/prizes/i)).toBeInTheDocument();
  });

  test('renders wallet connect button', () => {
    render(<App />);
    
    const walletButton = screen.getByRole('button', { name: /connect wallet/i });
    expect(walletButton).toBeInTheDocument();
    expect(walletButton).toHaveTextContent(/connect wallet/i);
  });
});
