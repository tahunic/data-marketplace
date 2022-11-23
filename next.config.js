/** @type {import('next').NextConfig} */

const {
  NEXT_PUBLIC_API_BASE_URI,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    nextPublicApiBaseUri: NEXT_PUBLIC_API_BASE_URI
  }
}

module.exports = nextConfig
