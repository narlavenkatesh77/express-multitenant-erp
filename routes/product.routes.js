import { Router } from "express";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.use(tenantMiddleware);

router.post("/", addProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
