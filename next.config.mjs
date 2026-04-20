/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/fuer-trainer',
        destination: '/for-coaches-de.html',
        permanent: true,
      },
      {
        source: '/fuer-trainer/',
        destination: '/for-coaches-de.html',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
