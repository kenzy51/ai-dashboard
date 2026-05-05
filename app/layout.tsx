import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/sidebar";
import { Providers } from "@/components/providers";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai Dashboard",
  description: "Fusion Ai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white font-sans">
        <Providers>
          <div className="flex min-h-screen">
            {/* Show Sidebar if session exists */}
            {session && <Sidebar />}

            <main className="flex-1 h-screen overflow-y-auto">
              {session ? (
                // Wrapper for authenticated content
                <div className="w-full h-full flex flex-col">
                  <div className="max-w-6xl mx-auto w-full p-8 pb-0 uppercase tracking-wider text-[10px] font-bold text-zinc-500">
                    Overview / 2026 Marketing
                  </div>
                  {children}
                </div>
              ) : (
                // Wrapper for Login Page
                <div className="w-full h-full">{children}</div>
              )}
            </main>
          </div>
        </Providers>
        <Toaster theme="dark" position="bottom-right" closeButton richColors />
      </body>
    </html>
  );
}
