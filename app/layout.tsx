import "./globals.css";
import { Inter } from "next/font/google";
import NavSidebar from "./components/NavSidebar";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ThemeSwitch from "./components/ThemeSwitch";
import { ThemeProvider } from "@/app/contexts/ThemeProvider";
import type { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Salad Maker",
  description: "The fastest way to build apps with Next.js and Supabase",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "Salad Maker",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-base-200 text-base-content duration-500">
        <ThemeProvider>
          <NavSidebar />
          <main className="min-h-screen ml-auto md:ml-80 flex flex-col items-center">
            {children}
          </main>
          <div className="absolute top-0 right-2 z-50">
            <div className="flex">
              <div className="w-fit items-center p-3 text-sm">
                {isSupabaseConnected && <AuthButton />}
              </div>
              <ThemeSwitch />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
