import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    domains: [
      "cdn2.thedogapi.com",
      "cdn3.thedogapi.com",
      "images.dog.ceo",
      "cdn2.thecatapi.com",
      "cdn3.thecatapi.com",
      "cdn4.thecatapi.com"
    ]
  }
};

export default nextConfig;