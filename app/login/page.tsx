"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { username, password, callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit} className="p-12 bg-zinc-900/50 border border-white/10 rounded-[40px] space-y-6 w-full max-w-md backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white tracking-tighter">Fusion AI Access</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-[#d4ff33]"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-[#d4ff33]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full h-14" type="submit">Unlock Dashboard</Button>
      </form>
    </div>
  );
}