/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable strict mode to prevent double renders
    compiler: {
      reactRemoveProperties: true, // Removes React dev warnings in production
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignores ESLint errors during build
    },
  }
  
export default nextConfig
  