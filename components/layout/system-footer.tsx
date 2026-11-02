"use client";

import React, { useEffect, useState } from "react";

export function SystemFooter() {
  const [jaipurTime, setJaipurTime] = useState("");

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

  return (
    <footer className="border-t border-[var(--border)] bg-transparent py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-sm bg-[var(--accent)]" aria-hidden="true" />
          <span className="text-[var(--text)] font-medium">Naksh Prajapati</span>
          <span>·</span>
          <span>Built in Jaipur</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span>Jaipur (IST)</span>
          <span className="text-[var(--accent)] font-medium tabular-nums">
            {jaipurTime || "00:00:00 IST"}
          </span>
          <span>·</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
