import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description?: string;
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

export default mongoose.model<ICategory>("Category", categorySchema);
