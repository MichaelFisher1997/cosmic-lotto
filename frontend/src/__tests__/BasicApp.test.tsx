import { render } from '@testing-library/react';
import App from '../App';

// Simple test to verify the app renders without crashing
describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    // Check for the main container class
    const appContainer = document.querySelector('.min-h-screen');
    expect(appContainer).toBeInTheDocument();
  });

  test('contains navigation elements', () => {
    render(<App />);
    
    // Check for the header element that contains navigation
    const headerElement = document.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    
    // Check for navigation links (they might be in a div with flex class)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('contains main content sections', () => {
    render(<App />);
    
    // Check for main content sections by looking for sections with IDs
    const mainSections = document.querySelectorAll('section, [id]');
    expect(mainSections.length).toBeGreaterThan(0);
  });
});
