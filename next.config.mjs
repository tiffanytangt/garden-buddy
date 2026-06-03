/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // Baked in at build time so the UI can show when this version was built,
        // expressed in Pacific time (sv-SE gives a sortable YYYY-MM-DD HH:mm:ss).
        // Vercel separately provides NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA (which version).
        NEXT_PUBLIC_BUILD_TIME:
            new Date().toLocaleString('sv-SE', {
                timeZone: 'America/Los_Angeles',
            }) + ' PT',
    },
    images: {
        domains: ["localhost", "127.0.0.1", 't-garden-buddy.s3.us-west-2.amazonaws.com'],
    },
    experimental: {
        // Safety net: default Server Action body limit is 1MB, which large photos exceed.
        // Images are also compressed client-side before upload (see lib/compressImage.ts).
        serverActions: {
            bodySizeLimit: '8mb',
        },
    },
};

export default nextConfig;
