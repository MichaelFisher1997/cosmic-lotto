#!/bin/bash
set -e

echo "--- Setting up build environment ---"

# Create app directory if it doesn't exist
mkdir -p /app/frontend

# Copy all files to the container
cp -r . /app/

# Navigate to frontend directory
cd /app/frontend

# Install dependencies
echo "--- Installing dependencies ---"
bun install --frozen-lockfile

# Build the application
echo "--- Building application ---"
bun run build

echo "--- Build completed successfully ---"
