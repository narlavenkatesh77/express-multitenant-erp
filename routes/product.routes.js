import { Router } from "express";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  patchProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.use(tenantMiddleware);

router.post("/", addProduct);
router.patch("/:id", patchProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
