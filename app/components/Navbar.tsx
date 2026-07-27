"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow-sm border-b border-slate-200 px-6 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-900">
        Smart Library Management System
      </h2>

      <div className="flex items-center gap-4">
        <Link
          href="/returns"
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200"
        >
          Returns
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}