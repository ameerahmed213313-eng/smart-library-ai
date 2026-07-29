"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}