{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Build tools
    nodejs-18_x
    bun
    
    # Development tools
    git
    curl
    wget
    
    # Container tools
    docker
    docker-compose
  ];
  
  # Environment variables
  shellHook = ''
    export NODE_ENV=development
    export VITE_NETWORK_ID=1
    export VITE_RPC_URL="https://mainnet.infura.io/v3/YOUR-INFURA-KEY"
    
    echo "Development environment ready!"
    echo "Run 'docker-compose up --build' to start the application"
  '';
}
