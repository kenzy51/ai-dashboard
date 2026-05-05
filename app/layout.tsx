import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./src/components/sidebar";
import { Providers } from "./src/components/providers"; // Ensure you created this wrapper
import { getServerSession } from "next-auth";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if the user is logged in
  const session = await getServerSession();

  return (
    <html lang="en" className="dark"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Providers>
          <div className="flex min-h-screen"> 
            {session && <Sidebar />}
            
            <main className="flex-1 h-screen overflow-y-auto">
              {session && (
                <div className="max-w-6xl mx-auto p-8 pb-0 uppercase tracking-wider text-[10px] font-bold text-zinc-500">
                  Overview / 2026 Marketing
                </div>
              )}
              
              <div className={session ? "" : "flex items-center justify-center min-h-screen"}>
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}