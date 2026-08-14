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
  title: "Naksh — Programmer",
  description:
    "I’m Naksh. I’m a programmer who loves building things, exploring technology, and understanding how software feels to the people using it. Interested in Android UI smoothness, animations, and interaction craft.",
  keywords: [
    "Naksh",
    "Programmer",
    "Android UI",
    "UI Smoothness",
    "Animations",
    "Interaction Design",
    "Web Development",
    "C++",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Naksh", url: "https://github.com/thenakshprajapat" }],
  creator: "Naksh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nakshdev.tech",
    title: "Naksh — Programmer",
    description:
      "I’m Naksh. I’m a programmer who loves building things, exploring technology, and understanding how software feels to the people using it.",
    siteName: "Naksh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naksh — Programmer",
    description:
      "I’m Naksh. I’m a programmer who loves building things, exploring technology, and understanding how software feels to the people using it.",
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = stored ? stored === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Naksh",
              url: "https://nakshdev.tech",
              jobTitle: "Programmer",
              knowsAbout: [
                "Programming",
                "Android UI",
                "UI Smoothness & Animations",
                "Interaction Design",
                "C++",
                "Python",
                "Modern Web Development",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-sky-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
