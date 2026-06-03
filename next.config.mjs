/** @type {import('next').NextConfig} */
const nextConfig = {
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
