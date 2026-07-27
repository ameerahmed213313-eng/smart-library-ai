"use client";

import { useState } from "react";
import { books } from "@/app/data/books";
import { students } from "@/app/data/students";

export default function ReturnBookPage() {
  const [bookId, setBookId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [issueDate] = useState("2026-07-20");
  const [dueDate] = useState("2026-08-03");
  const [returnDate, setReturnDate] = useState("");

  const [fine, setFine] = useState(0);
  const [lateDays, setLateDays] = useState(0);
  const calculateFine = (date: string) => {
  setReturnDate(date);

  if (!date) {
    setLateDays(0);
    setFine(0);
    return;
  }

  const due = new Date(dueDate);
  const returned = new Date(date);

  const diff = returned.getTime() - due.getTime();

  const days = Math.max(
    0,
    Math.ceil(diff / (1000 * 60 * 60 * 24))
  );

  setLateDays(days);
  setFine(days * 10);
};

  const handleReturn = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Book Returned Successfully!");

    setBookId("");
    setStudentId("");
    setReturnDate("");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        📚 Return Book
      </h1>

      <form onSubmit={handleReturn} className="space-y-4">

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.rollNo} - {student.name}
            </option>
          ))}
        </select>

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Book</option>

          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.accession} - {book.title}
            </option>
          ))}
        </select>

        <input
  type="date"
  value={returnDate}
  onChange={(e) => calculateFine(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
<div className="bg-gray-100 rounded-lg p-4 space-y-2">

  <p>
    <strong>Issue Date:</strong> {issueDate}
  </p>

  <p>
    <strong>Due Date:</strong> {dueDate}
  </p>

  <p>
    <strong>Return Date:</strong> {returnDate || "-"}
  </p>

  <p>
    <strong>Late Days:</strong> {lateDays}
  </p>

  <p className="text-red-600 font-bold text-lg">
    Fine: Rs. {fine}
  </p>

</div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Return Book
        </button>

      </form>

    </div>
  );
}
