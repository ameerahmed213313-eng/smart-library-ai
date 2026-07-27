import { books, type Book } from "../../data/books";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookDetails({ params }: Props) {
  const { id } = await params;

  const book = books.find((b: Book) => b.id === Number(id));

  if (!book) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600">
          Book Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        📖 Book Details
      </h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p><strong>Book ID:</strong> {book.id}</p>
        <p><strong>Accession:</strong> {book.accession}</p>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Subject:</strong> {book.subject}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              book.status === "Available"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {book.status}
          </span>
        </p>

        <p><strong>Cupboard:</strong> {book.cupboard}</p>
        <p><strong>Shelf:</strong> {book.shelf}</p>
      </div>
    </div>
  );
}