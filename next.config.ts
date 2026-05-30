// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// //   reactCompiler: true,
// // };

// // export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type {
  NextConfig,
} from "next";

const nextConfig:
  NextConfig = {

  reactCompiler: true,

  images: {

    remotePatterns: [

      {
        protocol: "https",
        hostname:
          "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname:
          "images.pexels.com",
      },

      {
        protocol: "https",
        hostname: "*.gstatic.com",
      },

      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },

      {
        protocol: "https",
        hostname: "*.pngtree.com",
      },

      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },

      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;