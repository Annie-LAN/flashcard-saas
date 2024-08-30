/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sign-up",
        destination: "/sign-up/[[...sign-up]]",
        permanent: true,
      },
      {
        source: "/sign-in",
        destination: "/sign-in/[[...sign-in]]",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
