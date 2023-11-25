import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const fullNameSchema = new Schema<TFullName>(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: [true, 'User ID is required'], unique: true },
  username: { type: String, required: [true, 'Username is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: fullNameSchema, required: [true, 'Full name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema],required: false },
});

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

userSchema.pre('save', async function (next) {

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 
  
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
