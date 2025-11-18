import { Router } from "express";
import multer from "multer";
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

import cors from "cors";


//multer and router setup
const upload = multer();
const router = Router();

//creating server here
const app = express();

app.use(cors({
  origin: "*",          // allow ALL origins
  methods: "*",         // allow ALL HTTP methods
  allowedHeaders: "*",  // allow ALL custom headers
}));

app.use(express.json());
app.use("/api", router);


//calling the server directly from here
dotenv.config();
app.listen(5173, "0.0.0.0", () => {
  console.log("Server running at http://0.0.0.0:5173");
});


//function to extract PO data from image
async function extractPOFromImage(buffer) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const base64Image = buffer.toString("base64");

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: `
You are an OCR + document extraction model. 
Extract all necessary data from the Purchase Order image and return ONLY valid JSON given below
{
  "purchaseOrder": {
    "poNumber": "",
    "poDate": "",
    "poExpiryDate": "",
    "currency": "INR",
    "status": "Issued",

    "buyer": {
      "name": "",
      "address": "",
      "gstin": "",
      "contactPerson": "",
      "contactNumber": "",
      "email": ""
    },

    "supplier": {
      "name": "",
      "address": "",
      "gstin": "",
      "supplierCode": "",
      "contactPerson": "",
      "contactNumber": "",
      "email": ""
    },

    "shippingDetails": {
      "shipTo": {
        "name": "",
        "address": "",
        "gstin": "",
        "contactNumber": "",
        "email": ""
      },
      "deliveryTerms": "",
      "paymentTerms": "",
      "deliveryDueDays": 0
    },

    "items": [
      {
        "serialNo": 0,
        "productCode": "",
        "productName": "",
        "hsnCode": "",
        "quantity": 0,
        "unit": "nos/kg/box",
        "ratePerUnit": 0,
        "taxPercentage": 0,
        "amount": 0
      }
    ],

    "totals": {
      "subTotal": 0,
      "taxTotal": 0,
      "discount": 0,
      "grandTotal": 0
    }
  }
}
no hallucinations
NO backticks.
 NO explanations. ONLY JSON.
            `,
          },
        ],
      },
    ],
  });

  let textOutput = result.response.text();

  // 🧹 remove markdown fences
  textOutput = textOutput
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(textOutput);
  } catch (err) {
    console.error("JSON parse error:", err, "\nRAW OUTPUT:", textOutput);
    throw new Error("Model did not return valid JSON");
  }
}


//routing setup
router.post("/hello", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file missing" });
    }

    const rawData = await extractPOFromImage(req.file.buffer);

    return res.json({
      success: true,
      data: rawData,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to process image",
      details: err.message,
    });
  }
});

export default router;
