import { Router } from 'express';
import IndexController from '../controllers/index';

const routes = Router();

routes.get('', IndexController.index);

export default routes;
