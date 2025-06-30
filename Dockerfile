# Use the official Bun image
FROM oven/bun:1.2.12

# Set working directory inside the container
WORKDIR /app

# Copy all files from your project directory into the container
COPY . .

# Move into frontend directory
WORKDIR /app/frontend

# Install dependencies
RUN bun install --frozen-lockfile

# Build your frontend
RUN bun run build

# Expose the app port (Vite default is 5173, but we'll use 9090 as in the example)
EXPOSE 9090

# Start the Vite development server
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0", "--port", "9090"]
