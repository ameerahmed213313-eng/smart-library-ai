"use client";

import * as React from "react";
import { books } from "@/app/data/books";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BookCombobox({
  value,
  onChange,
}: Props) {
  const [search, setSearch] = React.useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.accession.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="🔍 Search Book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-2"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-3"
      >
        <option value="">Select Book</option>

        {filteredBooks.map((book) => (
          <option key={book.id} value={book.id}>
            {book.accession} - {book.title}
          </option>
        ))}
      </select>
    </div>
  );
}