import mongoose from 'mongoose';

let isConnected = false; // Track connection status

const dbConnect = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = connection.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default dbConnect;
