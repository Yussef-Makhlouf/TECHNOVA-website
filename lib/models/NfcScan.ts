/**
 * NfcScan Mongoose Model
 * 
 * This model stores data from NFC chip scans. Each document represents
 * a single scan event with visitor information and the NFC tag identifier.
 * 
 * Fields:
 * - ip: Visitor's IP address (detected from x-forwarded-for or socket)
 * - userAgent: Browser/device user agent string
 * - language: Accept-Language header from the browser
 * - timestamp: When the scan occurred (defaults to current time)
 * - tagId: The NFC tag identifier from the URL parameter
 * 
 * Collection: nfcscans (lowercase, pluralized by Mongoose)
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TypeScript interface for NfcScan document
 */
export interface INfcScan extends Document {
    ip: string;
    userAgent: string;
    language: string;
    country?: string;
    timestamp: Date;
    tagId: string;
}

/**
 * Mongoose Schema for NFC Scan records
 */
const NfcScanSchema = new Schema<INfcScan>(
    {
        /** Visitor's IP address */
        ip: {
            type: String,
            required: true,
        },
        /** Browser/device user agent string */
        userAgent: {
            type: String,
            required: true,
        },
        /** Accept-Language header from browser */
        language: {
            type: String,
            required: true,
        },
        /** Detected country from IP */
        country: {
            type: String,
            required: false,
        },
        /** Timestamp of the scan event */
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
        },
        /** NFC tag identifier from URL */
        tagId: {
            type: String,
            required: true,
            index: true, // Index for faster queries by tagId
        },
    },
    {
        timestamps: false, // We use our own timestamp field
        collection: 'nfcscans', // Explicit collection name
    }
);

// Add compound index for analytics queries
NfcScanSchema.index({ tagId: 1, timestamp: -1 });

/**
 * NfcScan Model
 * 
 * Note: We check if the model already exists to prevent
 * "OverwriteModelError" in Next.js development with hot reloading.
 */
export const NfcScan: Model<INfcScan> =
    mongoose.models.NfcScan || mongoose.model<INfcScan>('NfcScan', NfcScanSchema);

export default NfcScan;
