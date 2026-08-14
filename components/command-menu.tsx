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
  category: "Pages" | "Projects" | "Actions" | "Socials";
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
      // Pages
      {
        id: "page-home",
        title: "Overview (Home)",
        category: "Pages",
        icon: Sparkles,
        action: () => navigateTo("/"),
      },
      {
        id: "page-work",
        title: "All Work & Engineering Projects",
        category: "Pages",
        icon: FolderGit2,
        action: () => navigateTo("/work"),
      },
      {
        id: "page-mind",
        title: "Mind Garden & Essays",
        category: "Pages",
        icon: BookOpen,
        action: () => navigateTo("/mind"),
      },
      {
        id: "page-journey",
        title: "Journey & Milestones",
        category: "Pages",
        icon: Milestone,
        action: () => navigateTo("/journey"),
      },
      {
        id: "page-lab",
        title: "Lab Experiments & Curated Stack",
        category: "Pages",
        icon: FlaskConical,
        action: () => navigateTo("/lab"),
      },
      {
        id: "page-contact",
        title: "Direct Contact Channel",
        category: "Pages",
        icon: Mail,
        action: () => navigateTo("/contact"),
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
        id: "proj-paper-analyzer",
        title: "Paper Analyzer (NLP Exam Intelligence)",
        category: "Projects",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://paper-analyzer.streamlit.app/", "_blank");
        },
      },
      {
        id: "proj-cs-resources",
        title: "CS Resources Hub (Zero-Noise)",
        category: "Projects",
        icon: Code2,
        action: () => {
          setIsOpen(false);
          window.open("https://thenakshprajapat.github.io/edtech-cs/", "_blank");
        },
      },
      // Actions
      {
        id: "act-theme",
        title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
        category: "Actions",
        icon: isDark ? Sun : Moon,
        action: toggleTheme,
      },
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
        title: isMuted ? "Unmute Audio Feedback" : "Mute Audio Feedback",
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
        title: "LinkedIn (Naksh)",
        category: "Socials",
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-0 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
              <Search className="size-5 text-[var(--muted)] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Type a page, project, or command..."
                className="w-full bg-transparent text-sm md:text-base text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none font-sans"
              />
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] bg-[var(--secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                ESC to close
              </span>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-[var(--muted)] font-mono">
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
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-medium"
                          : "text-[var(--foreground)] hover:bg-[var(--secondary)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-xl shrink-0 ${
                            isSelected ? "bg-emerald-500/20 text-emerald-500" : "bg-[var(--secondary)] text-[var(--muted)]"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span className="truncate font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-[var(--muted)] uppercase">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="size-3.5 text-emerald-500" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer info */}
            <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--secondary)] px-5 py-2.5 text-[12px] text-[var(--muted)] font-mono">
              <div className="flex items-center gap-3">
                <span>Navigate ↑↓</span>
                <span>Select ↵</span>
              </div>
              <span className="text-[var(--muted)]">naksh.dev</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
