"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { sound } from "@/lib/sound";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@thenakshprajapat",
    href: "https://github.com/thenakshprajapat",
  },
  {
    label: "X",
    handle: "@idevnaksh",
    href: "https://x.com/idevnaksh",
  },
  {
    label: "LinkedIn",
    handle: "thenakshprajapat",
    href: "https://linkedin.com/in/thenakshprajapat",
  },
];

export function TransmissionTerminal() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    sound.playPop();
    try {
      await navigator.clipboard.writeText("hey@naksh.cc");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            id="contact-heading"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text)]"
          >
            A project <span className="text-[var(--accent)]">in mind?</span>
          </motion.h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
            Reach out directly by email or find me on GitHub, X, and LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Left card: Direct Email */}
          <div className="p-5 sm:p-6 rounded-2xl matte-box flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Direct email
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Write to me at{" "}
                <span className="text-[var(--text)] font-mono">hey@naksh.cc</span>{" "}
                for collaborations, internships, or questions about any of my projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <MagneticButton
                as="a"
                href="mailto:hey@naksh.cc"
                strength={0.15}
                onClick={() => sound.playPop()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                <span>hey@naksh.cc</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                as="button"
                type="button"
                strength={0.15}
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl matte-box text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-mono text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    <span className="text-[var(--accent)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    <span>Copy email</span>
                  </>
                )}
              </MagneticButton>
            </div>
          </div>

          {/* Right card: Social Links */}
          <div className="p-5 sm:p-6 rounded-2xl matte-box flex flex-col justify-between gap-4">
            <span className="font-mono text-xs text-[var(--text-muted)] block">
              Profiles
            </span>
            <div className="divide-y divide-[var(--border)] font-mono text-xs">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="py-3 flex items-center justify-between text-[var(--text)] hover:text-[var(--accent)] transition-colors group"
                >
                  <span className="text-[var(--text-muted)]">{item.label}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span>{item.handle}</span>
                    <ArrowUpRight
                      className="size-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
