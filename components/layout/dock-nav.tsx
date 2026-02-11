"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Briefcase, FlaskConical, Brain, Radio } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Work", href: "/work", icon: Briefcase },
  { name: "Lab", href: "/lab", icon: FlaskConical },
  { name: "Mind", href: "/mind", icon: Brain },
  { name: "Signal", href: "/signal", icon: Radio },
];

export function DockNav() {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs md:max-w-none flex justify-center">
      <motion.nav
        onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
        onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        className="flex h-14 md:h-16 items-end gap-2 md:gap-4 rounded-2xl border border-white/10 bg-black/80 px-4 pb-3 backdrop-blur-xl shadow-2xl shadow-black/50"
        role="navigation"
        aria-label="Main Navigation"
      >
        {NAV_ITEMS.map((item) => (
          <DockIcon key={item.name} mouseX={mouseX} isMobile={isMobile} {...item} />
        ))}
      </motion.nav>
    </div>
  );
}

function DockIcon({
  mouseX,
  name,
  href,
  icon: Icon,
  isMobile,
}: {
  mouseX: any;
  name: string;
  href: string;
  icon: any;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === href;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href} aria-label={name}>
      <motion.div
        ref={ref}
        style={{ width: isMobile ? 40 : width }}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative group transition-colors",
          isActive ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
        )}
      >
        <Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        {isActive && (
          <span className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
        )}
        {!isMobile && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
            {name}
          </span>
        )}
      </motion.div>
    </Link>
  );
}
