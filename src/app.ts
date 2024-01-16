import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/routes';

import cartRoutes from './routes/cart.routes';

import './services/consumers';
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', routes);
app.use('/cart', cartRoutes);
export default app;
