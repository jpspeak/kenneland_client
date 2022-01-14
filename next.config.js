/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/kennels/:kennelId",
        destination: "/kennels/:kennelId/posts"
      },
      {
        source: "/feed",
        destination: "/feed/posts"
      }
    ];
  },
  images: {
    domains: ["placeimg.com", "i.ytimg.com", "kenneland-dicebear.herokuapp.com", "do2pc6u25f6a7.cloudfront.net"]
  },
  experimental: {
    scrollRestoration: true
  }
};
