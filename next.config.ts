import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.pexels.com' },
            { protocol: 'https', hostname: 'via.placeholder.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
        ],
    },
    env: {
        appUrl: process.env.APP_URL,
    },
}

export default nextConfig
