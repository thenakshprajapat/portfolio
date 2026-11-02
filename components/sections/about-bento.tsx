"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const APPROACH_ITEMS = [
  {
    title: "Local-first by default",
    body: "Whether it is 90 days of habit logs in IndexedDB or integer-paise expense records, my apps work locally in the browser or Android APK without forcing a login wall.",
  },
  {
    title: "Privacy-respecting",
    body: "Clean JSON export and import, explicit Firestore security rule locks when cloud sync is enabled, and no third-party trackers.",
  },
  {
    title: "Built for real problems",
    body: "Every repository started from a problem I ran into in Jaipur, from scanning past university exam papers with OCR to checking weather advisories in Hindi and English.",
  },
];

const STATS = [
  {
    value: 6,
    suffix: " projects",
    label: "Web, Android, and Python",
  },
  {
    value: 2,
    suffix: " platforms",
    label: "Web apps and Android APK",
  },
  {
    value: 2,
    suffix: " languages",
    label: "Hindi and English support",
  },
  {
    value: 8,
    suffix: " personas",
    label: "Weather dashboards in Mausam",
  },
];

const TIMELINE = [
  {
    period: "2025 to Present",
    title: "JECRC University, Jaipur",
    role: "B.Tech Computer Science Undergraduate",
    detail:
      "Building local-first web applications, Android APK builds with Capacitor, and Python OCR tools alongside university coursework.",
  },
  {
    period: "2025",
    title: "Independent Pivot",
    role: "Transitioned from RV University",
    detail:
      "Left RV University after my first year to focus on self-directed software development and shipping complete applications.",
  },
  {
    period: "2024 to 2025",
    title: "DevSphere",
    role: "Core Member, Developer Relations & Events",
    detail:
      "Co-organized the Perplexity Comet developer meetup and student technical workshops in collaboration with GitHub Education.",
  },
  {
    period: "2022 to 2024",
    title: "St. Paul's Senior Secondary School, Pali",
    role: "Secondary Education (PCB + Computer Science)",
    detail:
      "Started programming in C++, working with pointers, data structures, and object-oriented fundamentals.",
  },
];

export function AboutBento() {
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
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-12"
    >
      {/* Header & Short Bio */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label text-[var(--accent)]">About</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            Jaipur, India · {jaipurTime || "IST"}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          id="about-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text)] leading-snug"
        >
          I build{" "}
          <span className="text-[var(--accent)] font-normal italic">
            local-first
          </span>
          , privacy-respecting software and small tools that solve real problems
          I hit myself.
        </motion.h1>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          I&apos;m a computer science undergraduate at JECRC University in
          Jaipur. I started programming in school in Pali with C++ and now spend
          most of my time building web apps, Android tools, and Python utilities
          from scratch.
        </p>
      </div>

      {/* 3 Rounded Approach Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {APPROACH_ITEMS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="p-5 rounded-2xl matte-box space-y-2"
          >
            <span className="font-mono text-xs text-[var(--accent)]">
              0{idx + 1}
            </span>
            <h2 className="text-base font-semibold text-[var(--text)]">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 4 Compact Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.suffix}
            className="p-4 sm:p-5 rounded-2xl matte-box space-y-1"
          >
            <div className="text-lg sm:text-xl font-semibold text-[var(--accent)] font-mono tabular-nums">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                duration={1200}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Education & Path Timeline */}
      <div className="space-y-4 pt-2">
        <h2 className="mono-label text-[var(--accent)]">Education &amp; Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIMELINE.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl matte-box space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[var(--accent)]">{item.period}</span>
                <span className="text-[var(--text-dim)]">{item.role}</span>
              </div>
              <h3 className="text-base font-semibold text-[var(--text)]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
