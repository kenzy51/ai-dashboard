
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./src/components/sidebar";
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Add dark class for that gopis look */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Main Wrapper to hold Sidebar and Content side-by-side */}
        <div className="flex min-h-screen "> 
          <Sidebar />
          
          <main className="flex-1 p-8 h-screen overflow-y-auto">
            <div className="max-w-6xl mx-auto uppercase tracking-wider text-[10px] font-bold text-zinc-500 mb-6">
              Overview / 2026 Marketing
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}