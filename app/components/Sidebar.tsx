"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/books", label: "Books", icon: "📚" },
  { href: "/students", label: "Students", icon: "👨‍🎓" },
  { href: "/issue", label: "Issue Books", icon: "📖" },
  { href: "/returns", label: "Returns", icon: "📥" },
  { href: "/notifications", label: "Notifications", icon: "🔔" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold leading-tight">Smart Library AI</h1>
        <p className="mt-2 text-sm text-slate-400">Library Management System</p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 transition",
                active
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white",
              ].join(" ")}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}