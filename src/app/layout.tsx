import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "@/provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Kopi Nikita",
  description: "Modern E-Commerce with latest stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="mx-auto max-w-7xl px-8 min-h-screen">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
