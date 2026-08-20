"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { sound } from "@/lib/sound";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("naksh_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    sound.playClick();
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("naksh_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="size-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-emerald-500/40 transition-all cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="size-3.5 text-amber-400" />
      ) : (
        <Moon className="size-3.5 text-emerald-600" />
      )}
    </button>
  );
}
