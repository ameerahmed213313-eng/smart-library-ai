"use client";

import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { getBooks } from "@/app/lib/supabase";

type Book = {
  id: number;
  title: string;
  author: string;
  subject: string;
  accession: string;
  cupboard?: string | null;
  shelf?: string | null;
  status?: string | null;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const data = await getBooks();
    setBooks(data as Book[]);
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Smart Library AI
          </p>
          <h1 className="mt-3 text-4xl font-bold">Books</h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            View all books, their authors, subjects, and current status in one place.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Book List</h2>
            <button
              onClick={loadBooks}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-slate-500">No books found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Author</th>
                    <th className="px-4 py-3 font-medium">Subject</th>
                    <th className="px-4 py-3 font-medium">Accession</th>
                    <th className="px-4 py-3 font-medium">Cupboard</th>
                    <th className="px-4 py-3 font-medium">Shelf</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="border-b border-slate-100">
                      <td className="px-4 py-3">{book.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {book.title}
                      </td>
                      <td className="px-4 py-3">{book.author}</td>
                      <td className="px-4 py-3">{book.subject}</td>
                      <td className="px-4 py-3">{book.accession}</td>
                      <td className="px-4 py-3">{book.cupboard ?? "-"}</td>
                      <td className="px-4 py-3">{book.shelf ?? "-"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {book.status ?? "Available"}
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