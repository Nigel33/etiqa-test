import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  phoneNumber?: string;
  skillsets: string[];
  hobby?: string;
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  skillsets: [{ type: String }],
  hobby: { type: String },
});

export const User  = mongoose.model<UserDocument>('User ', UserSchema);
