/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Database,
  Terminal,
  Cpu,
  MessageSquareQuote,
  Mic,
  MessageCircle,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export default function BotConfigPage() {
  const [knowledge, setKnowledge] = useState("");
  const [chatPrompt, setChatPrompt] = useState(""); 
  const [prompt, setPrompt] = useState(""); 
  const [keywords, setKeywords] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadBotConfig = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/config`);
        if (res.ok) {
          const data = await res.json();
          setKnowledge(data.knowledge || "");
          setChatPrompt(data.chatPrompt || ""); 
          setPrompt(data.prompt || "");
          setGreeting(data.greeting || "");
          setKeywords(Array.isArray(data.keywords) ? data.keywords.join(", ") : data.keywords || "");
        }
      } catch (err) { console.error("Sync failed:", err); }
    };
    loadBotConfig();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    const promise = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/leads/update-config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ knowledge, chatPrompt,prompt , keywords, greeting }),
    });

    toast.promise(promise, {
      loading: "Updating Neural Weights...",
      success: "Sarah Re-Calibrated.",
      error: "Sync Failed.",
    });

    try { await promise; } catch (error: any) { console.error(error); } finally { setIsSaving(false); }
  };

  return (
    <div className="p-8 max-w-[auto] space-y-8 animate-in fade-in duration-700">
      
      {/* --- REFINED HEADER --- */}
      <div className="flex justify-between items-center border-b border-white/5 pb-10">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Neural Architecture</h1>
          <p className="text-zinc-500 mt-2 text-lg font-medium italic">Logic stacking for multi-modal logistics agents.</p>
        </div>
        
        <button
          onClick={handleUpdate}
          disabled={isSaving}
          className="bg-[#d4ff33] text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,255,51,0.2)]"
        >
          {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? "Syncing" : "Push Architecture"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PRIMARY LOGIC (8 COLS) */}
        <div className="lg:col-span-8 space-y-8">
          
          <ConfigCard icon={<Database size={16}/>} title="Data Core (Knowledge Base)">
            <textarea
              className="config-textarea h-[400px]"
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              placeholder="Inject raw logistics data..."
            />
          </ConfigCard>

          <ConfigCard icon={<MessageCircle size={16}/>} title="Chat Intelligence (Web Persona)">
            <textarea
              className="config-textarea h-[400px]"
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              placeholder="Visual cues, lead capture logic..."
            />
          </ConfigCard>

          <ConfigCard icon={<Mic size={16}/>} title="Voice Intelligence (Acoustic Persona)">
            <textarea
              className="config-textarea h-[400px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Speech patterns and brevity..."
            />
          </ConfigCard>
        </div>

        {/* RIGHT COLUMN: CONSTRAINTS & STATUS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          <ConfigCard icon={<MessageSquareQuote size={16}/>} title="Initial Greeting">
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="config-textarea h-32"
            />
          </ConfigCard>

          <ConfigCard icon={<Cpu size={16}/>} title="Acoustic Keywords">
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="config-textarea h-32"
              placeholder="TRT, Ro-Ro, Freight..."
            />
          </ConfigCard>

          <ConfigCard icon={<Activity size={16}/>} title="Neural Environment">
            <div className="space-y-3 pt-2">
              <StatusItem label="LLM ENGINE" value="GPT-4o / Llama-3" />
              <StatusItem label="VOICE ENGINE" value="11Labs Pro" />
              <StatusItem label="EAR" value="Deepgram Nova-2" />
              <StatusItem label="SECURITY" value="AES-256 Encrypted" />
              
              <div className="mt-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Live Sync Latency</span>
                  <span className="text-xs text-[#d4ff33] font-mono">28ms</span>
                </div>
                <div className="flex gap-1 h-8 items-end">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-[#d4ff33] rounded-full opacity-20 animate-pulse" 
                      style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ConfigCard>

          <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-[32px] text-center">
             <Terminal size={20} className="mx-auto text-zinc-700 mb-2" />
             <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.4em]">Fusion AI v4.2.0-Stable</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .config-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 1.5rem;
          color: #d1d1d6;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.6;
          outline: none;
          resize: vertical;
          transition: all 0.3s ease;
        }
        .config-textarea:focus {
          border-color: rgba(212, 255, 51, 0.3);
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 20px rgba(212, 255, 51, 0.05);
        }
      `}</style>
    </div>
  );
}

function ConfigCard({ icon, title, children }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-[40px] p-8 backdrop-blur-xl hover:border-white/10 transition-all duration-500">
      <div className="flex items-center gap-3 mb-6 text-zinc-400">
        <span className="text-[#d4ff33]">{icon}</span>
        <h3 className="font-black uppercase tracking-[0.2em] text-[10px]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/[0.03]">
      <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{label}</span>
      <span className="text-[11px] text-zinc-300 font-mono font-bold tracking-tight">{value}</span>
    </div>
  );
}