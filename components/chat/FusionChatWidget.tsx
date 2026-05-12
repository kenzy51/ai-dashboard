/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, PhoneCall } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FusionChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Sarah from TRT International. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const socketUrl = "wss://fusion-ai-bot.onrender.com/chat-stream";
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.event === "ai_response") {
          setMessages((prev) => [...prev, { role: "assistant", content: response.data }]);
          setIsTyping(false);
        }
      } catch (err) { console.error("WS Error:", err); }
    };

    socketRef.current = socket;
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    socketRef.current.send(JSON.stringify({
      event: "message",
      data: { text: input, history: messages.slice(-5) },
    }));
    setInput("");
  };

  const handleCall = () => { window.location.href = "tel:+19297022797"; };

  return (
    <div className="fusion-ai-app-container relative text-left antialiased">
      <div className={`fixed z-[9999] transition-all duration-300 ease-in-out flex flex-col
        ${isOpen 
          ? "inset-0 bg-zinc-950 md:inset-auto md:bottom-6 md:right-6 md:w-[420px] md:h-[700px] md:rounded-[32px] md:border md:border-white/10 shadow-2xl" 
          : "bottom-6 right-6"}`}>
        
        {isOpen ? (
          <>
            {/* Header: Adjusted for Mobile Notches */}
            <div className="pt-[env(safe-area-inset-top,12px)] md:pt-6 pb-4 px-6 bg-zinc-900/90 backdrop-blur-md border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#d4ff33] rounded-full shadow-[0_0_10px_#d4ff33]" />
                <div>
                  <h3 className="text-white font-bold text-base leading-none">Sarah AI</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">TRT Expert</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-zinc-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Chat Area: flex-1 allows it to shrink when keyboard opens */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-black overscroll-contain">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[16px] leading-relaxed shadow-sm ${
                      m.role === "user" ? "bg-[#d4ff33] text-black font-semibold rounded-tr-none" : "bg-zinc-800/80 text-zinc-100 rounded-tl-none border border-white/5"
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {/* Conditional Call Button */}
              {messages.length > 2 && !isTyping && (
                <div className="flex justify-center py-2">
                  <button onClick={handleCall} className="flex items-center gap-2 bg-[#d4ff33] text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-tight">
                    <PhoneCall size={14} /> Call Team Now
                  </button>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start animate-pulse text-[#d4ff33] text-[10px] font-bold uppercase tracking-widest pl-2">
                  Sarah is thinking...
                </div>
              )}
            </div>

            {/* Footer: Locked to Bottom above home bar */}
            <div className="p-4 pb-[max(env(safe-area-inset-bottom,16px),16px)] md:p-6 bg-zinc-900 border-t border-white/5 shrink-0">
              <div className="relative flex items-center w-full">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Message Sarah..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-5 pr-14 py-4 text-white text-[16px] outline-none focus:border-[#d4ff33]/50 transition-all !m-0"
                />
                <button onClick={sendMessage} className="absolute right-2 bg-[#d4ff33] p-3 rounded-xl text-black">
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <button onClick={() => setIsOpen(true)} className="group relative bg-[#d4ff33] w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[32px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
            <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] bg-[#d4ff33] animate-ping opacity-20" />
            <MessageCircle size={32} className="text-black" />
          </button>
        )}
      </div>

      <style>{`
        .fusion-ai-app-container * { box-sizing: border-box !important; }
        .fusion-ai-app-container input {
          all: revert !important;
          box-sizing: border-box !important;
          background-color: #18181b !important;
          color: #ffffff !important;
          border: 1px solid #27272a !important;
          padding: 1rem 3.5rem 1rem 1.25rem !important;
          border-radius: 1rem !important;
          font-size: 16px !important;
          width: 100% !important;
        }
        .fusion-ai-app-container input::placeholder { color: #71717a !important; opacity: 1 !important; }
        .fusion-ai-app-container button { all: revert !important; cursor: pointer !important; }
      `}</style>
    </div>
  );
}