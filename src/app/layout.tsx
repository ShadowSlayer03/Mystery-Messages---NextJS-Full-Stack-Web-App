import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";

const exo = Exo({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Mystery Messages | Send Anonymous Messages",
  description:
    "An anonymous messaging app where you can send and receive messages without revealing your identity. Engage in conversations, spread positivity, or share a moment of humor with complete anonymity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${exo.className} dark`}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
