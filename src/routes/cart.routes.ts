import { Router } from 'express';
import CartController from '../controllers/Cart.controller';

const routes = Router();

routes.post('/addProduct', CartController.addProductToCart);
routes.get('/getCart/:cartId', CartController.listCartItems);
routes.get('/getCustomerActiveCart/:customerId', CartController.getCustomerActiveCart);
routes.get('/getAllCustomerItems/:customerId', CartController.getAllCustomerItems);
export default routes;
