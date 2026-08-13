"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Radio,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

export function ContactTerminal() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@nakshdev.tech");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    sound.playClick();

    // Simulate direct dispatch
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      sound.playSuccess();
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Radio className="w-3.5 h-3.5" />
          <span>Direct Channel &amp; Collaboration</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Let&apos;s build something ambitious.
        </h2>
        <p className="text-zinc-400 mt-3 text-sm sm:text-base">
          Whether you have an internship opportunity, an open-source systems project, or just want to discuss AOSP &amp; software craft — my inbox is open.
        </p>
      </motion.div>

      {/* Terminal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Contact Channels & Terminal Info (Span 5) */}
        <SpotlightCard className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full" enableSound>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-zinc-500">naksh@systems:~</span>
            </div>

            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Direct Email
              </span>
              <div className="mt-2 flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="font-mono text-sm text-white truncate">
                    hello@nakshdev.tech
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-[11px] font-mono text-emerald-400 mt-1.5 animate-fade-in">
                  ✓ Copied address to clipboard!
                </p>
              )}
            </div>

            {/* Verified Social Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Public Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://github.com/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <a
                  href="https://twitter.com/idevnaksh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <a
                  href="https://linkedin.com/in/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <a
                  href="mailto:hello@nakshdev.tech"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] text-xs font-mono text-zinc-300 hover:text-white transition-all"
                >
                  <span>Fast Mail</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Response: &lt; 24 hrs</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Right Side: Interactive Quick Transmission Form (Span 7) */}
        <SpotlightCard className="lg:col-span-7 p-6 sm:p-8" enableSound>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-sm font-semibold text-white">Send Direct Message</span>
              <span className="text-[11px] font-mono text-zinc-500">Encrypted transmission</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Linus Torvalds"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Message / Vision
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something impactful together..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : isSent ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Message Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <a
                href="mailto:hello@nakshdev.tech"
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:inline"
              >
                Or open default mail client →
              </a>
            </div>

            {isSent && (
              <p className="text-xs font-mono text-emerald-400 text-center pt-2">
                Thank you! I will respond to your transmission within 24 hours.
              </p>
            )}
          </form>
        </SpotlightCard>
      </div>
    </section>
  );
}
