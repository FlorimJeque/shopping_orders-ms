import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default {
  /**
   * @param {*} data
   */
  generateToken: async (data: object) => {
    return await jwt.sign({ data }, process.env.SERVER_KEY, { expiresIn: '1h' });
  },

  /**
   * @param {*} token
   */
  decodeToken: async (token: string) => {
    return await jwt.verify(token, process.env.SERVER_KEY);
  },

  /**
   * Function to authorize and proceed to next middleware
   */
  authorize: async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
      return res.status(401).send({ message: 'Access denied', authenticated: false });
    } else {
      await jwt.verify(token, process.env.SERVER_KEY, (error: object, userDecoded: object) => {
        if (error) {
          return res.status(408).send({ message: 'Session expired', authenticated: false, error });
        } else {
          next();
        }
      });
    }
  },
};

/**
 *
 * @param {*} req requisicao
 */
const getToken = (req) => {
  return req.body.token || req.query.token || req.headers['x-access-token'];
};
