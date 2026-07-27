import { createClient } from "@supabase/supabase-js";
import { books as fallbackBooks, type Book } from "@/app/data/books";
import { students as fallbackStudents, type Student } from "@/app/data/students";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://vajvrkenkszredgavnqq.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_fnFhTyIMx_pO7QrDx5ffhw_E-qIzJzo";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

let localBooks = fallbackBooks.map((book) => ({ ...book }));
let localStudents = fallbackStudents.map((student) => ({ ...student }));

function clone<T>(items: T[]): T[] {
  return items.map((item) => ({ ...item }));
}

export async function getBooks(): Promise<Book[]> {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      return clone(localBooks);
    }

    localBooks = data as Book[];
    return clone(localBooks);
  } catch (error) {
    console.warn("Supabase books query failed, using sample data.", error);
    return clone(localBooks);
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase.from("students").select("*");

    if (error || !data || data.length === 0) {
      return clone(localStudents);
    }

    localStudents = data as Student[];
    return clone(localStudents);
  } catch (error) {
    console.warn("Supabase students query failed, using sample data.", error);
    return clone(localStudents);
  }
}

export async function getDashboardStats() {
  const [books, students] = await Promise.all([getBooks(), getStudents()]);

  return {
    books: books.length,
    students: students.length,
    issued: books.filter((book) => book.status === "Issued").length,
    returned: books.filter((book) => book.status === "Returned").length,
    overdue: books.filter((book) => book.status === "Overdue").length,
  };
}

export async function searchBooks(query: string): Promise<Book[]> {
  const books = await getBooks();
  const term = query.trim().toLowerCase();

  if (!term) {
    return books;
  }

  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.subject.toLowerCase().includes(term) ||
      book.accession.toLowerCase().includes(term)
    );
  });
}

export async function addBook(payload: Omit<Book, "id">) {
  const newBook = {
    id: Date.now(),
    ...payload,
  } as Book;

  localBooks = [newBook, ...localBooks];

  try {
    const { error } = await supabase.from("books").insert([payload]);

    if (error) {
      console.warn("Supabase insert failed, but the book was kept locally.", error);
    }
  } catch (error) {
    console.warn("Supabase insert failed, but the book was kept locally.", error);
  }

  return newBook;
}

export async function deleteBook(id: number) {
  localBooks = localBooks.filter((book) => book.id !== id);

  try {
    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      console.warn("Supabase delete failed, but the book was removed locally.", error);
    }
  } catch (error) {
    console.warn("Supabase delete failed, but the book was removed locally.", error);
  }
}