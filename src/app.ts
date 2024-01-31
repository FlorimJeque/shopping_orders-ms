import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import routes from './routes/routes';
import cartRoutes from './routes/cart.routes';

import './services/consumers';
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'REST A.PI for Swagger Documentation',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:' + process.env.PORT }],
  },
  apis: [`${__dirname}/routes/*routes.ts`, './dist/routes/example-route.js'],
};

const specs = swaggerJsDoc({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'REST API for Swagger Documentation',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:' + process.env.PORT }],
  },
  apis: [`${__dirname}/routes/*routes.ts`, './dist/routes/example-route.js'],
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.get('/', routes);
app.use('/cart', cartRoutes);
export default app;
