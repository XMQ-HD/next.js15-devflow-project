import { Schema, Types, models, model } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string; // Google, Github, Email and others.
  providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", reuqired: true },
    name: { type: String, reuqired: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, reuqired: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
