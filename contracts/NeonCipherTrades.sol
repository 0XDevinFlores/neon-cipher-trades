// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NeonCipherTrades is Ownable, ReentrancyGuard {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct OptionPosition {
        euint32 positionId;
        euint32 strikePrice;
        euint32 quantity;
        euint32 premium;
        ebool isCall;
        ebool isActive;
        euint32 expiryTime;
        address trader;
        uint256 createdAt;
    }
    
    struct MarketData {
        euint32 currentPrice;
        euint32 volatility;
        ebool isMarketOpen;
        uint256 lastUpdate;
    }
    
    mapping(uint32 => OptionPosition) public positions;
    mapping(address => uint32[]) public userPositions;
    MarketData public marketData;
    
    uint32 public nextPositionId;
    uint256 public constant MIN_PREMIUM = 0.001 ether;
    uint256 public constant MAX_EXPIRY = 30 days;
    
    event PositionCreated(
        uint32 indexed positionId,
        address indexed trader,
        uint256 strikePrice,
        uint256 quantity,
        bool isCall
    );
    
    event PositionClosed(
        uint32 indexed positionId,
        address indexed trader,
        uint256 payout
    );
    
    event MarketDataUpdated(
        uint256 currentPrice,
        uint256 volatility,
        bool isMarketOpen
    );
    
    constructor() Ownable(msg.sender) {
        nextPositionId = 1;
    }
    
    function createPosition(
        uint32 _strikePrice,
        uint32 _quantity,
        uint32 _premium,
        bool _isCall,
        uint32 _expiryTime
    ) external payable nonReentrant returns (uint32) {
        require(msg.value >= MIN_PREMIUM, "Premium too low");
        require(_expiryTime > block.timestamp, "Invalid expiry time");
        require(_expiryTime <= block.timestamp + MAX_EXPIRY, "Expiry too far");
        require(_quantity > 0, "Invalid quantity");
        
        uint32 positionId = nextPositionId++;
        
        // Encrypt sensitive data using FHE
        euint32 encryptedStrikePrice = Fhe.asEuint32(_strikePrice);
        euint32 encryptedQuantity = Fhe.asEuint32(_quantity);
        euint32 encryptedPremium = Fhe.asEuint32(_premium);
        ebool encryptedIsCall = Fhe.asEbool(_isCall);
        euint32 encryptedExpiryTime = Fhe.asEuint32(_expiryTime);
        
        positions[positionId] = OptionPosition({
            positionId: Fhe.asEuint32(positionId),
            strikePrice: encryptedStrikePrice,
            quantity: encryptedQuantity,
            premium: encryptedPremium,
            isCall: encryptedIsCall,
            isActive: Fhe.asEbool(true),
            expiryTime: encryptedExpiryTime,
            trader: msg.sender,
            createdAt: block.timestamp
        });
        
        userPositions[msg.sender].push(positionId);
        
        emit PositionCreated(positionId, msg.sender, _strikePrice, _quantity, _isCall);
        
        return positionId;
    }
    
    function closePosition(uint32 _positionId) external nonReentrant {
        OptionPosition storage position = positions[_positionId];
        require(position.trader == msg.sender, "Not position owner");
        
        // Decrypt and check if position is active
        ebool isActive = position.isActive;
        require(Fhe.decrypt(isActive), "Position not active");
        
        // Check if position has expired
        euint32 expiryTime = position.expiryTime;
        uint32 decryptedExpiry = Fhe.decrypt(expiryTime);
        require(block.timestamp < decryptedExpiry, "Position expired");
        
        // Calculate payout based on encrypted data
        uint256 payout = calculatePayout(position);
        
        // Mark position as inactive
        position.isActive = Fhe.asEbool(false);
        
        // Transfer payout to trader
        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }
        
        emit PositionClosed(_positionId, msg.sender, payout);
    }
    
    function updateMarketData(
        uint32 _currentPrice,
        uint32 _volatility,
        bool _isMarketOpen
    ) external onlyOwner {
        marketData = MarketData({
            currentPrice: Fhe.asEuint32(_currentPrice),
            volatility: Fhe.asEuint32(_volatility),
            isMarketOpen: Fhe.asEbool(_isMarketOpen),
            lastUpdate: block.timestamp
        });
        
        emit MarketDataUpdated(_currentPrice, _volatility, _isMarketOpen);
    }
    
    function calculatePayout(OptionPosition storage position) internal view returns (uint256) {
        // Decrypt market data
        uint32 currentPrice = Fhe.decrypt(marketData.currentPrice);
        uint32 strikePrice = Fhe.decrypt(position.strikePrice);
        uint32 quantity = Fhe.decrypt(position.quantity);
        bool isCall = Fhe.decrypt(position.isCall);
        
        uint256 payout = 0;
        
        if (isCall) {
            // Call option: payout if current price > strike price
            if (currentPrice > strikePrice) {
                payout = (currentPrice - strikePrice) * quantity;
            }
        } else {
            // Put option: payout if current price < strike price
            if (currentPrice < strikePrice) {
                payout = (strikePrice - currentPrice) * quantity;
            }
        }
        
        return payout;
    }
    
    function getUserPositions(address _user) external view returns (uint32[] memory) {
        return userPositions[_user];
    }
    
    function getPositionDetails(uint32 _positionId) external view returns (
        address trader,
        uint256 createdAt,
        bool isActive
    ) {
        OptionPosition storage position = positions[_positionId];
        return (
            position.trader,
            position.createdAt,
            Fhe.decrypt(position.isActive)
        );
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }
    
    function emergencyPause() external onlyOwner {
        marketData.isMarketOpen = Fhe.asEbool(false);
    }
    
    function emergencyResume() external onlyOwner {
        marketData.isMarketOpen = Fhe.asEbool(true);
    }
}
