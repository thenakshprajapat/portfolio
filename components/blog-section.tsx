"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./ui/tilt-card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
}

const FEATURED_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalist Design",
    excerpt: "How removing elements can create more impactful user experiences. Less is often more when it comes to modern interfaces.",
    date: "Feb 10, 2026",
    readTime: "5 min",
    category: "Design",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: "2",
    title: "Building Interactive Animations",
    excerpt: "A deep dive into Framer Motion and creating delightful micro-interactions that users love.",
    date: "Feb 5, 2026",
    readTime: "8 min",
    category: "Development",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "3",
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies and trends that will shape how we build for the web in 2026 and beyond.",
    date: "Jan 28, 2026",
    readTime: "6 min",
    category: "Industry",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export function BlogSection() {
  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Latest <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Thoughts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ideas, insights, and explorations on design, development, and the craft of building digital experiences.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard tiltStrength={5} className="h-full">
                <Link
                  href={`/mind#${post.id}`}
                  className="group block h-full"
                >
                  <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                      className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/mind"
            className="group inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            View all thoughts
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
