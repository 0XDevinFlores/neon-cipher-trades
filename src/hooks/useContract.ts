import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { contractAddress } from '../lib/web3';

const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint32", "name": "_strikePrice", "type": "uint32"},
      {"internalType": "uint32", "name": "_quantity", "type": "uint32"},
      {"internalType": "uint32", "name": "_premium", "type": "uint32"},
      {"internalType": "bool", "name": "_isCall", "type": "bool"},
      {"internalType": "uint32", "name": "_expiryTime", "type": "uint32"}
    ],
    "name": "createPosition",
    "outputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint32", "name": "_positionId", "type": "uint32"}],
    "name": "closePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserPositions",
    "outputs": [{"internalType": "uint32[]", "name": "", "type": "uint32[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint32", "name": "_positionId", "type": "uint32"}],
    "name": "getPositionDetails",
    "outputs": [
      {"internalType": "address", "name": "trader", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useNeonCipherContract = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
  });

  const createPosition = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'createPosition',
  });

  const closePosition = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'closePosition',
  });

  const getUserPositions = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserPositions',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const getPositionDetails = (positionId: number) => {
    return useContractRead({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getPositionDetails',
      args: [positionId],
    });
  };

  return {
    contract,
    createPosition,
    closePosition,
    getUserPositions,
    getPositionDetails,
  };
};
