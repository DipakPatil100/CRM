// import nextPWA from 'next-pwa';
// import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */

// const withSerwist = withSerwistInit({
//   // cacheOnFrontEndNav: true,
//   swSrc: "src/sw.ts",
//   swDest: "public/sw.js",
//   reloadOnOnline: true,
//   disable: process.env.NODE_ENV === "development", // to disable pwa in development
// });

const nextConfig = {
  // swcMinify: true,
  // output: 'export',
  // reactStrictMode: true,
  images: {
    domains: ["localhost", "192.168.1.31"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "8800",
    //     pathname: "/uploads/**",
    //   },
    // ],
  },
};

// const withPWA = nextPWA({
//   dest: "public", // Destination directory for the PWA files
//   disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
//   register: true, // Register the PWA service worker
//   skipWaiting: true, // Skip waiting for service worker activation
// });

export default nextConfig;
// module.exports = withPWA(nextConfig);
