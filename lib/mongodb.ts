/**
 * MongoDB Connection Utility
 * 
 * This module provides a cached connection to MongoDB for use in
 * Next.js API routes. It's optimized for serverless environments
 * (like Vercel) by caching the connection promise.
 * 
 * Environment Variable Required:
 * - MONGODB_URI: Your MongoDB connection string
 * 
 * @example
 * import { connectToDatabase } from '@/lib/mongodb';
 * await connectToDatabase();
 */

import mongoose from 'mongoose';

// Define TypeScript interface for the cached connection
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Declare global type for caching in development
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage in development.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Connects to MongoDB and returns the mongoose instance.
 * Uses connection caching for optimal performance in serverless environments.
 * 
 * @returns Promise<typeof mongoose> - The mongoose connection instance
 * @throws Error if MONGODB_URI is not defined
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
    // Check for MONGODB_URI at runtime (allows graceful error handling in API routes)
    if (!MONGODB_URI) {
        throw new Error(
            'MONGODB_URI or MONGO_URL is not defined. Please add it to .env.local file.'
        );
    }
    // Return cached connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // Create new connection promise if not cached
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log('✅ Connected to MongoDB');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
