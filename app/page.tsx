"use client";

import { InteractiveHero } from "@/components/interactive-hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { BlogSection } from "@/components/blog-section";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <InteractiveHero />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Blog/Thoughts Section */}
      <BlogSection />

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { icon: Github, href: "https://github.com/thenakshprajapat", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/naksh-prajapati", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/nakshprajapati", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@naksh.dev", label: "Email" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-full bg-secondary hover:bg-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 group-hover:text-primary-foreground transition-colors" />
                </Link>
              ))}
            </div>

            <Link
              href="mailto:hello@naksh.dev"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Naksh Prajapati. Crafted with care.</p>
          <p className="flex items-center gap-2">
            Built with Next.js & Framer Motion
          </p>
        </div>
      </footer>
    </main>
  );
}
