/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname:  "images-na.ssl-images-amazon.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "www.amazon.com",
          },
          {
            protocol: "https",
            hostname: "m.media-amazon.com",
          },
          {
            protocol: "https",
            hostname: "sp-bootstrap.global.ssl.fastly.net",
          },
        
        ],
      },

}


module.exports = nextConfig
