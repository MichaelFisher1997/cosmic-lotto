import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple custom render function that can be extended later
export const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, {
    // Wrap with providers here if needed
    ...options,
  });};

// Re-export everything from testing-library/react
export * from '@testing-library/react';
// Override render method
export { customRender as render };

// Mock for the wallet connection state
export const mockUseWeb3React = () => ({
  account: '0x1234567890123456789012345678901234567890',
  active: true,
  activate: jest.fn(),
  deactivate: jest.fn(),
  library: {
    provider: {
      request: jest.fn().mockResolvedValue(['0x1234567890123456789012345678901234567890']),
      on: jest.fn(),
      removeListener: jest.fn(),
    },
  },
});
