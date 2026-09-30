import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SproutSIM – Pakistan 4G eSIM Data | Stay Connected Anywhere",
  description:
    "Keep your smartphone connected in Pakistan without registration hurdles. High-speed 4G data that never gets blocked. Instant QR code delivery via SproutSIM.",
  keywords: [
    "eSIM Pakistan",
    "Pakistan eSIM data",
    "iPhone eSIM Pakistan",
    "eSIM Pakistan data roaming",
    "SproutSIM",
    "sproutsimofficial",
  ],
  authors: [{ name: "SPROUTSIM" }],
  openGraph: {
    title: "SproutSIM – Pakistan 4G eSIM Data",
    description:
      "High-speed 4G data for all eSIM smartphones in Pakistan. Instant QR delivery.",
    siteName: "SproutSIM",
    locale: "en_PK",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1080, height: 1080, alt: "SproutSIM Logo" }],
  },
  twitter: {
    card: "summary",
    title: "SproutSIM – Pakistan 4G eSIM Data",
    description:
      "High-speed 4G data for smartphones in Pakistan. Instant QR delivery.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F7F2] text-[#1C2420] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
