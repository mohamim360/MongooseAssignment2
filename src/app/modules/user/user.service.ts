import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserDB = async (user: User) => {

  const savedUser = await UserModel.create(user);
  const result = await UserModel.findOne(
    { userId: savedUser.userId },
    { password: 0, orders: 0 },
  ).select({
    _id: 0,
    __v: 0,
  });
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    email: 1,
    age: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId }).select({
    password: 0,
    _id: 0,
    __v: 0,
    orders: 0,
  });
  return result;
};

export const UserServices = {
  createUserDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
