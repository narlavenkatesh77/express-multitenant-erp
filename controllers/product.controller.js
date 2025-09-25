import ApiResponse from "../utils/apiresponse.js";
import asyncHandler from "../utils/asynchandler.js";

export const addProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const { Product } = req.tenantDb;

  const product = await Product.create({ name, price });
  res.json(new ApiResponse(201, product, "Product added"));
});

export const getProducts = asyncHandler(async (req, res) => {
  const { Product } = req.tenantDb;
  const products = await Product.findAll();
  res.json(new ApiResponse(200, products, "Products list"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const { Product } = req.tenantDb;

  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ error: "Not found" });

  product.name = name;
  product.price = price;
  await product.save();

  res.json(new ApiResponse(200, product, "Product updated"));
});

export const patchProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Product } = req.tenantDb;

  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ error: "Not found" });

  // Only update fields that are present in the request body
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] !== undefined) {
      product[key] = req.body[key];
    }
  });

  await product.save();

  res.json(new ApiResponse(200, product, "Product partially updated"));
});


export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Product } = req.tenantDb;

  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ error: "Not found" });

  await product.destroy();
  res.json(new ApiResponse(200, {}, "Product deleted"));
});
