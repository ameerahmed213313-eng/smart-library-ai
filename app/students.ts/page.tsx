"use client";

import Link from "next/link";
import { useState } from "react";
import { students, type Student } from "@/app/data/students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student: Student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      student.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          👨‍🎓 Student Management
        </h1>

        <Link
          href="/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-6"
      />

      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Roll No</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Department</th>
            <th className="border p-3">Semester</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td className="border p-3">{student.rollNo}</td>
              <td className="border p-3">{student.name}</td>
              <td className="border p-3">{student.department}</td>
              <td className="border p-3">{student.semester}</td>
              <td className="border p-3">{student.phone}</td>

              <td className="border p-3 space-x-2">
                <Link
                  href={`/students/${student.id}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  View
                </Link>

                <Link
                  href={`/students/edit/${student.id}`}
                  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>

                <button
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