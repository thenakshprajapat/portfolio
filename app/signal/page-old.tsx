import { Radio, Mail, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function SignalPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pt-20">
      <div className="max-w-2xl space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-green-500 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Signal</h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Signal strength: Strong. I am currently <span className="text-foreground font-medium">online</span> and scanning for complex problems. 
            If you are building something that scares you, open a channel.
          </p>
        </div>

        <div className="grid gap-4">
          <ContactLink 
            href="mailto:hello@nakshdev.tech" 
            icon={Mail} 
            label="Email" 
            value="hello@nakshdev.tech" 
          />
          <ContactLink 
            href="https://twitter.com/idevnaksh" 
            icon={Twitter} 
            label="Twitter" 
            value="@iDevNaksh" 
          />
          <ContactLink 
            href="https://github.com/thenakshprajapat" 
            icon={Github} 
            label="GitHub" 
            value="github.com/thenakshprajapat" 
          />
          <ContactLink 
            href="https://linkedin.com/in/thenakshprajapat" 
            icon={Linkedin} 
            label="LinkedIn" 
            value="Naksh Prajapati" 
          />
        </div>
      </div>
    </div>
  );
}

function ContactLink({ href, icon: Icon, label, value }: any) {
  return (
    <Link 
      href={href}
      target="_blank"
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
    >
      <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-lg font-medium font-mono group-hover:text-primary transition-colors">
          {value}
        </span>
      </div>
    </Link>
  );
}
