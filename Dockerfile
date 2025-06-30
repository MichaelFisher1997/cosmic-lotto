# Use the official Bun image
FROM oven/bun:1.2.12

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY frontend/package*.json ./frontend/

# Install dependencies
WORKDIR /app/frontend
RUN bun add -D @metamask/providers @types/node
RUN bun install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Build your frontend
RUN bun run build

# Expose the app port
EXPOSE 9090

# Start the Vite development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0", "--port", "9090"]
