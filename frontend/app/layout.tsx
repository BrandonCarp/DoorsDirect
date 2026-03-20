import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
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
    default: "Doors Direct South LLC",
    template: "%s | Doors Direct South LLC",
  },
  description:
    "Quality doors for residential and commercial properties. Serving the South with expert installation and top brands.",

  openGraph: {
    title: "Doors Direct South LLC",
    description: "Quality doors for residential and commercial properties.",
    url: "https://yourdomain.com",
    siteName: "Doors Direct South LLC",
    type: "website",
    images: [{ url: `${Logo}`, width: 1200, height: 630 }],
  },
  metadataBase: new URL("https://yourdomain.com"),
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
