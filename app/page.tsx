/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { 
  Activity, 
  MessageSquare, 
  Settings, 
  Zap, 
  ArrowUpRight, 
  Globe 
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Active Sessions", value: "12", icon: Activity, color: "text-[#d4ff33]" },
    { label: "Total Transcripts", value: "1,284", icon: MessageSquare, color: "text-zinc-400" },
    { label: "AI Accuracy", value: "98.2%", icon: Zap, color: "text-[#d4ff33]" },
    { label: "Global Reach", value: "6 Hubs", icon: Globe, color: "text-zinc-400" },
  ];

  const quickActions = [
    { title: "Review Conversations", desc: "Check latest Sarah logs", link: "/chats" },
    { title: "Update AI Knowledge", desc: "Modify logistics data", link: "/config" },
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tighter max-w-2xl">
            Welcome back to the <span className="text-[#d4ff33]">Fusion AI</span> Control Center.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Sarah is currently online and managing freight inquiries for TRT International across all major US ports.
          </p>
        </div>
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4ff33]/10 blur-[100px] -mr-20 -mt-20" />
      </div>
      <div className="space-y-4">
        <h3 className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em] px-2">Quick Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <a 
              key={i} 
              href={action.link}
              className="group p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] hover:bg-white/5 transition-all flex flex-col justify-between h-40"
            >
              <div>
                <h4 className="text-zinc-100 font-bold text-xl group-hover:text-[#d4ff33] transition-colors">{action.title}</h4>
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