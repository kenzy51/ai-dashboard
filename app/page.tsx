"use client";
import React, { useEffect, useState } from "react";
import { MessageSquare, Zap, ArrowUpRight, Phone, Signal } from "lucide-react";
import FusionChatWidget from "@/components/chat/FusionChatWidget";

// Import the URL from your chats page or define it here
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3003";
const remoteUrl = `${BASE_URL}/calls/trt-international`;

export default function Home() {
  const [callCount, setCallCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCallStats = async () => {
      try {
        const response = await fetch(remoteUrl);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCallCount(data.length);
        }
      } catch (error) {
        console.error("Failed to sync dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCallStats();
  }, []);

  const quickActions = [
    {
      title: "Review Conversations",
      desc: "Check latest Sarah logs",
      link: "/chats",
    },
    {
      title: "Update AI Knowledge",
      desc: "Modify logistics data",
      link: "/config",
    },
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      <FusionChatWidget />
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tighter max-w-2xl">
            Welcome back to the{" "}
            <span className="text-[#d4ff33]">Fusion AI</span> Control Center.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Sarah is currently online and managing freight inquiries for TRT
            International.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4ff33]/10 blur-[100px] -mr-20 -mt-20" />
      </div>
      {/* 2. LIVE TELEPHONY & STATS */}
      <div className="space-y-4">
        <h3 className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] px-2 flex items-center gap-2">
          <Signal className="w-3 h-3 text-[#d4ff33]" /> Live System Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Phone Number Display */}
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] flex items-center gap-4 col-span-2">
            <div className="p-4 bg-[#d4ff33]/10 rounded-2xl">
              <Phone className="text-[#d4ff33] w-6 h-6" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                Active Line
              </p>
              <h4 className="text-2xl font-mono text-white tracking-tighter">
                +1 (929) 702-2797
              </h4>
            </div>
          </div>

          {/* Dynamic Total Transcripts */}
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-3 h-3 text-zinc-500" />
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                Total Logs
              </p>
            </div>
            <span className="text-4xl font-bold text-white tracking-tighter">
              {isLoading ? "..." : callCount.toLocaleString()}
            </span>
          </div>

          {/* Accuracy Stat */}
          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-[#d4ff33]" />
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                AI Accuracy
              </p>
            </div>
            <span className="text-4xl font-bold text-[#d4ff33] tracking-tighter">
              98.2%
            </span>
          </div>
        </div>
      </div>

      {/* 3. QUICK COMMANDS */}
      <div className="space-y-4">
        <h3 className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] px-2">
          Navigation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <a
              key={i}
              href={action.link}
              className="group p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] hover:bg-white/5 transition-all flex flex-col justify-between h-32"
            >
              <div>
                <h4 className="text-zinc-100 font-bold text-xl group-hover:text-[#d4ff33] transition-colors">
                  {action.title}
                </h4>
                <p className="text-zinc-500 text-sm mt-1">{action.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-[#d4ff33] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Execute Command <ArrowUpRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
