// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// // module.exports = {
// //     reactStrictMode: true,
// //     experimental: {
// //       appDir: true,
// //     },
// //   };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true, // Ensure app directory features are enabled
      serverActions: true, // Enable server actions if applicable
    },
  };
  
  export default nextConfig;
  