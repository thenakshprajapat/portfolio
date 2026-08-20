"use client";

import React, { useState } from "react";
import { Send, Copy, Check, ArrowUpRight, CheckCircle2, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { sound } from "@/lib/sound";

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "hey@naksh.cc",
    href: "mailto:hey@naksh.cc",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "@idevnaksh",
    href: "https://twitter.com/idevnaksh",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/thenakshprajapat",
    href: "https://linkedin.com/in/thenakshprajapat",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@thenakshprajapat",
    href: "https://github.com/thenakshprajapat",
  },
];

export function TransmissionTerminal() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmail = () => {
    navigator.clipboard.writeText("hey@naksh.cc");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    sound.playClick();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const d = await res.json();
      if (!res.ok || !d.success) throw new Error(d.error || "Failed to send message.");
      sound.playSuccess();
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to send. Feel free to email directly at hey@naksh.cc");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-6 sm:px-10 max-w-4xl mx-auto">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-500 uppercase tracking-wider">
            <Mail className="size-3" />
            <span>Communication Channel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Get In <span className="gradient-green-text">Touch</span>
          </h2>
          <p className="text-[var(--muted)] text-xs sm:text-sm max-w-md leading-relaxed">
            Whether it&apos;s a project inquiry, discussing Android UI motion physics, or saying hello — I try to reply to all messages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Direct Links & Copy */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-3xl p-6 bg-[var(--card)] border border-[var(--border)] space-y-4 shadow-sm">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Direct Channels
              </h3>
              <div className="space-y-2">
                {SOCIAL_LINKS.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={() => sound.playPop()}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-emerald-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                        <Icon className="size-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-[var(--muted)]">{label}</p>
                        <p className="text-xs font-medium text-[var(--foreground)]">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="size-3 text-[var(--muted)] group-hover:text-emerald-500 transition-colors" />
                  </a>
                ))}
              </div>

              <button
                onClick={copyEmail}
                className="w-full py-2.5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-emerald-500/40 text-xs font-mono text-[var(--foreground)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Email copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3 text-[var(--muted)]" />
                    <span>Copy email (hey@naksh.cc)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 bg-[var(--card)] border border-[var(--border)] shadow-sm">
              {sent ? (
                <div className="py-10 text-center space-y-3 flex flex-col items-center justify-center">
                  <CheckCircle2 className="size-10 text-emerald-500" />
                  <h4 className="text-lg font-semibold text-[var(--foreground)]">Message Transmitted</h4>
                  <p className="text-xs text-[var(--muted)] max-w-xs">
                    Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-5 py-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] hover:border-emerald-500 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">Send a Message</h3>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[var(--muted)] uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-[var(--muted)] uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[var(--muted)] uppercase">Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry, Android UI motion, or hello"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[var(--muted)] uppercase">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me what you're building or what's on your mind..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-2.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 font-mono text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20 disabled:opacity-60"
                  >
                    <Send className="size-3" />
                    <span>{sending ? "Transmitting..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
