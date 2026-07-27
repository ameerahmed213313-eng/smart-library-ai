"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Book = {
  id: number;
  title: string;
  author: string;
  subject: string;
  accession: string;
  cupboard?: string | null;
  shelf?: string | null;
  status?: string | null;
};

export default function VoiceSearch() {
  const [spokenText, setSpokenText] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [listening, setListening] = useState(false);

  function startVoiceSearch() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    recognition.start();

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setSpokenText(text);
      await searchBooks(text);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  async function searchBooks(query: string) {
    const term = query.trim();
    if (!term) {
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .or(
        `title.ilike.%${term}%,author.ilike.%${term}%,subject.ilike.%${term}%,accession.ilike.%${term}%`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setResults([]);
      return;
    }

    setResults((data as Book[]) || []);
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">🎤 Voice Search</h2>

      <button
        onClick={startVoiceSearch}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        {listening ? "Listening..." : "🎤 Speak Book Name"}
      </button>

      <p className="mt-4 text-gray-600">
        You said: {spokenText || "-"}
      </p>

      <div className="mt-5 space-y-3">
        {results.map((book) => (
          <div key={book.id} className="border rounded-lg p-3 bg-gray-50">
            <p className="font-bold">📖 {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Subject: {book.subject}</p>
            <p>Accession: {book.accession}</p>
            <p>
              Location: Cupboard {book.cupboard ?? "-"} | Shelf {book.shelf ?? "-"}
            </p>
            <p>Status: {book.status ?? "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}