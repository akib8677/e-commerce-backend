import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

export interface IAddress extends Document {
  user: IUser['_id'];
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddressSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address_line1: { type: String, required: true },
  address_line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Address = mongoose.model<IAddress>('Address', AddressSchema);
export default Address;
