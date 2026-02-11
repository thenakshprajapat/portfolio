"use client";

import { motion } from "framer-motion";
import { Copy, Github, Home, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function MagneticNav() {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
            <MagneticItem>
                <Link href="/" className="p-4 rounded-full bg-secondary/20 backdrop-blur-lg border border-white/10 text-primary hover:bg-white/10 transition-colors">
                    <Home className="w-6 h-6" />
                </Link>
            </MagneticItem>

            <div className="h-8 w-px bg-white/10 mx-2" />

            <MagneticItem>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-secondary/20 backdrop-blur-lg border border-white/10 text-foreground hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />
                </a>
            </MagneticItem>
            <MagneticItem>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-secondary/20 backdrop-blur-lg border border-white/10 text-foreground hover:text-primary transition-colors">
                    <Twitter className="w-6 h-6" />
                </a>
            </MagneticItem>
            <MagneticItem>
                <a href="mailto:hello@example.com" className="p-4 rounded-full bg-secondary/20 backdrop-blur-lg border border-white/10 text-foreground hover:text-primary transition-colors">
                    <Mail className="w-6 h-6" />
                </a>
            </MagneticItem>
        </div>
    );
}

function MagneticItem({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
