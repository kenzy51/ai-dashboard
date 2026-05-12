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
      content: "Hello! I'm Sarah from TRT International. How can I help you with your freight today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // WebSocket Connection
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://fusion-ai-bot.onrender.com";
    const socketUrl = `${baseUrl.replace(/^http/, "ws")}/chat-stream`;
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.event === "ai_response") {
          setMessages((prev) => [...prev, { role: "assistant", content: response.data }]);
          setIsTyping(false);
        }
      } catch (err) {
        console.error("WS Message Error:", err);
      }
    };

    socketRef.current = socket;
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    socketRef.current.send(
      JSON.stringify({
        event: "message",
        data: { text: input, history: messages.slice(-5) },
      }),
    );
    setInput("");
  };

  const handleCallEscalation = () => {
    window.location.href = "tel:+19297696545";
  };

  return (
    <div className="fusion-ai-app-container">
      {/* Style Overrides:
          This ensures that even if WordPress has global 'input' or 'button' styles,
          they don't break our specific widget UI.
      */}
      <style>{`
        .fusion-ai-app-container * {
          box-sizing: border-box !important;
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
        }
        .fusion-ai-app-container input {
          all: revert !important;
          box-sizing: border-box !important;
        }
        .fusion-ai-app-container button {
          all: revert !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
        }
      `}</style>

      <div className={`fixed z-[9999] flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? "inset-0 md:inset-auto md:bottom-6 md:right-6" : "bottom-6 right-6"}`}>
        
        {isOpen ? (
          <div className="flex flex-col w-full h-full md:w-[420px] md:h-[650px] bg-zinc-950 md:border md:border-white/10 md:rounded-[32px] shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="pt-12 pb-6 px-6 md:pt-6 bg-zinc-900/90 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#d4ff33] rounded-full shadow-[0_0_10px_#d4ff33]" />
                <div>
                  <h3 className="text-white font-bold text-lg m-0 p-0 leading-none">Sarah AI</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 m-0 p-0">Logistics Expert</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCallEscalation}
                  className="p-2 bg-transparent border-none text-[#d4ff33] hover:opacity-70 transition-opacity"
                >
                  <PhoneCall size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-transparent border-none text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-black">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#d4ff33] text-black font-medium rounded-tr-none"
                        : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5"
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none animate-pulse text-[#d4ff33] text-xs font-bold">
                    Sarah is typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 pb-8 md:p-6 bg-zinc-900 border-t border-white/5">
              <div className="relative flex items-center w-full">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about your shipment..."
                  className="w-full bg-black border border-zinc-800 rounded-2xl pl-5 pr-14 py-4 text-white text-[16px] outline-none focus:border-[#d4ff33] transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="absolute right-2 bg-[#d4ff33] p-3 rounded-xl border-none text-black hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 flex items-center justify-center"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Floating Trigger */
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 md:w-20 md:h-20 bg-[#d4ff33] rounded-2xl md:rounded-[28px] flex items-center justify-center shadow-2xl border-none hover:scale-110 transition-transform relative"
          >
            <div className="absolute inset-0 rounded-2xl md:rounded-[28px] bg-[#d4ff33] animate-ping opacity-20" />
            <MessageCircle size={32} className="text-black" />
          </button>
        )}
      </div>
    </div>
  );
}