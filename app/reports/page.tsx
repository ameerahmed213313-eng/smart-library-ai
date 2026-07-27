import { books } from "@/app/data/books";
import { students } from "@/app/data/students";
import { issues } from "@/app/data/issues";

export default function ReportsPage() {
  const totalBooks = books.length;
  const totalStudents = students.length;

  const issuedBooks = issues.filter(
    (issue) => issue.status === "Issued"
  ).length;

  const returnedBooks = issues.filter(
    (issue) => issue.status === "Returned"
  ).length;

  const availableBooks = books.filter(
    (book) => book.status === "Available"
  ).length;

  const overdueBooks = 0; // Later we'll calculate this automatically

  const cards = [
    {
      title: "Total Books",
      value: totalBooks,
      color: "bg-blue-600",
      icon: "📚",
    },
    {
      title: "Total Students",
      value: totalStudents,
      color: "bg-green-600",
      icon: "👨‍🎓",
    },
    {
      title: "Issued Books",
      value: issuedBooks,
      color: "bg-red-600",
      icon: "📖",
    },
    {
      title: "Available Books",
      value: availableBooks,
      color: "bg-purple-600",
      icon: "✅",
    },
    {
      title: "Returned Books",
      value: returnedBooks,
      color: "bg-yellow-600",
      icon: "📥",
    },
    {
      title: "Overdue Books",
      value: overdueBooks,
      color: "bg-orange-600",
      icon: "⏰",
    },
  ];

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        📊 Library Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-xl p-6 shadow-lg`}
          >
            <div className="text-4xl mb-4">
              {card.icon}
            </div>

            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="text-4xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}
