"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CallRecord {
  _id: string;
  patientPhone: string;
  procedure: string;
  summary: string;
  status: string;
  createdAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3003";
export const remoteUrl = `${BASE_URL}/calls/trt-international`;

export default function ChatsListPage() {
  const router = useRouter();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(remoteUrl);
        const data = await response.json();
        
        // Sort by Date (Latest First)
        const sortedData = Array.isArray(data)
          ? data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
          : [];
        setCalls(sortedData);
      } catch (error) {
        console.error("Failed to fetch calls:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCalls();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(calls.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = calls.slice(indexOfFirstItem, indexOfLastItem);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <span className="text-[#d4ff33] text-[10px] font-bold uppercase tracking-[0.2em]">
          Logistics / TRT International
        </span>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tighter">
          Conversations
        </h1>
      </div>

      {/* Main Table Container */}
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-zinc-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6 px-8">
                Date
              </TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">
                Caller
              </TableHead>
              <TableHead className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest py-6">
                Inquiry
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-zinc-500">
                  Loading conversations...
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((chat) => (
                <TableRow
                  key={chat._id}
                  onClick={() => router.push(`/chats/${chat._id}`)}
                  className="border-zinc-800/50 hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <TableCell className="py-6 px-8 text-zinc-500 text-xs font-medium">
                    {formatDate(chat.createdAt)}
                  </TableCell>
                  <TableCell className="font-mono text-zinc-100 group-hover:text-[#d4ff33] transition-colors">
                    {chat.patientPhone}
                  </TableCell>
                  <TableCell className="text-zinc-400 font-medium">
                    {chat.procedure}
                  </TableCell>
                  <TableCell className="text-zinc-500 italic max-w-xs truncate">
                    &quot;{chat.summary}&quot;
                  </TableCell>
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

        {/* Pagination Controls */}
        {!isLoading && calls.length > itemsPerPage && (
          <div className="flex items-center justify-between px-8 py-6 bg-white/5 border-t border-zinc-800/50">
            <p className="text-xs text-zinc-500">
              Showing <span className="text-zinc-300">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-zinc-300">
                {Math.min(indexOfLastItem, calls.length)}
              </span>{" "}
              of <span className="text-zinc-300">{calls.length}</span> calls
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-[#d4ff33] hover:text-black rounded-xl transition-all"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-[#d4ff33] hover:text-black rounded-xl transition-all"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}