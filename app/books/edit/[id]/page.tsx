import { books } from "@/app/data/books";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBookPage({ params }: Props) {
  const { id } = await params;

  const book = books.find((b) => b.id === Number(id));

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
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        ✏️ Edit Book
      </h1>

      <form className="space-y-4">

        <input
          defaultValue={book.accession}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={book.title}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={book.author}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={book.subject}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={book.cupboard}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={book.shelf}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Update Book
        </button>

      </form>
    </div>
  );
}