import { Response, Request } from 'express';

export default {
  /**
   * It returns a response to the client
   */
  sendResponse: (response: Response, statusCode: number, data: object) => {
    response.status(statusCode);
    response.send(data);
    return;
  },

  /**
   * Extracts the page number and limit of records needed to send back to the client
   */
  getPageLimitFromRequest: (request: Request) => {
    const limit = request.query.limit === undefined ? 10 : request.query.limit;
    const page = request.query.page === undefined ? 0 : request.query.page;
    return {
      page,
      limit,
    };
  },
};
