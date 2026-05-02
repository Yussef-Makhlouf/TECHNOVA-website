/**
 * NFC Forward API Route
 * 
 * Endpoint: GET /api/forward/[tagId]
 * 
 * This route handles NFC chip scan tracking and redirection.
 * When a user scans an NFC chip programmed with this URL:
 * 1. Extracts the tagId from the URL parameter
 * 2. Captures visitor information (IP, user-agent, language)
 * 3. Logs the scan to MongoDB
 * 4. Immediately redirects to the configured Linktree URL
 * 
 * The redirect is a 302 (temporary) to ensure the logging endpoint
 * is always hit, even if browsers cache 301s.
 * 
 * @example NFC Chip URL: globaltechnova.com/api/forward/TAG_001
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import NfcScan from '@/lib/models/NfcScan';

/**
 * Linktree redirect URL
 * This is where users will be redirected after scan logging
 */
const LINKTREE_URL =
    'https://linktr.ee/globaltechnova?utm_source=linktree_profile_share&ltsid=ef548bc8-1e1b-4778-9280-6fe4581af894';

/**
 * Extracts the real client IP address from request headers
 * Handles various proxy configurations including Vercel, Cloudflare, etc.
 * 
 * @param request - Next.js request object
 * @returns The client's IP address or 'unknown'
 */
function getClientIP(request: NextRequest): string {
    // x-forwarded-for can contain multiple IPs: client, proxy1, proxy2
    // The first one is the original client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        const ips = forwardedFor.split(',');
        return ips[0].trim();
    }

    // Vercel-specific header
    const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
    if (vercelForwardedFor) {
        return vercelForwardedFor.split(',')[0].trim();
    }

    // Cloudflare header
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    // Real IP header (nginx)
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback
    return 'unknown';
}

/**
 * Background function to save NFC scan data
 * This runs after the redirect response is sent
 */
async function saveNfcScanInBackground(
    ip: string,
    userAgent: string,
    language: string,
    tagId: string,
    timestamp: Date
): Promise<void> {
    try {
        // Connect to MongoDB
        await connectToDatabase();

        // Try to get country from IP API (with timeout)
        let country: string | undefined;
        if (ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

                const geoRes = await fetch(`http://ip-api.com/json/${ip}`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                const geoData = await geoRes.json();
                if (geoData.status === 'success') {
                    country = geoData.country;
                }
            } catch (e) {
                // Ignore geo error - country will be undefined
            }
        }

        // Create and save the scan record
        const scanRecord = new NfcScan({
            ip,
            userAgent,
            language,
            country,
            timestamp,
            tagId,
        });

        await scanRecord.save();
        console.log(`📱 NFC Scan logged: tagId=${tagId}, ip=${ip}, country=${country || 'unknown'}`);
    } catch (error) {
        console.error('❌ Background NFC Scan logging error:', error);
    }
}

/**
 * GET handler for NFC scan tracking
 * 
 * OPTIMIZED: Redirects immediately, saves data in background
 * This ensures the user experience is instant (~50ms) instead of waiting
 * for database operations and geolocation API calls (~1-3 seconds)
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing tagId
 * @returns 302 redirect to Linktree URL
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tagId: string }> }
) {
    // Extract tagId from URL parameters
    const { tagId } = await params;

    // Extract visitor information from headers (fast - no async)
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const language = request.headers.get('accept-language') || 'unknown';
    const timestamp = new Date();

    // 🚀 FIRE AND FORGET: Start background save (don't await!)
    // This allows the redirect to happen immediately
    saveNfcScanInBackground(ip, userAgent, language, tagId, timestamp);

    // Log for debugging
    console.log(`⚡ NFC Redirect (instant): tagId=${tagId}, ip=${ip}`);

    // 🎯 REDIRECT IMMEDIATELY (302 temporary redirect)
    // User doesn't wait for database or geolocation - instant redirect!
    return NextResponse.redirect(LINKTREE_URL, { status: 302 });
}
