import type { Metadata, Viewport } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BootstrapClient } from "@/src/bootstrap/bootstrap.client";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Boooks beta",
  description: "love your books",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function RootLayout({
  children,
  overlay,
}: Readonly<{
 children: React.ReactNode;
  overlay: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BootstrapClient/>
        {children}
        {overlay}
      </body>
    </html>
  );
}
