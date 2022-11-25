/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const {
  NEXT_PUBLIC_API_BASE_URI,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    nextPublicApiBaseUri: NEXT_PUBLIC_API_BASE_URI
  },
  i18n,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/buy-orders',
        permanent: true,
        locale: false
      }
    ];
  },
  images: {
    domains: ['picsum.photos']
  }
}

module.exports = nextConfig
