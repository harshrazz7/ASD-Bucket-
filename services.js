const { readData, writeData } = require('../database/db');

async function getAllProducts() {
  return await readData();
}

async function getProductById(id) {
  const products = await readData();
  return products.find(p => p.id === id);
}

async function addProduct(product) {
  const products = await readData();
  const newProduct = { id: Date.now().toString(), ...product };
  products.push(newProduct);
  await writeData(products);
  return newProduct;
}

async function updateProduct(id, updatedFields) {
  const products = await readData();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updatedFields };
  await writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readData();
  const filteredProducts = products.filter(p => p.id !== id);
  if (products.length === filteredProducts.length) return false;

  await writeData(filteredProducts);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};