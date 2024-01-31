import { Request, Response } from 'express';
import prisma from '../services/prisma';
import http from '../utils/http';

class CartController {
  async addProductToCart(req: Request, res: Response) {
    try {
      const product = await prisma.product.findFirst({ where: { externalId: req.body.productId } });
      if (!product) {
        http.sendResponse(res, 404, { message: 'Product not found' });
        return;
      }

      let cart = await prisma.cart.findFirst({
        where: {
          customerId: req.body.customerId,
          isActive: true,
        },
      });
      let data = {
        originalPrice: product?.price,
        quatity: parseInt(req.body.quantity),
        cartId: parseInt(cart?.id + ''),
        productId: parseInt(product?.id + ''),
      };
      if (cart) {
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            productId: product?.id,
            cartId: cart.id,
          },
        });

        if (cartItem) {
          await prisma.cartItem.update({
            where: { id: cartItem?.id },
            data: data,
          });
          http.sendResponse(res, 201, { message: 'Cart updated' });
          return;
        }
        await prisma.cartItem.create({
          data: {
            originalPrice: data.originalPrice,
            quatity: data.quatity,
            cartId: data.cartId,
            productId: parseInt(product.id + ''),
          },
        });
      } else {
        const customer = await prisma.customer.findUnique({ where: { externalId: req.body.customerId } });
        delete data.cartId;
        cart = await prisma.cart.create({
          data: {
            customerId: parseInt(customer?.id + ''),
            cartItems: { create: data },
          },
        });
      }

      http.sendResponse(res, 201, { message: 'Product added to cart' });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error, body: req.body });
    }
  }

  async listCartItems(req: Request, res: Response) {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          id: parseInt(req.params.cartId),
        },
        include: {
          cartItems: {
            select: {
              originalPrice: true,
              quatity: true,
              product: { select: { name: true } },
            },
          },
        },
      });
      http.sendResponse(res, 200, { message: 'Retrieved order items', cart });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error, body: req.body });
    }
  }

  async getCustomerActiveCart(req: Request, res: Response) {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          customer: { externalId: parseInt(req.params.customerId) },
        },
        include: {
          cartItems: {
            select: {
              originalPrice: true,
              quatity: true,
              product: { select: { name: true } },
            },
          },
        },
      });
      http.sendResponse(res, 201, { message: 'Retrieved order items', cart });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error, body: req.body });
    }
  }

  async getAllCustomerItems(req: Request, res: Response) {
    try {
      const items = await prisma.cartItem.findMany({
        where: {
          cart: {
            customer: { externalId: parseInt(req.params.customerId) },
          },
        },
        include: {
          product: { select: { name: true } },
        },
      });
      http.sendResponse(res, 201, { message: 'Retrieved order items', items });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error, body: req.body });
    }
  }

  async removeItemFromCart(req: Request, res: Response) {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          id: req.body.cartId,
          customer: req.body.customerId,
          isActive: true,
        },
      });

      if (!cart) {
        http.sendResponse(res, 404, { message: 'Resource not found' });
      }

      await prisma.cartItem.delete({
        where: {
          cartId: parseInt(cart?.id),
          product: { externalId: req.body.productId },
        },
      });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error, body: req.body });
    }
  }
}

export default new CartController();
