/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Database,
  Terminal,
  Shield,
  Cpu,
  MessageSquareQuote,
  BrainCircuit,
} from "lucide-react";
import { toast } from "sonner";

export default function BotConfigPage() {
  const [knowledge, setKnowledge] = useState("");
  const [prompt, setPrompt] = useState(""); 
  const [keywords, setKeywords] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBotConfig = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/config`);
        if (res.ok) {
          const data = await res.json();
          setKnowledge(data.knowledge || "");
          setPrompt(data.prompt || ""); 
          setGreeting(data.greeting || "");
          if (Array.isArray(data.keywords)) {
            setKeywords(data.keywords.join(", "));
          } else {
            setKeywords(data.keywords || "");
          }
        }
      } catch (err) {
        console.error("Failed to sync:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadBotConfig();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    const promise = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/update-config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ knowledge, prompt, keywords, greeting }),
    });

    toast.promise(promise, {
      loading: "Synchronizing Sarah's brain...",
      success: "Bot architecture synchronized!",
      error: (err) => `Sync failed: ${err.message}`,
    });

    try {
      const response = await promise;
      if (!response.ok) throw new Error("Sync failed");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-[#d4ff33] animate-pulse font-mono uppercase">Initializing Architecture...</div>;

  return (
    <div className="p-8 max-w-[auto]  space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-8">
        <div>
          <h1 className="text-5xl font-bold text-zinc-100 tracking-tighter">Sarah Config</h1>
          <p className="text-zinc-500 mt-2 text-lg font-medium italic">Adjust the neural layers and behavioral constraints.</p>
        </div>
        <button
          onClick={handleUpdate}
          disabled={isSaving}
          className="bg-[#d4ff33] text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(212,255,51,0.2)]"
        >
          {isSaving ? <RefreshCw className="animate-spin h-5 w-5" /> : <Save size={22} />}
          {isSaving ? "Syncing..." : "Sync Brain"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Behavioral Layer (Prompt) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <BrainCircuit className="text-[#d4ff33]" size={20} />
              <h3 className="font-mono font-bold uppercase tracking-tight">System Prompt</h3>
            </div>
            <textarea
              className="w-full h-[600px] bg-black/40 border border-zinc-800 rounded-2xl p-4 text-zinc-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-[#d4ff33]/50"
              placeholder="Persona instructions..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>

        <div className="xl:col-span-5 space-y-4">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Database className="text-[#d4ff33]" size={20} />
              <h3 className="font-mono font-bold uppercase tracking-tight">Knowledge Base</h3>
            </div>
            <textarea
              className="w-full h-[600px] bg-black/40 border border-zinc-800 rounded-2xl p-4 text-zinc-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-[#d4ff33]/50"
              placeholder="Factual logistics data..."
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
            />
          </div>
        </div>

        {/* Configuration Layer (Sidebar) */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <MessageSquareQuote className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">Greeting</h3>
            </div>
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full h-24 bg-black/40 border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:border-[#d4ff33]/50 outline-none"
            />
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Cpu className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">STT Keywords</h3>
            </div>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-black/40 border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:border-[#d4ff33]/50 outline-none"
            />
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Terminal className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">System</h3>
            </div>
            <div className="space-y-2">
              <StatusItem label="LLM" value="Llama-3.1" />
              <StatusItem label="STT" value="Nova-2" />
              <StatusItem label="TTS" value="11Labs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center bg-black/20 p-2 px-3 rounded-xl border border-zinc-800/50">
      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{label}</span>
      <span className="text-xs text-zinc-200 font-mono">{value}</span>
    </div>
  );
}