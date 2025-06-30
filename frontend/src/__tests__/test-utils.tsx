import { render } from '@testing-library/react';
import React from 'react';

// Simple wrapper that doesn't require Web3 providers for basic rendering
type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <>{children}</>;
};

// Custom render function that can be extended later
const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as render };
