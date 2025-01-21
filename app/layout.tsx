import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/convex-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Syntax Studio",
  description: "An Online SaaS Code Editor"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen justify-between bg-gradient-to-b from-black to-gray-900 text-gray-100`}
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
