import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SproutSIM - Pakistan Non-PTA eSIM Data | Zero PTA Tax",
  description:
    "Keep your Non-PTA iPhone & Android connected in Pakistan without paying PTA tax. High-speed 4G data that never gets blocked. Instant QR code delivery.",
  keywords: [
    "Non-PTA eSIM",
    "Pakistan Non-PTA data",
    "Non-PTA iPhone data",
    "eSIM Pakistan without PTA tax",
    "Non PTA sim Pakistan",
    "SproutSIM",
  ],
  authors: [{ name: "SPROUTSIM" }],
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
