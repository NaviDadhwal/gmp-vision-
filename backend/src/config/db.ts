import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB(): Promise<typeof mongoose> {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production', // Build indexes in dev, managed in prod
    });

    console.log(`✅ [MongoDB] Connected successfully to host: ${conn.connection.host} (DB: ${conn.connection.name})`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ [MongoDB] Connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ [MongoDB] Disconnected from database');
    });

    return conn;
  } catch (error) {
    console.error('❌ [MongoDB] Initial connection failed:', error);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('🔌 [MongoDB] Connection closed gracefully');
}
