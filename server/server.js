import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import tokenRoutes from './routes/tokenRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/users',userRoutes) 
app.use('/api/admin',adminRoutes);
app.use('/api/token',tokenRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))