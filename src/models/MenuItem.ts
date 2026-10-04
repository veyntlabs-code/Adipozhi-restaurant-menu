import mongoose, { Schema, Document, Model } from "mongoose";

export type FoodType = "VEG" | "NON_VEG" | "EGG";

export interface IMenuItemDoc extends Document {
  restaurantId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  image?: string;
  foodType: FoodType;
  isSpicy: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItemDoc>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    foodType: {
      type: String,
      enum: ["VEG", "NON_VEG", "EGG"],
      default: "VEG",
    },
    isSpicy: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

MenuItemSchema.index({ restaurantId: 1, categoryId: 1, displayOrder: 1 });
MenuItemSchema.index({ restaurantId: 1, isAvailable: 1 });
MenuItemSchema.index({ restaurantId: 1, isFeatured: 1 });

const MenuItem: Model<IMenuItemDoc> =
  mongoose.models.MenuItem ||
  mongoose.model<IMenuItemDoc>("MenuItem", MenuItemSchema);

export default MenuItem;
