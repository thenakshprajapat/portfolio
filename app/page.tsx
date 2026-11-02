import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ManifestoHero } from "@/components/sections/manifesto-hero";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { GlidingWorkShowcase } from "@/components/sections/gliding-work-showcase";
import { ESSAYS } from "@/lib/essays";

export default function Home() {
  return (
    <main>
      {/* 1. Hero with unenclosed 3D India Globe */}
      <ManifestoHero />

      {/* 2. Subtle compact stack ticker */}
      <MarqueeTicker />

      {/* 3. Selected Work (Top 3 projects + link to /work for all 6) */}
      <GlidingWorkShowcase limit={3} />

      {/* 4. Compact multi-page preview cards for Writing, About & Contact */}
      <section className="pb-16 pt-2 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Writing Preview Card */}
          <div className="p-5 sm:p-6 rounded-2xl matte-box flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-[var(--text)]">
                  Writing
                </h2>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent)] hover:underline"
                >
                  <span>All notes</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {ESSAYS.map((essay) => (
                  <Link
                    key={essay.id}
                    href={essay.href}
                    className="py-2.5 flex items-center justify-between gap-3 group"
                  >
                    <span className="text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {essay.title}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-dim)] shrink-0">
                      {essay.date}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-[var(--text-dim)]">
              2 notes on ambition, mindset, and getting your mind working.
            </div>
          </div>

          {/* About & Contact Preview Card */}
          <div className="p-5 sm:p-6 rounded-2xl matte-box flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-[var(--text)]">
                  About &amp; Contact
                </h2>
                <span className="font-mono text-[11px] text-[var(--accent)]">
                  Jaipur, India
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                I&apos;m a computer science student at Arya College of Engineering
                &amp; I.T. focused on local-first apps, paise-accurate ledgers, and
                tools that work offline.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--border)]">
                  <div className="text-base font-semibold text-[var(--text)]">06</div>
                  <div className="font-mono text-[10px] text-[var(--text-dim)]">
                    Projects
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--border)]">
                  <div className="text-base font-semibold text-[var(--text)]">02</div>
                  <div className="font-mono text-[10px] text-[var(--text-dim)]">
                    Web + Android
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--border)]">
                  <div className="text-base font-semibold text-[var(--text)]">02</div>
                  <div className="font-mono text-[10px] text-[var(--text-dim)]">
                    HI + EN
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl matte-box font-mono text-xs text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <span>More about me</span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
