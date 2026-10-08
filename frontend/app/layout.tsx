import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
// import Logo from "@/public/logo/footerlogo.png";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Doors Direct LLC",
    template: "%s | Doors Direct LLC",
  },
  description:
    "Doors Direct LLC — residential & commercial doors and parts in Pennsauken & Union, New Jersey. Top brands, expert service.",
  metadataBase: new URL("https://doorsdirectsouth.com"),
  alternates: {
    canonical: "https://doorsdirectsouth.com",
  },
  openGraph: {
    title: "Doors Direct LLC",
    description: "Residential & commercial doors in Pennsauken & Union, NJ.",
    url: "https://doorsdirectsouth.com",
    siteName: "Doors Direct LLC",
    type: "website",
    images: [{ url: "/logo/footerlogo.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

// Local-business structured data for search engines — this is what feeds
// "garage doors near me" style results. Street addresses can be added to each
// entry once confirmed; only verified details are included.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://doorsdirectsouth.com/#south",
      name: "Doors Direct South",
      url: "https://doorsdirectsouth.com",
      telephone: "+18566626666",
      image: "https://doorsdirectsouth.com/logo/footerlogo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pennsauken",
        addressRegion: "NJ",
        addressCountry: "US",
      },
      description:
        "Wholesale garage door distribution center — residential and commercial doors from Clopay, C.H.I., Haas, and Amarr, plus LiftMaster openers, springs, and parts.",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://doorsdirectsouth.com/#union",
      name: "Doors Direct Union",
      url: "https://doorsdirectsouth.com",
      telephone: "+18566626666",
      image: "https://doorsdirectsouth.com/logo/footerlogo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Union",
        addressRegion: "NJ",
        addressCountry: "US",
      },
      description:
        "Wholesale garage door distribution center — residential and commercial doors from Clopay, C.H.I., Haas, and Amarr, plus LiftMaster openers, springs, and parts.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased overflow-x-hidden bg-cream-bg`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
