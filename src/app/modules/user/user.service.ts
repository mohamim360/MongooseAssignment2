import { TUser } from './user.interface';
import { User } from './user.model';

const createUserDB = async (user: TUser) => {
  const savedUser = await User.create(user);
  const result = await User.findOne(
    { userId: savedUser.userId },
    { password: 0, orders: 0 },
  ).select({
    _id: 0,
    __v: 0,
  });
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select({
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
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const result = await User.findOne({ userId }).select({
      password: 0,
      _id: 0,
      __v: 0,
      orders: 0,
    });
    return result;
  } else {
    return null;
  }
};

const updateSingleUserDataIntoDB = async (userId: string, userData: TUser) => {
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const result = await User.findOneAndUpdate(
      { userId },
      { $set: userData },
      { projection: { password: 0 }, new: true },
    ).select({
      _id: 0,
      __v: 0,
      orders: 0,
    });
    return result;
  } else {
    return null;
  }
};

const deleteSingleUserFromDB = async (userId: string) => {
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    return null;
  }
};

export const UserServices = {
  createUserDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserDataIntoDB,
};
