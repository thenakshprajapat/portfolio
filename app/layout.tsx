import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/preloader";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PageTransition } from "@/components/layout/page-transition";
import { FloatingNav } from "@/components/floating-nav";
import { CursorFollower } from "@/components/ui/cursor-follower";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naksh Prajapati | Developer & Designer",
  description: "Building beautiful, functional digital experiences at the intersection of code and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="grain-texture" />
        <CursorFollower />
        <FloatingNav />
        <Preloader />
        <SmoothScroll>
          <main className="relative z-10 w-full">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
