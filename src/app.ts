import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import routes from './routes/routes';
import cartRoutes from './routes/cart.routes';
import openapiSpec from '../swagger.js';
import './services/consumers';
import redoc from 'redoc-express';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsDoc(openapiSpec)));
app.get('/docs/swagger.json', (req, res) => {
  res.sendFile('swagger.json', { root: '.' });
});
app.get(
  '/docs',
  redoc({
    title: 'API Docs',
    specUrl: '/docs/swagger.json',
  })
);

app.get('/', routes);
app.use('/cart', cartRoutes);
export default app;
