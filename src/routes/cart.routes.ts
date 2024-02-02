import { Router } from 'express';
import CartController from '../controllers/Cart.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     AddProductRequest:
 *       type: object
 *       properties:
 *         customerId:
 *           description: The id of the Customer that the cart belongs to
 *           type: integer
 *           required: true
 *           example: 3
 *         productId:
 *           description: The id of the Customer that the cart belongs to
 *           type: integer
 *           example: 3
 *         quantity:
 *           description: The id of the Customer that the cart belongs to
 *           type: integer
 *           example: 3
 *       required:
 *         - customerId
 *         - productId
 *         - quantity
 * tags:
 *   name: Cart
 *   description: Api to manage customer Cart
 */
const routes = Router();

/**
 * @swagger
 * /cart/addProduct:
 *   post:
 *      tags: [Cart]
 *      summary: Add a product or item to the customer active cart
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AddProductRequest'
 *      responses:
 *        201:
 *          description: Item added to card
 *        404:
 *          description: Product not found
 *        500:
 *          description: Error while trying to add a product to an active cart
 *
 */
routes.post('/addProduct', CartController.addProductToCart);

/**
 * @swagger
 * /cart/getCart/{cartId}:
 *   get:
 *      tags: [Cart]
 *      summary: Return a cart with items
 *      parameters:
 *          - in: path
 *            name: cartId
 *      responses:
 *        200:
 *          description: Cart returned with items
 *          content:
 *            'application/json': {}
 *        404:
 *          description: Cart not found
 *          content:
 *            'application/json': {}
 */
routes.get('/getCart/:cartId', CartController.listCartItems);
/**
 * @swagger
 * /cart/getCustomerActiveCart/{customerId}:
 *   get:
 *      tags: [Cart]
 *      summary: Return a customer active cart with items
 *      parameters:
 *          - in: path
 *            name: customerId
 *      responses:
 *        200:
 *          description: Cart returned with items
 *          content:
 *            'application/json': {}
 *        404:
 *          description: Cart not found
 *          content:
 *            'application/json': {}
 */
routes.get('/getCustomerActiveCart/:customerId', CartController.getCustomerActiveCart);

/**
 * @swagger
 * /cart/getAllCustomerItems/{customerId}:
 *   get:
 *      tags: [Cart]
 *      summary: Return all customer items added even if the cart has been processed
 *      parameters:
 *          - in: path
 *            name: customerId
 *      responses:
 *        200:
 *          description: Cart returned with items
 *          content:
 *            'application/json': {}
 *        404:
 *          description: Cart not found
 *          content:
 *            'application/json': {}
 */
routes.get('/getAllCustomerItems/:customerId', CartController.getAllCustomerItems);

/**
 * @swagger
 * /cart/removeItemFromCart/{cartId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove one item from customer cart
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: Id of customer
 *               productId:
 *                 type: integer
 *                 description: Product id to be removed
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Cart not found
 *         content:
 *           'application/json': {}
 *       500:
 *         description: Server error
 *         content:
 *           'application/json': {}
 */
routes.delete('/removeItemFromCart/:cartId', CartController.removeItemFromCart);

/**
 * @swagger
 * /cart/clearCart/{cartId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Clear customer active cart
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: Id of customer
 *     responses:
 *       200:
 *         description: Cart cleared
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Cart not found
 *         content:
 *           'application/json': {}
 *       500:
 *         description: Server error
 *         content:
 *           'application/json': {}
 */
routes.delete('/clearCart/:cartId', CartController.clearCart);

export default routes;
