// Run this script via `npx ts-node transferERC20.ts`

import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function transferERC20() {
  const privateKey = process.env.PRIVATE_KEY || "";
  const rpcUrl = process.env.RPC_URL_MUMBAI || "";

  // Initialize provider and signer
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  // ERC20 Contract Address and ABI
  const contractAddress = "0xf5d5Ea0a5E86C543bEC01a9e4f513525365a86fD";
  const contractABI = [
    "function transfer(address, uint256) returns (bool)",
    "function balanceOf(address) view returns (uint256)"
  ];

  // Create contract reference
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
  // Checking the balance
  try {
    const balance = await contract.balanceOf(signer.address);
    console.log(`Balance of ${signer.address}:`, ethers.formatEther(balance));
  } catch (error) {
    console.error("Failed to fetch balance:", error);
  }

  // Transfer details
  const recipientAddress = "0x47566C6c8f70E4F16Aa3E7D8eED4a2bDb3f4925b";
  const amount = ethers.parseUnits("1"); // for example, transferring 1 token

  // Execute transfer
  try {
    const tx = await contract.transfer(recipientAddress, amount);
    console.log("Transaction Hash:", tx.hash);
    await tx.wait();
    console.log("Transfer completed");
  } catch (error) {
    console.error("Transfer failed:", error);
  }
}

transferERC20();
