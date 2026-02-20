"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronLeft } from "lucide-react";
import { transcriptData } from "../page"; // Import the same data

export default function ChatDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const chat = transcriptData.find((c) => c.id === id);

  if (!chat)
    return <div className="p-20 text-zinc-500">Transcript not found.</div>;

  const messages = chat.transcript.split("\n").map((line) => {
    const [role, ...text] = line.split(": ");
    return { role: role.toLowerCase().trim(), content: text.join(": ") };
  });

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={() => router.push("/chats")}
        className="flex items-center gap-2 text-zinc-500 hover:text-[#d4ff33] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to List
      </button>

      <div className="flex justify-between items-end border-b border-zinc-800/50 pb-8">
        <div>
          <h1 className="text-5xl font-bold text-zinc-100 tracking-tighter">
            {chat.patientPhone}
          </h1>
        </div>
        <Badge className="bg-[#d4ff33] text-black px-4 py-1.5 font-bold rounded-xl">
          {chat.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-zinc-800/50 rounded-[40px] p-8 min-h-[500px] flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-[24px] ${
                  msg.role === "user"
                    ? "bg-[#1a1a1a] text-zinc-300"
                    : "bg-[#d4ff33] text-black font-semibold"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#0f0f0f] border border-zinc-800/50 rounded-[40px] p-8 h-fit space-y-8">
          <div>
            <h3 className="text-zinc-100 font-bold text-xs uppercase flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-[#d4ff33]" /> AI Summary
            </h3>
            <p className="text-zinc-400 text-sm italic bg-zinc-900/50 p-4 rounded-2xl">
              &quot;{chat.summary}&quot;
            </p>
          </div>
          <button className="w-full bg-zinc-100 text-black font-bold py-4 rounded-2xl">
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
