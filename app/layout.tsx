import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SystemHeader } from "@/components/layout/system-header";
import { SystemFooter } from "@/components/layout/system-footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FluidBackground } from "@/components/ui/fluid-background";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Naksh — Independent Developer",
  description:
    "Independent software engineer based in Jaipur. Building high-performance Android UI motion architectures, C++ systems, and real-time platforms.",
  keywords: [
    "Naksh",
    "Independent Developer",
    "Android Motion",
    "UI Physics",
    "C++",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Naksh", url: "https://github.com/thenakshprajapat" }],
  creator: "Naksh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naksh.cc",
    title: "Naksh — Independent Developer",
    description:
      "Independent software engineer based in Jaipur. Building high-performance Android UI motion architectures and systems.",
    siteName: "Naksh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naksh — Independent Developer",
    description:
      "Independent software engineer based in Jaipur. Building high-performance Android UI motion architectures and systems.",
    creator: "@iDevNaksh",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-cyan-500/30 selection:text-white`}
      >
        {/* Dynamic ambient fluid canvas */}
        <FluidBackground />

        {/* Custom cursor for fine pointer devices */}
        <CustomCursor />

        {/* Floating cyber-craft navigation */}
        <SystemHeader />

        {/* Page Content */}
        <div className="relative z-10">{children}</div>

        {/* Global Footer */}
        <SystemFooter />
      </body>
    </html>
  );
}
