import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naksh Prajapati — Systems & Android OS Developer",
  description:
    "18-year-old Computer Science student & aspiring Android OS / AOSP developer. Building software, exploring system internals, and learning in public.",
  keywords: [
    "Naksh Prajapati",
    "Android OS",
    "AOSP",
    "Systems Engineer",
    "Computer Science",
    "Portfolio",
    "Bengaluru",
    "Open Source",
  ],
  authors: [{ name: "Naksh Prajapati", url: "https://github.com/thenakshprajapat" }],
  creator: "Naksh Prajapati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nakshdev.tech",
    title: "Naksh Prajapati — Systems & Android OS Developer",
    description:
      "18-year-old Computer Science student & aspiring Android OS / AOSP developer. Building software, exploring system internals, and learning in public.",
    siteName: "Naksh Prajapati",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naksh Prajapati — Systems & Android OS Developer",
    description:
      "18-year-old Computer Science student & aspiring Android OS / AOSP developer. Building software, exploring system internals, and learning in public.",
    creator: "@iDevNaksh",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Naksh Prajapati",
              url: "https://nakshdev.tech",
              jobTitle: "Computer Science Student & Systems Developer",
              knowsAbout: [
                "Android OS",
                "AOSP",
                "Systems Programming",
                "C++",
                "Rust",
                "Linux Kernel",
                "Next.js",
                "Firebase",
              ],
              sameAs: [
                "https://github.com/thenakshprajapat",
                "https://twitter.com/idevnaksh",
                "https://linkedin.com/in/thenakshprajapat",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-600/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
