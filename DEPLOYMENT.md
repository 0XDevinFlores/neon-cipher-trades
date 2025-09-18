# Vercel Deployment Guide

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account
- Node.js installed locally (for testing)

### 1. Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on your dashboard
   - Select "Import Git Repository"
   - Choose `0XDevinFlores/neon-cipher-trades`
   - Click "Import"

### 2. Configure Build Settings

1. **Framework Preset**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Root Directory**
   - Leave as default (root of repository)

### 3. Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

#### Required Environment Variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address_here
```

#### Optional Environment Variables:
```
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

### 4. Deployment Process

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to the main branch
   - First deployment will be triggered immediately after import

2. **Manual Deployment**
   - Go to your project dashboard
   - Click "Deploy" button
   - Wait for build to complete

### 5. Domain Configuration

1. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **Default Domain**
   - Vercel provides a default domain: `your-project-name.vercel.app`

### 6. Post-Deployment Configuration

1. **Update Contract Address**
   - Deploy your smart contract to Sepolia testnet
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the application

2. **Test Deployment**
   - Visit your deployed URL
   - Test wallet connection
   - Verify all features work correctly

### 7. Smart Contract Deployment

Before the frontend can work properly, deploy the smart contract:

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to Sepolia (requires private key in .env)
npm run deploy
```

### 8. Monitoring and Maintenance

1. **Build Logs**
   - Monitor build logs in Vercel dashboard
   - Check for any build errors

2. **Performance**
   - Use Vercel Analytics for performance monitoring
   - Monitor Core Web Vitals

3. **Updates**
   - Push changes to main branch for automatic deployment
   - Use preview deployments for testing

### 9. Security Considerations

1. **Environment Variables**
   - Never commit private keys to repository
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **Smart Contract Security**
   - Audit contracts before mainnet deployment
   - Use multi-signature wallets for contract upgrades
   - Implement proper access controls

### 10. Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify no typos in values

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID
   - Check RPC URL accessibility
   - Ensure correct network configuration

4. **Contract Interaction Issues**
   - Verify contract address is correct
   - Check contract is deployed and verified
   - Ensure user has sufficient gas

### 11. Production Checklist

- [ ] All environment variables configured
- [ ] Smart contract deployed and verified
- [ ] Wallet connection working
- [ ] All features tested
- [ ] Custom domain configured (if needed)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Backup strategy in place

### 12. Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)
- **FHEVM Documentation**: [docs.fhevm.io](https://docs.fhevm.io)

### 13. Deployment URLs

After successful deployment, your application will be available at:
- **Production**: `https://neon-cipher-trades.vercel.app`
- **Preview**: `https://neon-cipher-trades-git-main-0xdevinflores.vercel.app`

### 14. Next Steps

1. **Test the Application**
   - Connect wallet
   - Test all trading features
   - Verify encryption functionality

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error rates
   - Optimize if needed

3. **Scale as Needed**
   - Upgrade Vercel plan if required
   - Implement CDN optimization
   - Add monitoring tools
