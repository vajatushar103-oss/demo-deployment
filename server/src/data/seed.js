import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';
import { products } from './products.js';

await connectDB();
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products.`);
process.exit(0);
