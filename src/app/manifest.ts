import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mercedes Costal',
    short_name: 'Mercedes Costal',
    description: 'Mercedes Costal Page',
    start_url: 'https://mercedescostal.com.ar/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
        {
            src: '/assets/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon',
        },
        {
            src: "/assets/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
        },
        {
            src: "/assets/favicon/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
        }
    ],
  }
}