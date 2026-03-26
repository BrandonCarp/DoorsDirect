import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Nav2 from "@/components/layout/Nav2";
import Footer from "@/components/layout/Footer";
import Logo from "@/public/logo/footerlogo.png";
import GarageDoorTransition from "@/components/shared/DoorTransition";

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
  metadataBase: new URL("https://doorsdirect.com"),
  alternates: {
    canonical: "https://doorsdirect.com",
  },
  openGraph: {
    title: "Doors Direct LLC",
    description: "Residential & commercial doors in Pennsauken & Union, NJ.",
    url: "https://doorsdirect.com",
    siteName: "Doors Direct LLC",
    type: "website",
    images: [{ url: "/logo/footerlogo.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: { index: true, follow: true },
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
        <GarageDoorTransition>
          <Navbar />
          {children}
          <Footer />
        </GarageDoorTransition>
      </body>
    </html>
  );
}
