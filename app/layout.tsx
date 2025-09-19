import Link from "next/link";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Random Breeds",
  description: "Random cat and dog breeds — Next.js + TypeScript + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-800 min-h-screen flex flex-col">
          <header className="bg-gray-300 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl text-slate-600 font-semibold">
                Random Breeds
              </h1>
              <nav>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:underline"
                >
                  Home
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-6xl mx-auto px-4 py-8">{children}</main>

          <footer className="bg-gray-300 border-t">
            <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-slate-500">
              Built with Next.js, TypeScript, Tailwind • Data from TheDogAPI &
              TheCatAPI
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
