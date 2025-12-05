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
 * GET handler for NFC scan tracking
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing tagId
 * @returns 302 redirect to Linktree URL
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ tagId: string }> }
) {
    try {
        // Extract tagId from URL parameters
        const { tagId } = await params;

        // Extract visitor information from headers
        const ip = getClientIP(request);
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const language = request.headers.get('accept-language') || 'unknown';

        // Try to get country from Vercel headers
        let country = request.headers.get('x-vercel-ip-country') || undefined;

        // If no country (local dev), try to fetch from IP API
        if (!country && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
            try {
                const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
                const geoData = await geoRes.json();
                if (geoData.status === 'success') {
                    country = geoData.country;
                }
            } catch (e) {
                // Ignore geo error
            }
        }

        const timestamp = new Date();

        // Connect to MongoDB (uses cached connection in serverless)
        await connectToDatabase();

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

        // Log for debugging (visible in Vercel logs)
        console.log(`📱 NFC Scan logged: tagId=${tagId}, ip=${ip}`);

        // Redirect to Linktree (302 temporary redirect)
        // Using 302 ensures the browser always hits this endpoint
        // and doesn't cache the redirect like it might with 301
        return NextResponse.redirect(LINKTREE_URL, { status: 302 });
    } catch (error) {
        // Log error but still redirect user (graceful degradation)
        console.error('❌ NFC Scan logging error:', error);

        // Even if logging fails, redirect the user
        // Business continuity is more important than analytics
        return NextResponse.redirect(LINKTREE_URL, { status: 302 });
    }
}
