"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { sound } from "@/lib/sound";
import { ESSAYS, type Essay } from "@/lib/essays";

export function MindDispatches() {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Open/close native <dialog> via ref and attach light-dismiss fallback per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setSelectedEssay(null);
    };

    const handleBackdropClick = (event: MouseEvent) => {
      if ("closedBy" in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  // Auto-open essay if URL hash matches on /writing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const found = ESSAYS.find((item) => item.id === hash);
    if (found) {
      setSelectedEssay(found);
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    }
  }, []);

  const openEssay = (e: React.MouseEvent<HTMLAnchorElement>, essay: Essay) => {
    e.preventDefault();
    sound.playPop();
    setSelectedEssay(essay);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1
            id="writing-heading"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text)]"
          >
            Writing
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Notes on mindset, psychology, and building software. Click any title to read.
          </p>
        </div>

        <div className="space-y-3">
          {ESSAYS.map((essay, idx) => (
            <motion.article
              key={essay.id}
              id={essay.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="group rounded-2xl matte-box hover:border-[var(--accent)] transition-colors"
            >
              <a
                href={essay.href}
                onClick={(e) => openEssay(e, essay)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 max-w-xl">
                  <span className="font-mono text-[11px] text-[var(--accent)]">
                    0{idx + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-medium tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {essay.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                  <span>{essay.date}</span>
                  <span className="text-[var(--text-dim)]">·</span>
                  <span>{essay.readTime}</span>
                  <ArrowUpRight
                    className="size-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Native <dialog closedby="any"> Modal Reader */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby="essay-dialog-title"
        className="essay-dialog"
      >
        {selectedEssay && (
          <div className="p-6 sm:p-7 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="space-y-1">
                <div className="font-mono text-[11px] text-[var(--accent)]">
                  {selectedEssay.date} · {selectedEssay.readTime}
                </div>
                <h2
                  id="essay-dialog-title"
                  className="text-lg sm:text-xl font-semibold text-[var(--text)]"
                >
                  {selectedEssay.title}
                </h2>
              </div>

              <form method="dialog">
                <button
                  type="submit"
                  onClick={() => sound.playClick()}
                  aria-label="Close article"
                  className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </form>
            </div>

            <div className="space-y-4 text-sm text-[var(--text)] leading-relaxed">
              {selectedEssay.content.split("\n\n").map((block, i) => {
                const lines = block.split("\n");
                if (lines.length > 1 && lines[0].startsWith('"')) {
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[var(--bg)]/60 border border-[var(--border)] space-y-1.5"
                    >
                      <p className="font-mono text-xs sm:text-sm font-semibold text-[var(--accent)]">
                        {lines[0]}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        {lines.slice(1).join(" ")}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-sm text-[var(--text)] leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>Naksh Prajapati</span>
              <span>hey@naksh.cc</span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
