"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Twitter, Mail, Terminal, Heart } from "lucide-react";
import { sound } from "@/lib/sound";

export function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0a] py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Status */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Naksh Prajapati</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">Systems &amp; AOSP</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono">
            Designed with craft. Powered by Next.js &amp; Framer Motion.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <a
            href="https://github.com/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-700">/</span>
          <a
            href="https://twitter.com/idevnaksh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X (Twitter)
          </a>
          <span className="text-zinc-700">/</span>
          <a
            href="https://linkedin.com/in/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-700">/</span>
          <a
            href="mailto:hello@nakshdev.tech"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
