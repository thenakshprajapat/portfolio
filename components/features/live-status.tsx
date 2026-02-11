"use client";

import { motion } from "framer-motion";
import { Music, Code, MapPin, Clock, Cloud, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Types for our data
interface StatusData {
  time: string;
  location: string;
  weather: string;
  spotify: {
    isPlaying: boolean;
    song: string;
    artist: string;
  };
  github?: {
    latestRepo: {
      name: string;
      url: string;
    } | null;
    totalContributions: number;
  };
  activity: string;
}

export function LiveStatus() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GitHub data
        const githubRes = await fetch('/api/github');
        const githubData = githubRes.ok ? await githubRes.json() : null;

        // Fetch Time data from WorldTimeAPI
        let timeString = "";
        try {
          const timeRes = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
          const timeData = await timeRes.json();
          const date = new Date(timeData.datetime);
          timeString = date.toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit",
            timeZone: "Asia/Kolkata",
            timeZoneName: "short"
          });
        } catch (e) {
          console.error("Time API Error", e);
          timeString = new Date().toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit",
            timeZone: "Asia/Kolkata",
            timeZoneName: "short"
          });
        }

        setData({
          time: timeString,
          location: "Jodhpur, Rajasthan",
          weather: "28°C Haze", // Still mock for now
          spotify: {
            isPlaying: true, // Still mock for now
            song: "Veridis Quo",
            artist: "Daft Punk"
          },
          github: githubData,
          activity: githubData?.latestRepo ? `Building ${githubData.latestRepo.name}` : "Visual Studio Code"
        });
      } catch (error) {
        console.error("Failed to fetch status data", error);
        // Fallback data
        setData({
          time: new Date().toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit", 
            timeZone: "Asia/Kolkata",
            timeZoneName: "short" 
          }),
          location: "Jodhpur, Rajasthan",
          weather: "Unknown",
          spotify: { isPlaying: false, song: "", artist: "" },
          activity: "Visual Studio Code"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Update time every minute
    const interval = setInterval(() => {
      setData(prev => prev ? ({
        ...prev,
        time: new Date().toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit", 
            timeZone: "Asia/Kolkata",
            timeZoneName: "short" 
        })
      }) : null);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl opacity-50">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <StatusCard 
        icon={Music} 
        label={data?.spotify.isPlaying ? "Now Playing" : "Last Played"} 
        value={data?.spotify.isPlaying ? `${data.spotify.song} - ${data.spotify.artist}` : "Spotify Offline"} 
        animate={data?.spotify.isPlaying}
        accent="text-green-400"
      />
      <StatusCard 
        icon={Code} 
        label={data?.github?.latestRepo ? "Active Repo" : "Focus"} 
        value={data?.activity} 
        accent="text-blue-400"
      />
      <StatusCard 
        icon={MapPin} 
        label="Coordinates" 
        value={data?.location} 
      />
      <StatusCard 
        icon={Cloud} 
        label="Atmosphere" 
        value={data?.weather} 
      />
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, animate = false, accent = "text-white" }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors"
    >
      <div className={`p-2.5 rounded-full bg-white/5 ${accent}`}>
        <Icon className={`w-5 h-5 ${animate ? "animate-pulse" : ""}`} />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">{label}</span>
        <span className="text-sm font-medium truncate w-full">{value}</span>
      </div>
    </motion.div>
  );
}
