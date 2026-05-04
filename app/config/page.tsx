"use client";
import { useState } from "react";
import { Save, RefreshCw, Database, Terminal, Shield, Cpu } from "lucide-react";

export default function BotConfigPage() {
  const [knowledge, setKnowledge] = useState(""); // Populate with your TRT_KNOWLEDGE
  const [keywords, setKeywords] = useState("TRT International, Drayage, Port Newark, RGN");
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async () => {
    setIsSaving(true);
    // Logic to send this to your NestJS backend: 
    // fetch('/api/bot/config', { method: 'POST', body: JSON.stringify({ knowledge, keywords }) })
    setTimeout(() => setIsSaving(false), 1500); 
  };

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
          {isSaving ? <RefreshCw className="animate-spin h-5 w-5" /> : <Save h-5 w-5 />}
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
              className="w-full h-[500px] bg-black/40 border border-zinc-800 rounded-2xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-[#d4ff33]/50 transition-colors"
              placeholder="Paste your TRT_KNOWLEDGE here..."
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Deepgram Keywords */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 text-zinc-100">
              <Cpu className="text-[#d4ff33]" size={20} />
              <h3 className="font-semibold">STT Keywords</h3>
            </div>
            <p className="text-xs text-zinc-500 mb-3 italic">Comma-separated words to boost Deepgram recognition.</p>
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
                Changes made here update the <strong>VoiceService</strong> config in real-time. 
                Ensure all mandatory variables like <strong>973-344-7100</strong> are present.
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