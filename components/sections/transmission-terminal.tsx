"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy, Check, ArrowUpRight, CheckCircle2, Github, Twitter, Mail, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

const LINKS = [
  {
    icon: Mail,
    label: "Direct Email",
    handle: "hey@naksh.cc",
    href: "mailto:hey@naksh.cc",
    hover: "hover:border-sky-500/50 hover:bg-sky-500/5",
    ic: "text-sky-400",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    handle: "@idevnaksh",
    href: "https://twitter.com/idevnaksh",
    hover: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
    ic: "text-indigo-400",
  },
  {
    icon: Github,
    label: "GitHub Profile",
    handle: "@thenakshprajapat",
    href: "https://github.com/thenakshprajapat",
    hover: "hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]",
    ic: "text-[var(--foreground)]",
  },
];

export function TransmissionTerminal() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const copy = () => {
    navigator.clipboard.writeText("hey@naksh.cc");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    sound.playClick();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok || !d.success) throw new Error(d.error || "Failed to send message");
      sound.playSuccess();
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Couldn't send through form — feel free to email me directly at hey@naksh.cc");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-elevated)]">
          {/* Subtle ambient lighting */}
          <div
            className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)", filter: "blur(90px)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)", filter: "blur(90px)" }}
          />

          <div className="relative z-10 p-7 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-7"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-sky-400 tracking-widest">
                    <Sparkles className="size-3" />
                    <span>Initiate Contact</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                    Let&apos;s build something <span className="gradient-text">remarkable</span>.
                  </h2>
                  <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
                    Have an interesting project, question on UI motion, or want to collaborate? My inbox is always open.
                  </p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    Direct communication:{" "}
                    <a href="mailto:hey@naksh.cc" className="text-sky-400 hover:underline font-mono font-medium">
                      hey@naksh.cc
                    </a>
                  </p>
                </div>

                <div className="space-y-2.5">
                  {LINKS.map(({ icon: Icon, label, handle, href, hover, ic }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={() => sound.playPop()}
                      className={`group flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] transition-all ${hover}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center shrink-0">
                          <Icon className={`size-4 ${ic}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono text-[var(--muted)]">{label}</p>
                          <p className="text-sm font-semibold text-[var(--foreground)] truncate">{handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="size-4 text-[var(--muted)] group-hover:text-sky-400 shrink-0 transition-colors" />
                    </a>
                  ))}

                  <button
                    onClick={copy}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-sky-500/40 text-xs font-mono font-medium transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Email address copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 text-[var(--muted)]" />
                        <span>Copy email address</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {sent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-14">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="size-14 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-[var(--foreground)]">Message Delivered</h4>
                    <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
                      Thanks for reaching out! I&apos;ll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-2 px-6 py-2.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-sm font-medium hover:border-sky-400 transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <h3 className="text-base font-bold text-[var(--foreground)] mb-4">Send a direct message</h3>

                    {error && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                        Topic / Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Project collaboration, tech discussion, or inquiry"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me what you're working on or what's on your mind..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm resize-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:bg-sky-400 hover:text-[#040914] shadow-lg shadow-sky-500/10 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="size-4" />
                      <span>{sending ? "Transmitting..." : "Send Message"}</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
