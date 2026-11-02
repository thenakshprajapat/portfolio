"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { sound } from "@/lib/sound";

const IndiaGlobe3D = dynamic(
  () => import("@/components/ui/india-globe-3d").then((m) => m.IndiaGlobe3D),
  { ssr: false }
);

const HERO_LINKS = [
  { label: "GitHub", handle: "@thenakshprajapat", href: "https://github.com/thenakshprajapat" },
  { label: "X", handle: "@idevnaksh", href: "https://x.com/idevnaksh" },
  { label: "LinkedIn", handle: "thenakshprajapat", href: "https://linkedin.com/in/thenakshprajapat" },
  { label: "Email", handle: "hey@naksh.cc", href: "mailto:hey@naksh.cc" },
];

export function ManifestoHero() {
  const [jaipurTime, setJaipurTime] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const tick = () => {
      setJaipurTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    sound.playPop();
    try {
      await navigator.clipboard.writeText("hey@naksh.cc");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {}
  };

  return (
    <section
      id="top"
      className="pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 columns: Refined typography and rounded controls */}
        <div className="lg:col-span-7 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl matte-box font-mono text-xs text-[var(--text-muted)]"
          >
            <span
              className="inline-block size-1.5 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span>Naksh Prajapati · Jaipur, India</span>
            <span className="text-[var(--text-dim)]">·</span>
            <span className="text-[var(--accent)] tabular-nums">
              {jaipurTime || "IST"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text)] leading-[1.2]"
          >
            I build local-first web apps,{" "}
            <span className="text-[var(--accent)] font-normal italic">
              Android tools
            </span>
            , and Python utilities.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl leading-relaxed"
          >
            I&apos;m a computer science student and developer in Jaipur writing
            software for problems I run into myself, from Indian weather
            dashboards and paise-accurate expense ledgers to OCR exam analyzers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <MagneticButton strength={0.18}>
              <Link
                href="/work"
                onClick={() => sound.playPop()}
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                <span>View projects</span>
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </MagneticButton>

            <MagneticButton
              as="button"
              type="button"
              strength={0.18}
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl matte-box text-[var(--text)] font-mono text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                  <span className="text-[var(--accent)]">Copied hey@naksh.cc</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                  <span>hey@naksh.cc</span>
                </>
              )}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs"
          >
            {HERO_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => sound.playClick()}
                className="group p-2.5 rounded-xl matte-box hover:border-[var(--accent)] transition-colors flex flex-col justify-between gap-1"
              >
                <span className="text-[10px] text-[var(--text-dim)] flex items-center justify-between">
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className="size-3 text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {item.handle}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right 5 columns: Unenclosed 3D figure only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <IndiaGlobe3D />
        </motion.div>
      </div>
    </section>
  );
}
