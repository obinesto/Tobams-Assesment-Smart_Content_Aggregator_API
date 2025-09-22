import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  interests: string[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    interests: [{ type: String }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
