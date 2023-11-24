import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const result = await UserServices.createUserDB(student);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers= async (req: Request, res: Response) => {
  try{
		const result = await UserServices.getAllUsersFromDB()

		res.status(200).json({
      success: true,
			message: "Users fetched successfully!",
      data: result,
    });
	} catch (err) {
    console.log(err);
  }
}

export const UserControllers = {
	createUser,getAllUsers
}