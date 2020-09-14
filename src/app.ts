import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/routes';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', routes);

export default app;
