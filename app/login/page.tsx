"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // Import icons for a better UI

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Access Denied", {
        description: "Invalid credentials for Fusion AI.",
      });
    } else {
      toast.success("Welcome", {
        description: "Decrypting dashboard architecture...",
      });
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="p-12 bg-zinc-900/50 border border-white/10 rounded-[40px] space-y-6 w-full max-w-md backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold text-white tracking-tighter">
          Fusion AI Access
        </h1>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-[#d4ff33]"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Dynamic type change
            placeholder="Password"
            className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-[#d4ff33] pr-12"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button" // Important: set to button so it doesn't trigger form submit
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button className="w-full h-14" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}