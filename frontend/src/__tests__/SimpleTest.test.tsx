import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function SimpleComponent() {
  return <div data-testid="test-element">Test Element</div>;
}

describe('Simple Test', () => {
  test('renders test element', () => {
    render(<SimpleComponent />);
    expect(screen.getByTestId('test-element')).toHaveTextContent('Test Element');
  });
});
