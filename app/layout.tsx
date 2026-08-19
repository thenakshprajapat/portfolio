import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
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

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Naksh",
  description:
    "I write code, mostly. Interested in Android UI motion, how things feel when you use them, and C++ systems. Based in Jaipur.",
  keywords: ["Naksh", "Programmer", "Android", "UI", "C++", "Portfolio"],
  authors: [{ name: "Naksh" }],
  creator: "Naksh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Naksh",
    description: "I write code, mostly. Based in Jaipur.",
    siteName: "Naksh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naksh",
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
        className={`${spaceGrotesk.variable} ${dmMono.variable} font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* Cursor — desktop only (hidden on touch, handled inside component) */}
        <CustomCursor />

        {/* Fluid background — cursor tracked, sits behind everything */}
        <FluidBackground />

        {/* Global nav */}
        <SystemHeader />

        {/* Page content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Global footer */}
        <SystemFooter />
      </body>
    </html>
  );
}
