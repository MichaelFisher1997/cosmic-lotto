import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder to global scope for tests
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
