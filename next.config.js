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
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['picsum.photos']
  }
}

module.exports = nextConfig
