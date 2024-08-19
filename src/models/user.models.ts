import mongoose, { Schema, Document } from "mongoose";
import { Message, messageSchema } from "./message.models";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username Is Required!"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    unique: true,
    match: [
      /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification Code is Required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verification Code Expiry is Required!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },
  messages: [messageSchema],
});

const UserModel =
  (mongoose.models.user as mongoose.Model<User>) ||
  mongoose.model<User>("user", userSchema);


export default UserModel;