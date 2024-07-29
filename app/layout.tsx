import "./globals.css";
import { Inter } from "next/font/google";
import NavSidebar from "./components/NavSidebar";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ThemeSwitch from "./components/ThemeSwitch";
import { ThemeProvider } from "@/app/contexts/ThemeProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Salad Maker",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <ThemeProvider>
      <html lang="en" className={`${inter.variable}`}>
        <head>
          <link rel="icon" href="/app/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body className="bg-base-200 text-base-content duration-500">
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
        </body>
      </html>
    </ThemeProvider>
  );
}
