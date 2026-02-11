"use client";

import { motion } from "framer-motion";
import { Radio, Mail, Twitter, Github, Linkedin, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const CONTACT_LINKS = [
  {
    href: "mailto:hello@nakshdev.tech",
    icon: Mail,
    label: "Email",
    value: "hello@nakshdev.tech",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "https://twitter.com/idevnaksh",
    icon: Twitter,
    label: "Twitter",
    value: "@iDevNaksh",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    href: "https://github.com/thenakshprajapat",
    icon: Github,
    label: "GitHub",
    value: "github.com/thenakshprajapat",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    href: "https://linkedin.com/in/thenakshprajapat",
    icon: Linkedin,
    label: "LinkedIn",
    value: "Naksh Prajapati",
    gradient: "from-blue-600 to-blue-800",
  },
];

export default function SignalPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-4xl mx-auto pt-20">
      <div className="space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Radio className="w-10 h-10 text-green-600" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -z-10"
              >
                <Radio className="w-10 h-10 text-green-600" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                Signal
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Signal strength:{" "}
            <span className="text-green-600 font-semibold">Strong</span>.
            I am currently{" "}
            <span className="text-foreground font-semibold">online</span> and
            scanning for complex problems. If you are building something that
            scares you, open a channel.
          </p>

          {/* Status Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">Available for work</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Remote / India</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">GMT+5:30</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-4"
        >
          {CONTACT_LINKS.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Link
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${contact.gradient} text-white`}>
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      {contact.label}
                    </div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {contact.value}
                    </div>
                  </div>
                  <div className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Let's Build Something</h3>
          <p className="text-muted-foreground mb-6">
            Have a project in mind? I'm always interested in hearing about new
            opportunities and collaborations.
          </p>
          <Link
            href="mailto:hello@nakshdev.tech"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Send Me a Message
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
