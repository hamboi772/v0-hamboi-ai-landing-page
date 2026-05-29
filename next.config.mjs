/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.hamboimindcare.site' }],
        destination: 'https://hamboimindcare.site/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig