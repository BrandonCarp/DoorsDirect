import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
    // Allow product imagery served from the manufacturers' own CDNs so the
    // CHI / Haas / Amarr catalogs can use official door images without
    // copying the files locally. Swap these for local /public images anytime.
    remotePatterns: [
      { protocol: "https", hostname: "www.chiohd.com" },
      { protocol: "https", hostname: "lirp.cdn-website.com" },
      { protocol: "https", hostname: "www.amarr.com" },
      { protocol: "https", hostname: "gw-assets.assaabloy.com" },
      // LiftMaster operator & accessory imagery
      { protocol: "https", hostname: "embed.widencdn.net" },
      { protocol: "https", hostname: "www.liftmaster.com" },
      { protocol: "https", hostname: "allsecurityequipment.com" },
    ],
  },
  // Baseline security headers for every response. HSTS comes from the host
  // (e.g. Vercel) once the site is served over HTTPS.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // The site never needs to render inside someone else's iframe.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
