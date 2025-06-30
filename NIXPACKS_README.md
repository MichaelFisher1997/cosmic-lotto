# Nixpacks Configuration for Cosmic Lotto

This project includes Nixpacks configuration for building containerized applications. Here's how to use it:

## Prerequisites

- [Nix](https://nixos.org/download.html) package manager
- [Nixpacks](https://nixpacks.com/) CLI tool

## Building the Image

1. Install Nixpacks (if not already installed):
   ```bash
   curl -sSL https://nixpacks.com/install.sh | bash
   ```

2. Build the Docker image:
   ```bash
   nixpacks build . -p 9090 --name cosmic-lotto
   ```

## Environment Variables

Set required environment variables:
```bash
export VITE_RPC_URL="your-infura-url"
export VITE_NETWORK_ID=1  # 1 for mainnet, 5 for Goerli, etc.
```

## Development with Nix Shell

1. Enter the development shell:
   ```bash
   nix-shell
   ```

2. Start the development server:
   ```bash
   cd frontend
   bun install
   bun run dev
   ```

## Production Build

To create a production-optimized build:

```bash
nixpacks build . -p 9090 --name cosmic-lotto-prod --env NODE_ENV=production
```

## Deployment

### To Docker Hub
```bash
docker tag cosmic-lotto yourusername/cosmic-lotto:latest
docker push yourusername/cosmic-lotto:latest
```

### To a Container Registry
```bash
docker tag cosmic-lotto your-registry.com/your-org/cosmic-lotto:latest
docker push your-registry.com/your-org/cosmic-lotto:latest
```

## Configuration

- **nixpacks.toml**: Defines build phases and container settings
- **shell.nix**: Development environment with all dependencies

## Customization

Edit `nixpacks.toml` to:
- Change build commands
- Adjust resource limits
- Modify environment variables
- Configure file copying rules
