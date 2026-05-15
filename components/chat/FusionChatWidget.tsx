/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect, useRef } from "react";
// 💡 Added MessageCircleMore for that specific "chat bubble" look
import { MessageCircleMore, X, Send, Zap, ShieldCheck } from "lucide-react";

export default function FusionChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello, this is Sarah from TRT International. I'm a virtual assistant." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const socket = new WebSocket("wss://fusion-ai-bot.onrender.com/chat-stream");
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.event === "ai_response") {
        setMessages((prev) => [...prev, { role: "assistant", content: response.data }]);
        setIsTyping(false);
      }
    };
    socketRef.current = socket;
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || socketRef.current?.readyState !== WebSocket.OPEN) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setIsTyping(true);
    socketRef.current.send(JSON.stringify({ event: "message", data: { text: input, history: messages.slice(-5) } }));
    setInput("");
  };

  return (
    <div className="fusion-ai-app-container fixed inset-0 z-[999999999] pointer-events-none antialiased" style={{ isolation: 'isolate' }}>
      
      <div className={`fixed transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col pointer-events-auto
        ${isOpen 
          ? "inset-0 bg-zinc-950/40 backdrop-blur-3xl md:inset-auto md:bottom-8 md:right-8 md:w-[450px] md:h-[780px] md:rounded-[48px] md:border md:border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)]" 
          : "bottom-8 right-8 w-20 h-20"}`}>
        
        {isOpen ? (
          <>
            {/* --- HEADER --- */}
            <div className="pt-[env(safe-area-inset-top,24px)] md:pt-10 pb-6 px-8 flex justify-between items-center shrink-0 border-b border-white/5 bg-gradient-to-b from-zinc-900/40 to-transparent">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-[#d4ff33] to-[#8eb300] flex items-center justify-center shadow-[0_0_30px_rgba(212,255,51,0.3)]">
                    <Zap size={28} className="text-black" fill="black" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-black text-2xl tracking-tighter m-0 italic">SARAH</h3>
                    <ShieldCheck size={14} className="text-[#d4ff33] opacity-80" />
                  </div>
                  <p className="text-[9px] text-zinc-500 font-black tracking-[0.4em] uppercase mt-1">Operational Intel</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-zinc-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* --- MESSAGES --- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-hide overscroll-contain">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`relative max-w-[88%] px-6 py-4 rounded-[28px] text-[15px] leading-relaxed tracking-tight shadow-2xl ${
                      m.role === "user" ? "bg-[#d4ff33] text-black font-black rounded-tr-none" : "bg-zinc-900/60 text-zinc-100 rounded-tl-none border border-white/10 backdrop-blur-xl"
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* --- INPUT --- */}
            <div className="p-8 bg-gradient-to-t from-zinc-950 to-transparent shrink-0 relative z-[999999]">
              <div className="relative flex items-center group pointer-events-none">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4ff33] to-transparent rounded-[26px] blur opacity-0 group-focus-within:opacity-20 transition duration-700" />
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Initiate Command..."
                  className="widget-input relative w-full bg-[#09090b] border border-white/10 rounded-[24px] pl-7 pr-24 py-6 text-white text-[16px] outline-none focus:border-[#d4ff33]/40 m-0 shadow-inner z-[10]"
                  style={{ pointerEvents: 'auto' }}
                />
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); sendMessage(); }}
                  className="send-btn absolute right-2 w-16 h-16 bg-[#d4ff33] rounded-2xl text-black flex items-center justify-center hover:shadow-[0_0_25px_rgba(212,255,51,0.6)] group-active:scale-90 transition-all z-[20] cursor-pointer"
                >
                  <Send size={28} strokeWidth={3} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* 💡 UPDATED LAUNCHER: Circular background with filled chat icon to match reference */
          <button
            onClick={() => setIsOpen(true)}
            className="launcher-btn group relative bg-[#6B8E6B] w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all pointer-events-auto cursor-pointer"
            style={{ backgroundColor: '#6B8E6B' }} // Matches the sage/green in your screenshot exactly
          >
            <div className="absolute inset-0 rounded-full bg-[#6B8E6B] animate-ping opacity-20" />
            <MessageCircleMore size={38} className="text-white fill-[#d4ff33]" />
          </button>
        )}
      </div>

      <style>{`
        .fusion-ai-app-container .widget-input {
          all: revert !important;
          background: #09090b !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 24px !important;
          padding: 1.5rem 6.5rem 1.5rem 1.75rem !important;
          font-size: 16px !important;
          width: 100% !important;
          pointer-events: auto !important;
        }
        .fusion-ai-app-container button { 
          all: unset !important; 
          cursor: pointer !important; 
          display: flex !important; 
          align-items: center !important; 
          justify-content: center !important; 
          pointer-events: auto !important;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}