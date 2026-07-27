"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "@/app/lib/supabase";

type Book = {
  id: number;
  accession: string;
  title: string;
  author: string;
  subject: string;
  status: string;
  cupboard: string;
  shelf: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
  setLoading(true);

  const books = await getBooks();

  setBooks(books);
  setLoading(false);
}

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    await deleteBook(id);

    toast.success("Book deleted successfully!");

    void fetchBooks();
  }

  const filteredBooks = books.filter((book) => {
    const keyword = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.accession.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading books...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          📚 Library Books
        </h1>

        <Link
          href="/books/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Book
        </Link>

      </div>

      <input
        type="text"
        placeholder="Search by title, author or accession..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <table className="w-full border-collapse border">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Accession</th>
            <th className="border p-3">Title</th>
            <th className="border p-3">Author</th>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredBooks.map((book) => (

            <tr key={book.id}>

              <td className="border p-3">{book.accession}</td>

              <td className="border p-3">{book.title}</td>

              <td className="border p-3">{book.author}</td>

              <td className="border p-3">{book.subject}</td>

              <td className="border p-3">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    book.status === "Available"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {book.status}
                </span>

              </td>

              <td className="border p-3 space-x-2">

                <Link
                  href={`/books/${book.id}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  View
                </Link>

                <Link
                  href={`/books/edit/${book.id}`}
                  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}