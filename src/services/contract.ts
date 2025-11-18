import { ethers } from "ethers";
import * as contractJson from "../../artifacts/contracts/CreatePO.sol/PurchaseOrderContract.json";
import dotenv from "dotenv";

// env variables
dotenv.config();

// Hardhat local node RPC
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Use account[0] from Hardhat as signer
const wallet = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY ?? "",
  provider
);

// Replace with deployed contract address
const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS ?? "";

// Create contract instance
export const contractInstance = new ethers.Contract(
  contractAddress,
  contractJson.abi,
  wallet
);
