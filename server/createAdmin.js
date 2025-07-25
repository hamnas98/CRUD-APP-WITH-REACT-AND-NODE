

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';


dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' MongoDB Connected');
  } catch (err) {
    console.error(' MongoDB connection failed', err);
    process.exit(1);
  }
};

const createAdmmin = async () => {
  try {

    const adminEmail = 'admin@crud.com';
    const adminPassword = 'admin123';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(' Admin already exists');
      process.exit();
    }

    // Create admin
    const admin = await Admin.create({
      email: adminEmail,
      password: adminPassword,
    });

    console.log(' Admin created:', admin.email);
    process.exit();
  } catch (err) {
    console.error(' Admin creation failed:', err);
    process.exit(1);
  }
};


connectDB().then(createAdmmin);
