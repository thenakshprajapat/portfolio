"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroPortal() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* The Portal Orb */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.div
                    style={{ scale }}
                    className="w-[30vw] h-[30vw] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-[100px] animate-pulse-slow"
                />
                <motion.div
                    style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 2]) }}
                    className="absolute w-[20vw] h-[20vw] md:w-[300px] md:h-[300px] rounded-full bg-black border border-white/5 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)] z-10"
                />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-20 w-full max-w-[90vw] mx-auto flex flex-col md:flex-row items-center justify-between pointer-events-none mix-blend-difference">
                <h1 className="text-[15vw] md:text-[12vw] font-thin tracking-tighter text-white leading-none">
                    NAKSH
                </h1>
                <h1 className="text-[15vw] md:text-[12vw] font-thin tracking-tighter text-white/50 italic leading-none md:text-right">
                    PRAJAPATI
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-20 text-center z-20"
            >
                <p className="text-sm md:text-base font-mono text-primary tracking-[0.5em] uppercase">
                    Enter The Void
                </p>
            </motion.div>
        </section>
    );
}
