// Custom build script that skips TypeScript type checking
import { build } from 'vite';

// Run Vite build without TypeScript type checking
async function buildApp() {
  try {
    console.log('Building app without TypeScript type checking...');
    await build();
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();
