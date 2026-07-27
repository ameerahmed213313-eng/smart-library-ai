"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { addBook } from "../../lib/supabase";
export default function AddBookPage() {
  const [formData, setFormData] = useState({
    accession: "",
    title: "",
    author: "",
    subject: "",
    cupboard: "",
    shelf: "",
    status: "Available",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook(formData);
      toast.success("Book saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save book.");
      return;
    }

    setFormData({
      accession: "",
      title: "",
      author: "",
      subject: "",
      cupboard: "",
      shelf: "",
      status: "Available",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        ➕ Add New Book
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Accession Number"
          value={formData.accession}
          onChange={(e) =>
            setFormData({
              ...formData,
              accession: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Book Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData({
              ...formData,
              author: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Cupboard"
          value={formData.cupboard}
          onChange={(e) =>
            setFormData({
              ...formData,
              cupboard: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Shelf"
          value={formData.shelf}
          onChange={(e) =>
            setFormData({
              ...formData,
              shelf: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Book
        </button>

        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>

      </form>
    </div>
  );
}