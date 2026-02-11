"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  year: string;
}

export function ProjectCard({ title, description, tags, link, github, year }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="md:col-span-2 flex flex-col justify-between">
        <span className="text-sm font-mono text-muted-foreground">{year}</span>
      </div>
      
      <div className="md:col-span-7 space-y-4">
        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-mono font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="md:col-span-3 flex md:justify-end gap-4 items-start">
        {github && (
          <Link 
            href={github}
            target="_blank"
            className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
        )}
        {link && (
          <Link 
            href={link}
            target="_blank"
            className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
