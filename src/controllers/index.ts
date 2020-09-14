import { Request, Response } from 'express';
import http from '../utils/http';

export default {
  index: async (req: Request, res: Response) => {
    http.sendResponse(res, 200, { test: 'Sent' });
  },
};
