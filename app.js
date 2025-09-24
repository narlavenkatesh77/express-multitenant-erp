import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import { centralDb } from "./configs/db.js";
import Tenant from "./models/central/tenant.model.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/products", productRoutes);

// Health check
app.get("/", (req, res) => res.send("ERP Multi-tenant API Running"));

// Init DB
(async () => {
  try {
    await centralDb.authenticate();
    await Tenant.sync();
    console.log("✅ Central DB connected");
  } catch (err) {
    console.error("❌ Central DB error:", err);
  }
})();

export default app; // ✅ default export
