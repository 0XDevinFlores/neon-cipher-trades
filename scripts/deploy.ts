import { ethers } from "hardhat";

async function main() {
  console.log("Deploying NeonCipherTrades contract...");

  const NeonCipherTrades = await ethers.getContractFactory("NeonCipherTrades");
  const neonCipherTrades = await NeonCipherTrades.deploy();

  await neonCipherTrades.waitForDeployment();

  const address = await neonCipherTrades.getAddress();
  console.log("NeonCipherTrades deployed to:", address);

  // Initialize market data
  console.log("Initializing market data...");
  await neonCipherTrades.updateMarketData(
    100000, // $1000 current price (in cents)
    2500,   // 25% volatility (in basis points)
    true    // Market is open
  );

  console.log("Market data initialized successfully");
  console.log("Contract deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
