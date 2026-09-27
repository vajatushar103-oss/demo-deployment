import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({
  property: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  specifications: { type: [specificationSchema], default: [] },
  slug: { type: String, unique: true, index: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
