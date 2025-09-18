import { expect } from "chai";
import { ethers } from "hardhat";
import { NeonCipherTrades } from "../typechain-types";

describe("NeonCipherTrades", function () {
  let neonCipherTrades: NeonCipherTrades;
  let owner: any;
  let trader: any;

  beforeEach(async function () {
    [owner, trader] = await ethers.getSigners();
    
    const NeonCipherTrades = await ethers.getContractFactory("NeonCipherTrades");
    neonCipherTrades = await NeonCipherTrades.deploy();
    await neonCipherTrades.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await neonCipherTrades.owner()).to.equal(owner.address);
    });

    it("Should initialize with correct values", async function () {
      expect(await neonCipherTrades.nextPositionId()).to.equal(1);
    });
  });

  describe("Position Creation", function () {
    it("Should create a position successfully", async function () {
      const strikePrice = 100000; // $1000
      const quantity = 10;
      const premium = ethers.parseEther("0.1");
      const isCall = true;
      const expiryTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now

      await expect(
        neonCipherTrades.connect(trader).createPosition(
          strikePrice,
          quantity,
          premium,
          isCall,
          expiryTime,
          { value: premium }
        )
      ).to.emit(neonCipherTrades, "PositionCreated");
    });

    it("Should reject position with insufficient premium", async function () {
      const strikePrice = 100000;
      const quantity = 10;
      const premium = ethers.parseEther("0.0001"); // Too low
      const isCall = true;
      const expiryTime = Math.floor(Date.now() / 1000) + 86400;

      await expect(
        neonCipherTrades.connect(trader).createPosition(
          strikePrice,
          quantity,
          premium,
          isCall,
          expiryTime,
          { value: premium }
        )
      ).to.be.revertedWith("Premium too low");
    });
  });

  describe("Market Data", function () {
    it("Should update market data by owner", async function () {
      const currentPrice = 105000;
      const volatility = 3000;
      const isMarketOpen = true;

      await expect(
        neonCipherTrades.updateMarketData(currentPrice, volatility, isMarketOpen)
      ).to.emit(neonCipherTrades, "MarketDataUpdated");
    });

    it("Should reject market data update by non-owner", async function () {
      const currentPrice = 105000;
      const volatility = 3000;
      const isMarketOpen = true;

      await expect(
        neonCipherTrades.connect(trader).updateMarketData(currentPrice, volatility, isMarketOpen)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Access Control", function () {
    it("Should allow owner to pause market", async function () {
      await neonCipherTrades.emergencyPause();
      // Market should be paused
    });

    it("Should allow owner to resume market", async function () {
      await neonCipherTrades.emergencyResume();
      // Market should be resumed
    });

    it("Should reject non-owner from pausing", async function () {
      await expect(
        neonCipherTrades.connect(trader).emergencyPause()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
