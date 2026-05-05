"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CallRecord {
  _id: string;
  patientPhone: string;
  procedure: string;
  summary: string;
  status: string;
  createdAt: string;
}

// Dynamically construct the URL
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3003";
export const remoteUrl = `${BASE_URL}/calls/trt-international`;

export default function ChatsListPage() {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(remoteUrl);
        const data = await response.json();
        // Sort by newest first
        setCalls(Array.isArray(data) ? data.reverse() : []);
      } catch (error) {
        console.error("Failed to fetch calls:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCalls();
  }, []);

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <span className="text-[#d4ff33] text-[10px] font-bold uppercase tracking-[0.2em]">
          Logistics / TRT International
        </span>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tighter">
          Conversations
        </h1>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-zinc-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6 px-8">Caller</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">Inquiry</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">AI Summary</TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6 px-8 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow><TableCell colSpan={4} className="text-center py-20 text-zinc-500">Loading conversations...</TableCell></TableRow>
            ) : (
              calls.map((chat) => (
                <TableRow key={chat._id} className="border-zinc-800/50 hover:bg-white/5 transition-colors group cursor-pointer">
                  <TableCell className="py-6 px-8">
                    <Link href={`/chats/${chat._id}`} className="font-mono text-zinc-100 block group-hover:text-[#d4ff33] transition-colors">
                      {chat.patientPhone}
                    </Link>
                  </TableCell>
                  <TableCell className="text-zinc-400 font-medium">{chat.procedure}</TableCell>
                  <TableCell className="text-zinc-500 italic max-w-md truncate">&quot;{chat.summary}&quot;</TableCell>
                  <TableCell className="px-8 text-right">
                    <Badge className="bg-zinc-800 text-zinc-400 border-none px-3 py-1 font-bold text-[10px] rounded-2xl capitalize">
                      {chat.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}