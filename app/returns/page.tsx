"use client";

import MainLayout from "../components/MainLayout";

export default function ReturnsPage() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">📥 Returned Books</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            Returned books page is ready.
          </p>

          <button className="mt-6 bg-green-600 text-white px-5 py-3 rounded-lg">
            Return Book
          </button>
        </div>
      </div>
    </MainLayout>
  );
}