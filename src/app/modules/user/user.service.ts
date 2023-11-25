import config from '../../config';
import { TOrder, TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
const createUserDB = async (user: TUser) => {
  const savedUser = await User.create(user);
  const result = await User.findOne(
    { userId: savedUser.userId },
    { password: 0 },
  ).select({
    _id: 0,
    __v: 0,
    orders: 0,
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
    if (userData.password) {
      userData.password = await bcrypt.hash(
        userData.password,
        Number(config.bcrypt_salt_rounds),
      );
    }

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

const AddNewProductInOrder = async (userId: string, orderData: TOrder) => {
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const user = await User.findOne({ userId });

    if (user && Array.isArray(user.orders) && user.orders.length > 0) {
      const result = await User.updateOne(
        { userId },
        { $push: { orders: orderData } },
      );

      return result;
    } else {
      const result = await User.updateOne(
        { userId },
        { $set: { orders: [orderData] } },
      );

      return result;
    }
  } else {
    return null;
  }
};

const getSingleUserOrderFromDB = async (userId: string) => {
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const result = await User.findOne({ userId }).select({
      orders: 1,
      _id: 0,
    });
    return result;
  } else {
    return null;
  }
};

const getTotalPriceOfSingleUserOrder = async (userId: string) => {
  const isUserExists = await User.isUserExists(userId);

  if (isUserExists) {
    const result = await User.aggregate([
      {
        $match: { userId: 1 },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      }
    ]);
		return result.length > 0 ? { totalPrice: result[0].totalPrice } : null
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
  AddNewProductInOrder,
  getSingleUserOrderFromDB,
  getTotalPriceOfSingleUserOrder,
};
