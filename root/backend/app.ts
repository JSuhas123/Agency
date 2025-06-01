import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import auditRoutes from './routes/auditRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/audit', auditRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

export default app;
