import { Model } from 'mongoose';

 // Type for full name
export type TFullName = {
  firstName: string;
  lastName: string;
};

// Type for address
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// Type for order
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

 // Type for user
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[] ;
};

// Mongoose UserModel interface with custom method
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser | null>;
}
