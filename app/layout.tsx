import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPROUTSIM - Stay Connected Anywhere | 190+ Countries eSIM",
  description:
    "Simple global eSIM connectivity for your next journey. Fast, reliable, and affordable travel eSIMs. Get online in minutes across 190+ countries with zero roaming fees.",
  keywords: [
    "eSIM",
    "SproutSIM",
    "travel eSIM",
    "global data",
    "international roaming",
    "prepaid eSIM",
    "unlimited travel data",
  ],
  authors: [{ name: "SPROUTSIM" }],
  openGraph: {
    title: "SPROUTSIM - Global Data. Bigger Horizons.",
    description: "Simple global eSIM connectivity for your next journey. 190+ countries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F7F2] text-[#1C2420] antialiased">
        {children}
      </body>
    </html>
  );
}
