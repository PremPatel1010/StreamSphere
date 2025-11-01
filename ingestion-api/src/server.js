import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import db from './config/db.js';
import { connectKafka } from './kafka/producer.js';


dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

await connectKafka();

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})