// Simple static build script that creates a minimal working frontend
import fs from 'fs';
import path from 'path';

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create a simple index.html file
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Decentralized Lotto Game</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 2rem;
    }
    h1 {
      color: #38bdf8;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .button {
      background-color: #0ea5e9;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #0284c7;
    }
    .coming-soon {
      margin-top: 2rem;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Decentralized Lotto Game</h1>
    <p>Welcome to our NFT-based lottery platform. Buy tickets as NFTs and participate in the decentralized lottery.</p>
    
    <div class="coming-soon">
      <h2>Coming Soon</h2>
      <p>Our platform is currently under development. Check back soon for the full experience!</p>
      <p>Features to expect:</p>
      <ul style="text-align: left;">
        <li>MetaMask wallet integration</li>
        <li>NFT-based lottery tickets (ERC-721)</li>
        <li>Smart contract for lottery logic</li>
        <li>Automatic winner selection</li>
        <li>Prize distribution</li>
      </ul>
    </div>
    
    <p style="margin-top: 2rem;">
      <button class="button" disabled>Connect Wallet (Coming Soon)</button>
    </p>
  </div>
</body>
</html>
`;

// Write the index.html file to the dist directory
fs.writeFileSync(path.join('dist', 'index.html'), indexHtml);

console.log('Static build completed successfully!');
