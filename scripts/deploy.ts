import { ethers } from "hardhat";

async function main() {
  const POContract = await ethers.getContractFactory("PurchaseOrderContract");
  const deployed = await POContract.deploy();
  await deployed.waitForDeployment();

  console.log("SupplyChain deployed at:", deployed.target);
}

main();
