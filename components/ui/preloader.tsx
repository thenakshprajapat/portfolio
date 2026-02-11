"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const words = ["INITIALIZING", "LOADING ASSETS", "CALIBRATING", "RENDER COMPLETE"];

    useEffect(() => {
        if (index === words.length - 1) {
            const timeout = setTimeout(() => setFinished(true), 1000);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(
            () => {
                setIndex(index + 1);
            },
            index === 0 ? 1000 : 150
        );
        return () => clearTimeout(timeout);
    }, [index, words.length]);

    return (
        <AnimatePresence mode="wait">
            {!finished && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <motion.p
                            key={words[index]}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl font-mono tracking-widest text-white/80"
                        >
                            {words[index]}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
