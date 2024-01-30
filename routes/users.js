import express from 'express';
import { getUsers, getUser, postUser, modifyUser, deleteUser, getOrdersByUserId } from '../controllers/usersController.js';



const usersRouter = express.Router();


usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', postUser);
usersRouter.put('/:id', modifyUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/:id/orders', getOrdersByUserId);

export default usersRouter;