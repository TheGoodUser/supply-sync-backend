// 0x5FbDB2315678afecb367f032d93F642f64180aa3
import express, { Request, Response } from "express";
import { ethers } from "hardhat";

// Express setup
const app = express();
app.use(express.json());

// Local Hardhat provider
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Replace this with your deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABI for our contract
const ABI = [
  "function hello() public view returns (string)",
  "function add(uint256 a, uint256 b) public view returns (uint256)",
];

// Initialize contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// ROUTE 1 — Hello World
app.get("/hello", async (req: Request, res: Response) => {
  try {
    const result: string = await contract.hello();
    res.json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ROUTE 2 — Add Two Numbers
app.get("/add", async (req: Request, res: Response) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: "Invalid numbers provided" });
    }

    const result = await contract.add(a, b);
    res.json({ result: result.toString() });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(9898, () => console.log("API running on http://localhost:9898"));
