/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Save, RefreshCw, Database, Terminal, Shield, Cpu, MessageSquareQuote } from "lucide-react";

export default function BotConfigPage() {
  const [knowledge, setKnowledge] = useState("");
  const [keywords, setKeywords] = useState("");
  const [greeting, setGreeting] = useState(""); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load current config on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/config`); 
        if (response.ok) {
          const data = await response.json();
          setKnowledge(data.knowledge);
          setKeywords(data.keywords.join(", "));
          setGreeting(data.greeting);
        }
      } catch (err) {
        console.error("Failed to load bot config:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/update-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          knowledge, 
          keywords, 
          greeting // Sending all three to the new LeadsController endpoint
        }),
      });

      if (response.ok) {
        alert("Bot architecture synchronized successfully!");
      } else {
        throw new Error("Sync failed");
      }
    } catch (error:any) {
      alert("Error updating bot: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-[#d4ff33] animate-pulse">Loading Sarah&apos;s brain...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-zinc-100 tracking-tighter">Bot Architecture</h1>
          <p className="text-zinc-500 mt-2 text-lg">Update Sarah&apos;s intelligence and STT keywords.</p>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={isSaving}
          className="bg-[#d4ff33] text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="animate-spin h-5 w-5" /> : <Save size={20} />}
          {isSaving ? "Syncing..." : "Apply Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Knowledge Base Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Database className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">Knowledge Base (System Prompt)</h3>
            </div>
            <textarea
              className="w-full h-[550px] bg-black/40 border border-zinc-800 rounded-2xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-[#d4ff33]/50 transition-colors"
              placeholder="Paste your TRT_KNOWLEDGE here..."
              spellCheck="false"
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Initial Greeting */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <MessageSquareQuote className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">Initial Greeting</h3>
            </div>
            <p className="text-xs text-zinc-500 mb-3 italic">What Sarah says as soon as someone picks up.</p>
            <textarea 
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full h-24 bg-black/40 border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-[#d4ff33]/50"
              placeholder="Hello, this is Sarah..."
            />
          </div>

          {/* Deepgram Keywords */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Cpu className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">STT Keywords</h3>
            </div>
            <p className="text-xs text-zinc-500 mb-3 italic">Comma-separated words to boost recognition.</p>
            <input 
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-black/40 border border-zinc-800 rounded-xl p-3 text-zinc-300 text-sm focus:outline-none focus:border-[#d4ff33]/50"
            />
          </div>

          {/* Model Status */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Terminal className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">Model Status</h3>
            </div>
            <div className="space-y-3">
              <StatusItem label="LLM" value="Llama-3.1-8b" />
              <StatusItem label="STT" value="Deepgram Nova-2" />
              <StatusItem label="TTS" value="ElevenLabs Flash" />
            </div>
          </div>

          <div className="p-4 bg-[#d4ff33]/5 border border-[#d4ff33]/20 rounded-2xl">
            <div className="flex gap-3">
              <Shield size={18} className="text-[#d4ff33] shrink-0" />
              <p className="text-[11px] text-zinc-400">
                Syncing triggers an instant update to <strong>Sarah&apos;s</strong> logic. 
                Ensure phone numbers and ports are accurate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-zinc-800/50">
      <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">{label}</span>
      <span className="text-sm text-zinc-200">{value}</span>
    </div>
  );
}