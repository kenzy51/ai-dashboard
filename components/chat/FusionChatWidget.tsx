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
    { role: "assistant", content: "Hello! I'm Sarah from TRT International. How can I help you with your freight today?" }
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
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://fusion-ai-bot.onrender.com";
    const socketUrl = `${baseUrl.replace(/^http/, 'ws')}/chat-stream`;
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.event === 'ai_response') {
          setMessages(prev => [...prev, { role: 'assistant', content: response.data }]);
          setIsTyping(false);
        }
      } catch (err) { console.error("WS Message Error:", err); }
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
      event: 'message',
      data: { text: input, history: messages.slice(-5) }
    }));
    setInput("");
  };

  const handleCallEscalation = () => {
    window.location.href = "tel:+19297022797"; 
  };

  return (
    /* 💡 all-initial prevents WordPress from leaking global styles like 'line-height' or 'color' */
    <div className="all-initial font-sans selection:bg-[#d4ff33] selection:text-black">
      <div className={`fixed z-[9999] flex flex-col box-border transition-all duration-300
        ${isOpen ? 'inset-0 md:inset-auto md:bottom-6 md:right-6' : 'bottom-6 right-6'}`}>
        
        {isOpen ? (
          <div className="flex flex-col w-full h-full md:w-[420px] md:h-[650px] bg-zinc-950 md:border md:border-white/10 md:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6">
            
            {/* Header - Fixed Height for consistency */}
            <div className="pt-12 pb-6 px-6 md:pt-6 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center box-border !m-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#d4ff33] rounded-full shadow-[0_0_10px_#d4ff33]" />
                <div>
                  <h3 className="text-white font-bold text-lg leading-none !m-0">Sarah AI</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 !m-0">Logistics Expert</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={handleCallEscalation} className="p-2 hover:bg-[#d4ff33]/10 rounded-full text-[#d4ff33] transition-colors group !border-none !bg-transparent">
                  <PhoneCall size={20} className="group-hover:scale-110" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 !border-none !bg-transparent">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Chat Area - Flex Grow */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent box-border">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] md:text-sm leading-relaxed box-border ${
                      m.role === "user" ? "bg-[#d4ff33] text-black font-medium rounded-tr-none shadow-lg shadow-[#d4ff33]/10" : "bg-zinc-800/80 text-zinc-200 rounded-tl-none border border-white/5"
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {/* Call Trigger UI */}
              {messages.length > 2 && !isTyping && (
                <div className="flex flex-col items-center gap-3 py-4 animate-in zoom-in box-border">
                  <button 
                    onClick={handleCallEscalation}
                    className="group flex items-center gap-3 bg-[#d4ff33] text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-tight hover:scale-105 active:scale-95 transition-all shadow-xl !border-none"
                  >
                    <PhoneCall size={16} fill="black" />
                    Call Sarah Now
                  </button>
                </div>
              )}

              {isTyping && (
                 <div className="flex justify-start">
                   <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none border border-white/5">
                     <div className="flex gap-1 animate-pulse">
                       <div className="w-1.5 h-1.5 bg-[#d4ff33] rounded-full" />
                       <div className="w-1.5 h-1.5 bg-[#d4ff33] rounded-full" />
                       <div className="w-1.5 h-1.5 bg-[#d4ff33] rounded-full" />
                     </div>
                   </div>
                 </div>
              )}
            </div>

            {/* Input Footer - Fully Isolated */}
            <div className="p-4 pb-8 md:p-6 bg-zinc-900/80 border-t border-white/5 backdrop-blur-md box-border">
              <div className="relative flex items-center w-full !max-w-full box-border !m-0">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-5 pr-14 py-4 text-white text-[16px] focus:outline-none focus:border-[#d4ff33]/50 appearance-none !m-0 box-border !shadow-none"
                />
                <button 
                  onClick={sendMessage} 
                  disabled={!input.trim()}
                  className="absolute right-2 bg-[#d4ff33] p-3 rounded-xl text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-30 !m-0 flex items-center justify-center !border-none"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Floating Trigger Button */
          <button 
            onClick={() => setIsOpen(true)} 
            className="group relative bg-[#d4ff33] w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all !border-none !p-0"
          >
            <div className="absolute inset-0 rounded-[28px] bg-[#d4ff33] animate-ping opacity-20" />
            <MessageCircle size={32} className="text-black group-hover:rotate-12 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}