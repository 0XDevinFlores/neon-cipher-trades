# Neon Cipher Trades

A privacy-preserving options trading platform built with Fully Homomorphic Encryption (FHE) technology. Trade options with encrypted strike prices and positions, ensuring complete privacy until expiry.

## Features

- **FHE-Encrypted Trading**: All sensitive trading data is encrypted using Fully Homomorphic Encryption
- **Private Position Management**: Your positions remain completely private until expiry
- **Real-time Market Data**: Live market feeds with encrypted price feeds
- **Wallet Integration**: Seamless connection with popular Web3 wallets
- **Zero-Knowledge Proofs**: Verify trades without revealing sensitive information

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Encryption**: FHEVM Solidity
- **Smart Contracts**: Hardhat, OpenZeppelin
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0XDevinFlores/neon-cipher-trades.git
cd neon-cipher-trades
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Development

1. Compile contracts:
```bash
npm run compile
```

2. Run tests:
```bash
npm run test
```

3. Deploy to Sepolia:
```bash
npm run deploy
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Contract Deployment
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Architecture

### Frontend
- React-based trading interface
- RainbowKit for wallet connection
- Real-time encrypted data visualization
- Privacy-preserving UI components

### Smart Contracts
- FHE-encrypted option contracts
- Private position management
- Encrypted strike price storage
- Zero-knowledge proof verification

### Security Features
- All sensitive data encrypted with FHE
- Private key management
- Secure multi-party computation
- Privacy-preserving analytics

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Security

This project implements state-of-the-art privacy-preserving technologies. All trading data is encrypted using Fully Homomorphic Encryption, ensuring your positions remain private until expiry.

## Support

For support and questions, please open an issue on GitHub.