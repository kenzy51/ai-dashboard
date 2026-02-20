"use client";
import { useState } from "react"; 
import Link from "next/link";
import { Plus, MessageSquare, Compass, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Chats", icon: MessageSquare, href: "/chats", badge: 2 },
  { name: "Explore", icon: Compass, href: "#" },
  { name: "Dashboard", icon: FileText, href: "/" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); 

  return (
    <div 
      className={`relative bg-zinc-900/40 backdrop-blur-xl flex flex-col p-4 gap-4 text-zinc-400 border border-white/10 rounded-[40px] h-[98vh] mt-2 ml-2 shadow-2xl transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-[#d4ff33] text-black rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo Area */}
      <div className={`px-4 py-2 mb-2 transition-all ${isCollapsed ? "text-center" : ""}`}>
        <h2 className="text-[#d4ff33] text-2xl font-bold lowercase tracking-tighter">
          {isCollapsed ? "f" : "fusion AI"}
        </h2>
      </div>

      <button className={`flex items-center bg-[#1a1a1a] hover:bg-[#252525] text-zinc-100 rounded-2xl border border-zinc-800/50 transition-all mb-4 ${
        isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-3 w-full"
      }`}>
        <Plus className="h-5 w-5 text-[#d4ff33]" />
        {!isCollapsed && <span className="font-medium whitespace-nowrap">New chat</span>}
      </button>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-2xl transition-all group relative ${
                isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"
              } ${
                isActive
                  ? "bg-[#1a1a1a] text-zinc-100 shadow-inner"
                  : "hover:bg-[#151515] hover:text-zinc-200 text-zinc-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon
                  className={`h-5 w-5 min-w-[20px] ${isActive ? "text-[#d4ff33]" : "group-hover:text-zinc-100"}`}
                />
                {!isCollapsed && <span className="text-[15px] font-medium">{item.name}</span>}
              </div>
              
              {!isCollapsed && item.badge && (
                <span className="bg-[#252525] text-zinc-400 text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#d4ff33] rounded-full shadow-[0_0_8px_#d4ff33]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-4 border-t border-zinc-800/50">
        <div className={`flex items-center gap-3 rounded-2xl transition-colors cursor-pointer hover:bg-[#1a1a1a] ${
          isCollapsed ? "justify-center py-2" : "px-3 py-2"
        }`}>
          <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 flex items-center justify-center text-white font-bold">
            K
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-zinc-100 truncate">
                Kanat Nazarov
              </span>
              <span className="text-xs text-zinc-500 italic">Admin</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}