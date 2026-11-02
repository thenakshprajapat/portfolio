import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SystemHeader } from "@/components/layout/system-header";
import { SystemFooter } from "@/components/layout/system-footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FluidBackground } from "@/components/ui/fluid-background";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Naksh Prajapati · naksh.cc",
  description:
    "Naksh Prajapati, computer science student and developer in Jaipur, India building local-first web apps, Android tools, and Python utilities.",
  authors: [{ name: "Naksh Prajapati", url: "https://github.com/thenakshprajapat" }],
  creator: "Naksh Prajapati",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://naksh.cc",
    title: "Naksh Prajapati · naksh.cc",
    description:
      "Local-first web apps, Android tools, and Python utilities built in Jaipur, India.",
    siteName: "naksh.cc",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col relative`}
      >
        <SmoothScroll>
          <FluidBackground />
          <CustomCursor />
          <SystemHeader />
          <div className="relative z-10 flex-1">{children}</div>
          <div className="relative z-10">
            <SystemFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
