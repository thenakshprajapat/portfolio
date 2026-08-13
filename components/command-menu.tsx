"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  BookOpen,
  Terminal,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Milestone,
  Wrench,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions" | "Socials";
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export function CommandMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        sound.playPop();
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@nakshdev.tech");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: "nav-hero",
        title: "Go to Overview / Hero",
        category: "Navigation",
        icon: Sparkles,
        action: () => scrollTo("hero"),
      },
      {
        id: "nav-proof",
        title: "View Proof & Live Activity Bento",
        category: "Navigation",
        icon: Terminal,
        action: () => scrollTo("proof"),
      },
      {
        id: "nav-projects",
        title: "Explore Featured Projects & Case Studies",
        category: "Navigation",
        icon: FolderGit2,
        action: () => scrollTo("projects"),
      },
      {
        id: "nav-journey",
        title: "Read Engineering Journey Timeline",
        category: "Navigation",
        icon: Milestone,
        action: () => scrollTo("journey"),
      },
      {
        id: "nav-writing",
        title: "Read Notes & Engineering Writings",
        category: "Navigation",
        icon: BookOpen,
        action: () => scrollTo("writing"),
      },
      {
        id: "nav-toolbox",
        title: "Inspect Curated Engineering Toolbox",
        category: "Navigation",
        icon: Wrench,
        action: () => scrollTo("toolbox"),
      },
      {
        id: "nav-contact",
        title: "Open Contact & Direct Channels",
        category: "Navigation",
        icon: Terminal,
        action: () => scrollTo("contact"),
      },
      // Projects
      {
        id: "proj-contacts",
        title: "Contacts Sync Engine (Firestore / Realtime)",
        category: "Projects",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://contacts-firebase-app.vercel.app/", "_blank");
        },
      },
      {
        id: "proj-cs-resources",
        title: "CS Resources Hub (Zero-Noise Learning)",
        category: "Projects",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://thenakshprajapat.github.io/edtech-cs/", "_blank");
        },
      },
      {
        id: "proj-paper-analyzer",
        title: "Paper Analyzer (NLP Exam Pattern Intelligence)",
        category: "Projects",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://paper-analyzer.streamlit.app/", "_blank");
        },
      },
      // Actions
      {
        id: "act-email",
        title: copied ? "Email Copied to Clipboard!" : "Copy Email (hello@nakshdev.tech)",
        category: "Actions",
        icon: copied ? Check : Copy,
        shortcut: "↵",
        action: copyEmail,
      },
      {
        id: "act-sound",
        title: isMuted ? "Unmute Audio Micro-Feedback" : "Mute Audio Micro-Feedback",
        category: "Actions",
        icon: isMuted ? VolumeX : Volume2,
        action: toggleSound,
      },
      // Socials
      {
        id: "soc-github",
        title: "GitHub (@thenakshprajapat)",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/thenakshprajapat", "_blank");
        },
      },
      {
        id: "soc-x",
        title: "X / Twitter (@iDevNaksh)",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://twitter.com/idevnaksh", "_blank");
        },
      },
      {
        id: "soc-linkedin",
        title: "LinkedIn (Naksh Prajapati)",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://linkedin.com/in/thenakshprajapat", "_blank");
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied, isMuted]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      sound.playClick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      sound.playClick();
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#121214] p-0 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm md:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                ESC to close
              </span>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-500">
                  No matching results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                          : "text-zinc-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg shrink-0 ${
                            isSelected ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-zinc-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer info */}
            <div className="flex items-center justify-between border-t border-white/5 bg-[#0e0e10] px-4 py-2 text-[12px] text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span>Navigate ↑↓</span>
                <span>Select ↵</span>
              </div>
              <span className="text-zinc-600">Naksh Prajapati OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
