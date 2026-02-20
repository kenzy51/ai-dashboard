"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronLeft, Phone, Calendar } from "lucide-react";

// Match the interface from your list page
interface CallRecord {
  _id: string;
  patientPhone: string;
  procedure: string;
  summary: string;
  transcript: string;
  status: string;
  createdAt: string;
}

export default function ChatDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [chat, setChat] = useState<CallRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        // Fetching from your NestJS backend
        const response = await fetch("http://127.0.0.1:3003/calls/tribeca-dental-studio");
        const data: CallRecord[] = await response.json();
        
        // Find the specific call by the ID in the URL
        const found = data.find((c) => c._id === id);
        setChat(found || null);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchChatDetails();
  }, [id]);

  if (isLoading) return <div className="p-20 text-zinc-500 animate-pulse">Loading transcript...</div>;
  if (!chat) return <div className="p-20 text-zinc-500">Transcript not found.</div>;

  // Process the transcript string into an array of message objects
  const messages = chat.transcript.split("\n").map((line) => {
    const [role, ...textParts] = line.split(": ");
    return { 
      role: role?.toLowerCase().trim() || "unknown", 
      content: textParts.join(": ") || "..." 
    };
  });

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={() => router.push("/chats")}
        className="flex items-center gap-2 text-zinc-500 hover:text-[#d4ff33] transition-colors group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to List
      </button>

      <div className="flex justify-between items-end border-b border-zinc-800/50 pb-8">
        <div className="space-y-1">
          <span className="text-[#d4ff33] text-[10px] font-bold uppercase tracking-[0.2em]">
            Detailed Transcript / {chat.procedure}
          </span>
          <h1 className="text-5xl font-bold text-zinc-100 tracking-tighter">
            {chat.patientPhone}
          </h1>
        </div>
        <Badge className="bg-[#d4ff33] text-black px-4 py-1.5 font-bold rounded-xl shadow-[0_0_20px_rgba(212,255,51,0.2)]">
          {chat.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Bubbles Section */}
        <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-[40px] p-8 min-h-[500px] flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">
                  {msg.role === "user" ? "Patient" : "Megan AI"}
                </span>
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-[24px] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-zinc-800 text-zinc-200 rounded-tr-none"
                      : "bg-[#d4ff33] text-black font-medium rounded-tl-none shadow-lg shadow-[#d4ff33]/5"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Analysis Section */}
        <div className="space-y-6">
          <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-[40px] p-8 h-fit space-y-8">
            <div>
              <h3 className="text-zinc-100 font-bold text-xs uppercase flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-[#d4ff33]" /> AI Summary
              </h3>
              <div className="bg-zinc-900/80 border border-white/5 p-5 rounded-3xl">
                <p className="text-zinc-400 text-sm italic leading-relaxed">
                  &quot;{chat.summary}&quot;
                </p>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between text-xs border-b border-zinc-800/50 pb-4">
                 <span className="text-zinc-500">Procedure</span>
                 <span className="text-zinc-200 font-mono">{chat.procedure}</span>
               </div>
               <div className="flex items-center justify-between text-xs">
                 <span className="text-zinc-500">Call Date</span>
                 <span className="text-zinc-200 font-mono">
                   {new Date(chat.createdAt).toLocaleDateString()}
                 </span>
               </div>
            </div>

            <button className="w-full bg-zinc-100 hover:bg-[#d4ff33] text-black font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl">
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}