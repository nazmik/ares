/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,
  },
};

module.exports = nextConfig;
