/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.daisyui.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
