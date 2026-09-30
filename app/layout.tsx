import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SproutSIM – Pakistan Non-PTA eSIM Data | Zero PTA Tax",
  description:
    "Keep your Non-PTA iPhone & Android connected in Pakistan without paying PTA tax. High-speed 4G data that never gets blocked. Instant QR code delivery via SproutSIM.",
  keywords: [
    "Non-PTA eSIM",
    "Pakistan Non-PTA data",
    "Non-PTA iPhone data Pakistan",
    "eSIM Pakistan without PTA tax",
    "Non PTA sim Pakistan",
    "SproutSIM",
    "sproutsimofficial",
  ],
  authors: [{ name: "SPROUTSIM" }],
  openGraph: {
    title: "SproutSIM – Pakistan Non-PTA eSIM Data",
    description:
      "High-speed 4G data for Non-PTA iPhones & Androids in Pakistan. No PTA tax, never blocked. Get your eSIM QR instantly.",
    siteName: "SproutSIM",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SproutSIM – Pakistan Non-PTA eSIM Data",
    description:
      "High-speed 4G data for Non-PTA devices in Pakistan. Zero PTA tax. Instant QR delivery.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#123C2A" },
    ],
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
