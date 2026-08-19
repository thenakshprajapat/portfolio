"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Milestone,
  Sparkles,
  ArrowRight,
  Code2,
  FlaskConical,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  category: "PAGES" | "PROJECTS" | "ACTIONS" | "PROFILES";
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    setIsDark(document.documentElement.classList.contains("dark"));
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

  const navigateTo = (path: string) => {
    setIsOpen(false);
    sound.playClick();
    router.push(path);
  };

  const toggleTheme = () => {
    sound.playClick();
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("thenakshprajapat@gmail.com");
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
      // Pages
      {
        id: "page-home",
        title: "00 // Systems Manifesto (Home)",
        category: "PAGES",
        icon: Sparkles,
        action: () => navigateTo("/"),
      },
      {
        id: "page-work",
        title: "01 // Selected Engineering Artifacts",
        category: "PAGES",
        icon: FolderGit2,
        action: () => navigateTo("/work"),
      },
      {
        id: "page-physics",
        title: "02 // Interactive Physics Sandbox",
        category: "PAGES",
        icon: FlaskConical,
        action: () => navigateTo("/#physics"),
      },
      {
        id: "page-lab",
        title: "02 // Curated Technologies & Tooling",
        category: "PAGES",
        icon: FlaskConical,
        action: () => navigateTo("/lab"),
      },
      {
        id: "page-mind",
        title: "04 // Dispatches & Mind Garden",
        category: "PAGES",
        icon: BookOpen,
        action: () => navigateTo("/mind"),
      },
      {
        id: "page-journey",
        title: "05 // The Non-Linear Trajectory",
        category: "PAGES",
        icon: Milestone,
        action: () => navigateTo("/journey"),
      },
      {
        id: "page-contact",
        title: "06 // Direct Transmission Terminal",
        category: "PAGES",
        icon: Mail,
        action: () => navigateTo("/contact"),
      },
      // Projects
      {
        id: "proj-contacts",
        title: "Contacts Realtime Sync Engine (Firestore / Optimistic UI)",
        category: "PROJECTS",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://contacts-firebase-app.vercel.app/", "_blank");
        },
      },
      {
        id: "proj-paper-analyzer",
        title: "Paper Analyzer (Python NLP Exam Intelligence)",
        category: "PROJECTS",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://paper-analyzer.streamlit.app/", "_blank");
        },
      },
      {
        id: "proj-cs-resources",
        title: "CS Resources Hub (Zero-Noise Static Launchpad)",
        category: "PROJECTS",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://thenakshprajapat.github.io/edtech-cs/", "_blank");
        },
      },
      // Actions
      {
        id: "act-theme",
        title: isDark ? "Switch to Architectural Light Mode" : "Switch to Basalt Dark Mode",
        category: "ACTIONS",
        icon: isDark ? Sun : Moon,
        action: toggleTheme,
      },
      {
        id: "act-email",
        title: copied ? "Email Copied to Clipboard!" : "Copy Email (thenakshprajapat@gmail.com)",
        category: "ACTIONS",
        icon: copied ? Check : Copy,
        shortcut: "↵",
        action: copyEmail,
      },
      {
        id: "act-sound",
        title: isMuted ? "Unmute Audio Feedback Synthesizer" : "Mute Audio Feedback Synthesizer",
        category: "ACTIONS",
        icon: isMuted ? VolumeX : Volume2,
        action: toggleSound,
      },
      // Socials
      {
        id: "soc-github",
        title: "GitHub (@thenakshprajapat)",
        category: "PROFILES",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/thenakshprajapat", "_blank");
        },
      },
      {
        id: "soc-x",
        title: "X / Twitter (@iDevNaksh)",
        category: "PROFILES",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://twitter.com/idevnaksh", "_blank");
        },
      },
      {
        id: "soc-linkedin",
        title: "LinkedIn (Naksh)",
        category: "PROFILES",
        icon: ExternalLink,
        action: () => {
          setIsOpen(false);
          window.open("https://linkedin.com/in/thenakshprajapat", "_blank");
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied, isMuted, isDark]
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-28 px-4 font-mono text-xs">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-sm border border-[var(--border-strong)] bg-[var(--card)] p-0 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5 bg-[var(--card)]">
              <Search className="size-4 text-emerald-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Jump to section, artifact, or action..."
                className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none font-mono"
              />
              <span className="hidden sm:inline-block text-[10px] text-[var(--muted)] bg-[var(--secondary)] border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-[11px] text-[var(--muted)]">
                  NO MATCHING SYSTEM ENTRIES FOR &ldquo;{query}&rdquo;
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
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-left transition-colors ${
                        isSelected
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-semibold"
                          : "text-[var(--foreground)] hover:bg-[var(--secondary)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="size-3.5 shrink-0 text-emerald-500" />
                        <span className="truncate text-xs">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-[var(--muted)]">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="size-3 text-emerald-500" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-[11px] text-[var(--muted)]">
              <div className="flex items-center gap-3">
                <span>[↑↓] NAVIGATE</span>
                <span>[↵] EXECUTE</span>
              </div>
              <span>NAKSH // SYSTEM_INDEX</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
