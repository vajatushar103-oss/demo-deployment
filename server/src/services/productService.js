import Product from '../models/Product.js';

export async function findProducts() {
  return Product.find().sort({ createdAt: 1 }).lean();
}
