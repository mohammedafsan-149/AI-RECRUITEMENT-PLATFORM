const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recruitment_platform', {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.log(`[Notice] Local MongoDB not active (${error.message}). Running in mock in-memory development mode.`);
  }
};

module.exports = connectDB;
