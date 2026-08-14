"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

export function ContactTerminal() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@nakshdev.tech");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setSending(true);

    // Simulate direct transmission
    setTimeout(() => {
      setSending(false);
      setSent(true);
      sound.playSuccess();
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
          <MessageSquare className="size-3.5" />
          <span>Direct Connection</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
          Get In Touch &amp; Connect
        </h2>
        <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
          I love meeting new people, discussing technology, collaborating on projects, or sharing ideas. Drop a line anytime.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Info & Social Matrix (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Copy Email Card */}
          <SpotlightCard className="p-6 sm:p-7 rounded-3xl" enableSound>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <Mail className="size-4.5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--muted)] tracking-wider">
                  Direct Inbox
                </span>
                <h3 className="text-base font-bold text-[var(--foreground)]">hello@nakshdev.tech</h3>
              </div>
            </div>

            <button
              onClick={copyEmail}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-all font-medium"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[var(--muted)]" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </SpotlightCard>

          {/* Social Channels List */}
          <SpotlightCard className="p-6 sm:p-7 rounded-3xl" enableSound>
            <h3 className="text-[11px] font-mono uppercase text-[var(--muted)] tracking-wider mb-4">
              Verified Profiles
            </h3>

            <div className="space-y-2.5">
              <a
                href="https://twitter.com/idevnaksh"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playPop()}
                className="flex items-center justify-between p-3 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] hover:border-[var(--border-highlight)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">X / Twitter</p>
                    <p className="text-[11px] font-mono text-[var(--muted)]">@idevnaksh</p>
                  </div>
                </div>
                <ArrowUpRight className="size-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              </a>

              <a
                href="https://linkedin.com/in/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playPop()}
                className="flex items-center justify-between p-3 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] hover:border-[var(--border-highlight)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">LinkedIn</p>
                    <p className="text-[11px] font-mono text-[var(--muted)]">Naksh</p>
                  </div>
                </div>
                <ArrowUpRight className="size-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              </a>

              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playPop()}
                className="flex items-center justify-between p-3 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] hover:border-[var(--border-highlight)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">GitHub</p>
                    <p className="text-[11px] font-mono text-[var(--muted)]">@thenakshprajapat</p>
                  </div>
                </div>
                <ArrowUpRight className="size-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" />
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Transmission Form (Span 7) */}
        <SpotlightCard className="lg:col-span-7 p-6 sm:p-8 rounded-3xl" enableSound>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider">
                Direct Transmission
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--muted)]">Status: Ready</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[var(--muted)]">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Alex"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[var(--muted)]">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[var(--muted)]">Topic / Subject</label>
              <input
                type="text"
                placeholder="Tech discussion, project idea, or saying hi"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[var(--muted)]">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Write your note here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              onMouseEnter={() => sound.playPop()}
              className="w-full py-3.5 rounded-2xl bg-[var(--foreground)] hover:bg-emerald-500 text-[var(--background)] hover:text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-black/5 disabled:opacity-60"
            >
              {sending ? (
                <span>Transmitting message...</span>
              ) : sent ? (
                <>
                  <Check className="size-4" />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>
        </SpotlightCard>
      </div>
    </section>
  );
}
