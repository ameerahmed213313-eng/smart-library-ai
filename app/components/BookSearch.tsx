"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

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

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    const term = query.trim();
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .or(
        `title.ilike.%${term}%,author.ilike.%${term}%,subject.ilike.%${term}%,accession.ilike.%${term}%`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setResults([]);
    } else {
      setResults((data as Book[]) || []);
    }

    setLoading(false);
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">🔍 Search Books</h2>

      <div className="flex gap-3">
        <input
          className="flex-1 border rounded-lg p-3 text-black bg-white"
          placeholder="Enter title, author, subject, or accession"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {results.map((book) => (
          <div key={book.id} className="border rounded-lg p-3 bg-gray-50">
            <p className="font-bold">📖 {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Subject: {book.subject}</p>
            <p>Accession: {book.accession}</p>
            <p>
              Location: Cupboard {book.cupboard ?? "-"} | Shelf{" "}
              {book.shelf ?? "-"}
            </p>
            <p>Status: {book.status ?? "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}