import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'; // Import ClerkProvider

const fontOnest = Onest({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "UtilsHub - The Ultimate Toolkit",
  description: "A suite of beautiful, modern web utilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontOnest.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <AppShell>{children}</AppShell>
                </ThemeProvider>
            </body>
        </html>
    </ClerkProvider>
  );
}