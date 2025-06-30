# Build stage
FROM node:20.15.1-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copy source code
COPY frontend/ .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
