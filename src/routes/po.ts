import { Router, Request, Response } from "express";
import { contractInstance } from "../services/contract";

const router = Router();

router.post("/create-po", async (req: Request, res: Response) => {
  try {
    const { purchaseOrder } = req.body;

    if (!purchaseOrder) {
      return res.status(400).json({
        error: "purchaseOrder object is required",
      });
    }

    // 👇 Validate STRICT JSON structure
    const requiredMainFields = [
      "poNumber",
      "poDate",
      "poExpiryDate",
      "currency",
      "status",
      "buyer",
      "supplier",
      "shippingDetails",
      "items",
      "totals",
    ];

    for (const f of requiredMainFields) {
      if (!purchaseOrder[f]) {
        return res.status(400).json({ error: `Missing: purchaseOrder.${f}` });
      }
    }

    // ---------------------------------------------------------
    // YOUR BLOCKCHAIN STRUCTURE ↓
    // You will pack full JSON into a single string
    // OR parse and send individual fields — up to your contract
    // ---------------------------------------------------------

    const poJsonString = JSON.stringify(purchaseOrder);

    // Your solidity function should accept string calldata (poJson)
    const tx = await contractInstance.createPO(poJsonString);

    const receipt = await tx.wait();

    const event = receipt.events?.find((e: any) => e.event === "POCreated");

    const poId = event?.args?.poId?.toString();

    return res.json({
      success: true,
      poId,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error("Error creating PO:", err);
    return res.status(500).json({ error: "Failed to create PO" });
  }
});

export default router;
