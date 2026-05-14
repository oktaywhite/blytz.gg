import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import MouseTrail from "@/components/MouseTrail";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "NeoRank | Your Gaming Identity, Evolved",
  description: "Living Gaming Profiles with real-time stats, API integrations, and premium themes.",
  keywords: ["gaming", "bio link", "stats", "league of legends", "neorank", "gamer profile"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground`}>
        <MouseTrail />
        {children}
      </body>
    </html>
  );
}
