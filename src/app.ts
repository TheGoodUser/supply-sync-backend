import express from "express";
import poRoutes from "./routes/po";

const app = express();
app.use(express.json());

app.use("/api", poRoutes);

app.listen(9898, () => console.log("Server running on port 9898"));
