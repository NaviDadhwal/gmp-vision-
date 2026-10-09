"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
let cachedPromise = null;
async function connectDB() {
    // 1. If connection is already established, reuse immediately
    if (mongoose_1.default.connection.readyState >= 1) {
        return mongoose_1.default;
    }
    // 2. If a connection attempt is in-flight, await the existing promise
    if (cachedPromise) {
        return cachedPromise;
    }
    // 3. Initiate new connection and cache promise
    cachedPromise = (async () => {
        try {
            const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI, {
                autoIndex: env_1.env.NODE_ENV !== 'production', // Build indexes in dev, managed in prod
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`✅ [MongoDB] Connected successfully to host: ${conn.connection.host} (DB: ${conn.connection.name})`);
            mongoose_1.default.connection.on('error', (err) => {
                console.error('❌ [MongoDB] Connection error:', err);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.warn('⚠️ [MongoDB] Disconnected from database');
            });
            return conn;
        }
        catch (error) {
            cachedPromise = null;
            console.error('❌ [MongoDB] Initial connection failed:', error);
            if (env_1.env.NODE_ENV === 'production' && !process.env.VERCEL) {
                process.exit(1);
            }
            throw error;
        }
    })();
    return cachedPromise;
}
async function disconnectDB() {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
        cachedPromise = null;
        console.log('🔌 [MongoDB] Connection closed gracefully');
    }
}
