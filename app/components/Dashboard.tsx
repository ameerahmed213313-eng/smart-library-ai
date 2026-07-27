"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/lib/supabase";
import StatCard from "./StatCard";
import BookSearch from "./BookSearch";
import VoiceSearch from "./VoiceSearch";

type Stats = {
  books: number;
  students: number;
  issued: number;
  returned: number;
  overdue: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    books: 0,
    students: 0,
    issued: 0,
    returned: 0,
    overdue: 0,
  });

  useEffect(() => {
    void loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
          Smart Library AI
        </p>
        <h1 className="mt-3 text-4xl font-bold">
          Library Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-slate-200">
          Monitor books, students, issued records, and search the library quickly with text or voice.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <span className="rounded-full bg-slate-200 px-4 py-1 text-sm font-medium text-slate-700">
            Live data
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Total Books" value={stats.books} icon="📚" />
          <StatCard title="Total Students" value={stats.students} icon="👨‍🎓" />
          <StatCard title="Issued Books" value={stats.issued} icon="📖" />
          <StatCard title="Returned Books" value={stats.returned} icon="📥" />
          <StatCard title="Overdue Books" value={stats.overdue} icon="⚠️" />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Search</h2>
          <span className="text-sm text-slate-500">
            Search by title, author, subject, or accession
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <BookSearch />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <VoiceSearch />
          </div>
        </div>
      </section>
    </div>
  );
}