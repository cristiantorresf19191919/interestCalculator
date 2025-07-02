import './globals.css';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "@/components/ui/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Smart Loan Manager',
  description: 'Discover and manage loans with ease',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 transition-colors duration-500`}>
        <Toaster />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
