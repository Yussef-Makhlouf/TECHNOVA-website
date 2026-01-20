import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/dashboard/',
                    '/login/',
                    '/reset-password/',
                    '/preview/',
                ],
            },
        ],
        sitemap: 'https://globaltechnova.com/sitemap.xml',
        // Note: To block api.globaltechnova.com from Google indexing,
        // you need to add a separate robots.txt on that subdomain
        // or use Google Search Console to request URL removal
    }
}
