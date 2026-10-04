import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRestaurantDoc extends Document {
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  phone?: string;
  address?: string;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema = new Schema<IRestaurantDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo: { type: String },
    description: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    currency: { type: String, default: "₹", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


const Restaurant: Model<IRestaurantDoc> =
  mongoose.models.Restaurant || mongoose.model<IRestaurantDoc>("Restaurant", RestaurantSchema);

export default Restaurant;
