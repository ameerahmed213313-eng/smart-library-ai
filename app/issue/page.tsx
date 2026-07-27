"use client";

import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { supabase } from "@/app/lib/supabase";

type IssueRecord = {
  id: number;
  student_name?: string | null;
  book_title?: string | null;
  accession?: string | null;
  issue_date?: string | null;
  due_date?: string | null;
  return_date?: string | null;
  status?: string | null;
};

export default function IssuePage() {
  const [records, setRecords] = useState<IssueRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("issue_books")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setRecords([]);
    } else {
      setRecords((data as IssueRecord[]) || []);
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Smart Library AI
          </p>
          <h1 className="mt-3 text-4xl font-bold">Issue Books</h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            View issued books, student names, due dates, and return status.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Issued Records</h2>
            <button
              onClick={loadRecords}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading issue records...</p>
          ) : records.length === 0 ? (
            <p className="text-slate-500">No issue records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Student</th>
                    <th className="px-4 py-3 font-medium">Book</th>
                    <th className="px-4 py-3 font-medium">Accession</th>
                    <th className="px-4 py-3 font-medium">Issue Date</th>
                    <th className="px-4 py-3 font-medium">Due Date</th>
                    <th className="px-4 py-3 font-medium">Return Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100">
                      <td className="px-4 py-3">{record.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {record.student_name ?? "-"}
                      </td>
                      <td className="px-4 py-3">{record.book_title ?? "-"}</td>
                      <td className="px-4 py-3">{record.accession ?? "-"}</td>
                      <td className="px-4 py-3">{record.issue_date ?? "-"}</td>
                      <td className="px-4 py-3">{record.due_date ?? "-"}</td>
                      <td className="px-4 py-3">{record.return_date ?? "-"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {record.status ?? "Issued"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}