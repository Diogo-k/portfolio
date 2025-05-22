/** @type {import('next').NextConfig} */
// import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
    transpilePackages: ['next-mdx-remote'],
    serverExternalPackages: ['three', 'react-three/fiber', 'react-three/drei'],
    experimental: {
        optimizePackageImports: ['@icons-pack/react-simple-icons'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

// export default withBundleAnalyzer({
//     enabled: process.env.ANALYZE === 'true',
// })(nextConfig);
export default nextConfig;
