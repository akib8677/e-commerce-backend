import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", productSchema);
