import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z.ai Code Scaffold - AI-Powered Development",
  description: "Modern Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Z.ai Team" }],
  icons: {
    icon: "data:image/png;base64,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",
  },
  openGraph: {
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
