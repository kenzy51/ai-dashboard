"use client";
import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Your shared fake data array
export const transcriptData = [
  {
    id: "6995fa670ed7b9cd0d455b03",
    patientPhone: "+19297696545",
    summary:
      "Inquiry about evaluation costs led to a confirmed NightLase booking for Feb 18 at 8:00 PM after handling a 7:00 PM conflict.",
    transcript:
      "user: How much does the initial evaluation cost?\nassistant: Our standard evaluation is $49, which includes a full digital scan. Would you like to check today's availability?\nuser: Yes. Can I book for appointment for today, 7PM?\nassistant: Let me check the live schedule... 7PM is currently full, but I have an opening at 8PM tonight or 9AM tomorrow. Which do you prefer?\nuser: Okay. 8PM works.\nassistant: Perfect. I have you down for 8PM tonight for your NightLase consultation. I'm sending a confirmation link to your phone now.\nuser: Great, thanks.",
    status: "booked",
    procedure: "NightLase",
    date: "Feb 18, 2026",
    time: "8:00 PM",
  },
  {
    id: "6995fa670ed7b9cd0d455b04",
    patientPhone: "+12125550198",
    summary: "Patient inquiring about whitening procedure costs.",
    transcript:
      "user: Do you do whitening?\nassistant: Yes, we offer Zoom whitening.\nuser: How much?\nassistant: $299.",
    status: "pending",
    procedure: "Whitening",
    date: "Feb 17, 2026",
    time: "N/A",
  },
];

export default function ChatsListPage() {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <span className="text-[#d4ff33] text-[10px] font-bold uppercase tracking-[0.2em]">
          Overview / 2026 Marketing
        </span>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tighter">
          Conversations
        </h1>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-zinc-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6 px-8">
                Patient
              </TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">
                Procedure
              </TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">
                AI Summary
              </TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6 px-8 text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transcriptData.map((chat) => (
              <TableRow
                key={chat.id}
                className="border-zinc-800/50 hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <TableCell className="py-6 px-8">
                  {/* Clicking this link takes you to the dynamic transcript page */}
                  <Link
                    href={`/chats/${chat.id}`}
                    className="font-mono text-zinc-100 block group-hover:text-[#d4ff33] transition-colors"
                  >
                    {chat.patientPhone}
                  </Link>
                </TableCell>
                <TableCell className="text-zinc-400 font-medium">
                  {chat.procedure}
                </TableCell>
                <TableCell className="text-zinc-500 italic max-w-md truncate">
                  &quot;{chat.summary}&quot;
                </TableCell>
                <TableCell className="px-8 text-right">
                  <Badge
                    className={`${
                      chat.status === "booked"
                        ? "bg-[#d4ff33] text-black"
                        : "bg-zinc-800 text-zinc-400"
                    } border-none rounded-lg px-3 py-1 font-bold text-[10px] rounded-2xl`}
                  >
                    {chat.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
