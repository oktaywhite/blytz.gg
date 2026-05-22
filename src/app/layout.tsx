import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import MouseTrail from "@/components/MouseTrail";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Blytz | Your Gaming Identity, Evolved",
  description: "Living Gaming Profiles with real-time stats, API integrations, and premium themes.",
  keywords: ["gaming", "bio link", "stats", "league of legends", "blytz", "gamer profile"],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <MouseTrail />
        {children}
      </body>
    </html>
  );
}
