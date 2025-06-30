const { execSync } = require('child_process');
const path = require('path');

const testFiles = [
  'frontend/src/__tests__/BasicApp.test.tsx',
  'frontend/src/__tests__/App.test.tsx',
  'frontend/src/__tests__/WalletConnect.test.tsx',
  'frontend/src/__tests__/LotteryPurchase.test.tsx',
];

console.log('Starting test suite...\n');

let passed = 0;
let failed = 0;

for (const testFile of testFiles) {
  console.log(`\n=== Running ${testFile} ===`);
  try {
    execSync(`npx jest ${testFile} --config=frontend/jest.config.cjs --passWithNoTests`, {
      stdio: 'inherit',
      cwd: __dirname,
      timeout: 30000 // 30 seconds timeout per test file
    });
    console.log(`✅ ${testFile} - PASSED\n`);
    passed++;
  } catch (error) {
    console.error(`❌ ${testFile} - FAILED\n`);
    failed++;
  }
}

console.log('\n=== Test Summary ===');
console.log(`Total: ${passed + failed}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

process.exit(failed > 0 ? 1 : 0);
