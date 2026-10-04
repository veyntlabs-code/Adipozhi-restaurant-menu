import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUserDoc extends Document {
  name: string;
  email: string;
  passwordHash: string;
  restaurantId: mongoose.Types.ObjectId;
  role: "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    role: { type: String, enum: ["ADMIN"], default: "ADMIN" },
  },
  { timestamps: true }
);

AdminUserSchema.index({ restaurantId: 1 });

const AdminUser: Model<IAdminUserDoc> =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUserDoc>("AdminUser", AdminUserSchema);

export default AdminUser;
