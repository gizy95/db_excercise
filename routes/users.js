import express from 'express';
import { getUsers, getUser } from '../controllers/usersController.js';


const usersRouter = express.Router();


filmsRouter.get('/', getUsers);
filmsRouter.get('/:id', getUser);

export default usersRouter;