import express from 'express';
import { getOrders, getOrder, postOrder, modifyOrder, deleteOrder } from '../controllers/ordersController.js';



const ordersRouter = express.Router();


ordersRouter.get('/', getOrders);
ordersRouter.get('/:id', getOrder);
ordersRouter.post('/', postOrder);
ordersRouter.put('/:id', modifyOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;