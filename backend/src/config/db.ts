import mongoose from 'mongoose';
import { env } from './env';

let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<typeof mongoose> {
  // 1. If connection is already established, reuse immediately
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  // 2. If a connection attempt is in-flight, await the existing promise
  if (cachedPromise) {
    return cachedPromise;
  }

  // 3. Initiate new connection and cache promise
  cachedPromise = (async () => {
    try {
      const conn = await mongoose.connect(env.MONGODB_URI, {
        autoIndex: env.NODE_ENV !== 'production', // Build indexes in dev, managed in prod
        serverSelectionTimeoutMS: 5000,
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
      cachedPromise = null;
      console.error('❌ [MongoDB] Initial connection failed:', error);
      if (env.NODE_ENV === 'production' && !process.env.VERCEL) {
        process.exit(1);
      }
      throw error;
    }
  })();

  return cachedPromise;
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cachedPromise = null;
    console.log('🔌 [MongoDB] Connection closed gracefully');
  }
}

