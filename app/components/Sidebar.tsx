"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen shrink-0 bg-slate-900 p-6 text-white">
      <h1 className="mb-2 text-2xl font-bold">Smart Library AI</h1>

      <p className="mb-8 text-sm text-slate-400">
        Library Management System
      </p>

      <nav className="space-y-2">
        <Link href="/dashboard" className="block rounded-lg p-3 hover:bg-slate-700">
          🏠 Dashboard
        </Link>

        <Link href="/books" className="block rounded-lg p-3 hover:bg-slate-700">
          📚 Books
        </Link>

        <Link href="/students" className="block rounded-lg p-3 hover:bg-slate-700">
          👨‍🎓 Students
        </Link>

        <Link href="/issue" className="block rounded-lg p-3 hover:bg-slate-700">
          📖 Issue Books
        </Link>

        <Link href="/returns" className="block rounded-lg p-3 hover:bg-slate-700">
          📥 Returns
        </Link>
      </nav>
    </aside>
  );
}