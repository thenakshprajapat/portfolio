"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background px-6 md:px-20 pt-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-chart-2/20 rounded-full blur-[100px] opacity-30 animate-pulse-slow delay-1000" />
                <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] bg-chart-3/10 rounded-full blur-[80px] opacity-30 animate-pulse-slow delay-2000" />
            </div>

            <div className="max-w-5xl z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-2 mb-8"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-medium border border-border/50 backdrop-blur-sm">
                        Available for freelance work
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8"
                >
                    Building digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3">experiences</span> that matter.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
                >
                    I'm Naksh, a developer and designer crafting clean, aesthetic, and functional web applications. I bridge the gap between complex code and minimal design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <Link
                        href="#projects"
                        className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-4">
                        <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
                        <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
                        <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-5 h-5" />} label="Email" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
            >
                <span className="sr-only">Scroll down</span>
                <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-scroll-hint" />
                </div>
            </motion.div>
        </section>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
        >
            {icon}
        </a>
    );
}
