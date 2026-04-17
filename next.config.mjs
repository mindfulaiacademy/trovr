/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/fuer-trainer',
        destination: '/for-coaches-de.html',
        permanent: false,
      },
      {
        source: '/fuer-trainer/',
        destination: '/for-coaches-de.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
