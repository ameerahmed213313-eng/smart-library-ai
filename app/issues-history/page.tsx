"use client";

import { issues, type Issue } from "@/app/data/issues";

export default function IssueHistoryPage() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        📜 Issue History
      </h1>

      <table className="w-full border-collapse border">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Student</th>
            <th className="border p-3">Roll No</th>
            <th className="border p-3">Book</th>
            <th className="border p-3">Accession</th>
            <th className="border p-3">Issue Date</th>
            <th className="border p-3">Due Date</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue: Issue) => (
            <tr key={issue.id}>
              <td className="border p-3">{issue.studentName}</td>
              <td className="border p-3">{issue.rollNo}</td>
              <td className="border p-3">{issue.bookTitle}</td>
              <td className="border p-3">{issue.accession}</td>
              <td className="border p-3">{issue.issueDate}</td>
              <td className="border p-3">{issue.dueDate}</td>

              <td className="border p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    issue.status === "Issued"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {issue.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}