"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TimeGreeting() {
  const [greeting, setGreeting] = useState("");
  const [subtext, setSubtext] = useState("");
  const [colors, setColors] = useState({ text: "text-green-400/80", dot: "bg-green-400" });

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning.");
      setSubtext("Systems active. The coffee is brewing. Let's build.");
      setColors({ text: "text-amber-400/80", dot: "bg-amber-400" });
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon.");
      setSubtext("Deep work mode. Breaking things to fix them better.");
      setColors({ text: "text-orange-400/80", dot: "bg-orange-400" });
    } else if (hour >= 18 && hour < 22) {
      setGreeting("Good Evening.");
      setSubtext("Reviewing the day's logs. Planning the next sprint.");
      setColors({ text: "text-blue-400/80", dot: "bg-blue-400" });
    } else {
      setGreeting("Still Awake?");
      setSubtext("The world sleeps. The compiler runs. Still here.");
      setColors({ text: "text-purple-400/80", dot: "bg-purple-400" });
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={greeting}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-2 text-sm md:text-base font-mono ${colors.text} uppercase tracking-widest`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
          {greeting}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-sm md:text-base font-light"
        >
          {subtext}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
