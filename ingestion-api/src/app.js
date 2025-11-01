import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import eventRoutes  from './routes/eventRoute.js'


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/events", eventRoutes);



export default app;