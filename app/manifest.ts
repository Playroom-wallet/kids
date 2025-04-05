import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Playroom - A Wallet for Kids",
    short_name: "Playroom",
    description: "A fun wallet app for kids to earn rewards",
    start_url: "/",
    display: "standalone",
    background_color: "#d1f1ff",
    theme_color: "#d1f1ff",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

