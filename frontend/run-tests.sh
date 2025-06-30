#!/bin/bash

# Exit on error
set -e

echo "Running tests..."
cd "$(dirname "$0")"

# Run BasicApp tests
echo "\n=== Running BasicApp Tests ==="
npx jest src/__tests__/BasicApp.test.tsx

# Run App tests
echo "\n=== Running App Tests ==="
npx jest src/__tests__/App.test.tsx

# Run WalletConnect tests
echo "\n=== Running WalletConnect Tests ==="
npx jest src/__tests__/WalletConnect.test.tsx

# Run LotteryPurchase tests
echo "\n=== Running LotteryPurchase Tests ==="
npx jest src/__tests__/LotteryPurchase.test.tsx

echo "\nAll tests completed successfully!"
