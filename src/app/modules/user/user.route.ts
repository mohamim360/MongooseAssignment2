import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteSingleUser);
router.put('/users/:userId', UserControllers.updateSingleUser);

router.put('/users/:userId/orders', UserControllers.updateNewOrder);
router.get('/users/:userId/orders', UserControllers.getUserOrder);
router.get('/users/:userId/orders/total-price',UserControllers.getTotalSumOfOrder)

export const UserRoutes = router;
