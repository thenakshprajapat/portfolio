"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "NEURAL SYNC",
        category: "AI INTERFACE",
        color: "#2DD4BF", // Teal
        description: "Brain-computer interface visualization."
    },
    {
        id: 2,
        title: "VOID TERMINAL",
        category: "DEV TOOLS",
        color: "#F97316", // Orange
        description: "High-performance command line infrastructure."
    },
    {
        id: 3,
        title: "ECHO CHAMBER",
        category: "AUDIO ENGINE",
        color: "#A855F7", // Purple
        description: "Spatial audio synthesis in the browser."
    },
    {
        id: 4,
        title: "PRISM UI",
        category: "DESIGN SYSTEM",
        color: "#EAB308", // Yellow
        description: "Accessible design system."
    }
];

function Card({ i, project, progress, range, targetScale }: { i: number, project: any, progress: MotionValue<number>, range: number[], targetScale: number }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="flex flex-col relative -top-[25%] h-[500px] w-full max-w-[1000px] rounded-[2rem] p-10 origin-top bg-[#1d1d1d] border border-white/10 overflow-hidden shadow-2xl"
            >
                <div className="flex h-full gap-10">
                    <div className="w-[40%] flex flex-col justify-between z-10">
                        <div>
                            <span className="font-mono text-sm tracking-widest uppercase text-white/40">{project.category}</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-2 text-white" style={{ color: project.color }}>{project.title}</h2>
                        </div>
                        <p className="text-white/60 text-lg">{project.description}</p>
                    </div>

                    <div className="relative w-[60%] h-full rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                        <motion.div style={{ scale: imageScale }} className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                            {/* Placeholder for image */}
                            <div className="w-32 h-32 rounded-full blur-[80px]" style={{ backgroundColor: project.color }} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export function ParallaxDeck() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <div ref={container} className="relative mt-[20vh] mb-[50vh]">
            <div className="sticky top-10 mb-20 px-6 md:px-20 z-0">
                <h2 className="text-[10vw] font-black text-white/5 uppercase select-none leading-none">WORKS</h2>
                <p className="font-mono text-primary text-sm uppercase tracking-widest ml-2">Selected Projects (2024-2026)</p>
            </div>
            {projects.map((project, i) => {
                const targetScale = 1 - ((projects.length - i) * 0.05);
                return <Card key={i} i={i} project={project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
            })}
        </div>
    )
}
