import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import SessionGuard from "@/components/SessionGuard";
import { getSessionPayload, COOKIE_NAME } from "@/lib/session";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architecture Portfolio",
  description: "Architectural design and 3D visualization portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  const payload = sessionToken ? await getSessionPayload(sessionToken) : null;
  const isAdmin = payload?.isAdmin ?? false;

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="dot-grid" />
        <div className="glow-blob glow-blob-1" />
        <div className="glow-blob glow-blob-2" />
        <div className="glow-blob glow-blob-3" />
        <Navbar isAdmin={isAdmin} />
        <SessionGuard isAdmin={isAdmin}>
          {children}
        </SessionGuard>
      </body>
    </html>
  );
}
