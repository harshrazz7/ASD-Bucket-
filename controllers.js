const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

async function getProductById(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

async function createProduct(req, res) {
  const newProduct = await productService.addProduct(req.body);
  invalidateCache(); // Clear stale cache on mutation
  res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache(); // Clear stale cache on mutation
  res.json(updated);
}

async function deleteProduct(req, res) {
  const success = await productService.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Product not found' });
  }
  invalidateCache(); // Clear stale cache on mutation
  res.json({ message: 'Product deleted successfully' });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};