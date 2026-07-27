import { students, type Student } from "@/app/data/students";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const student = students.find(
    (s: Student) => s.id === Number(id)
  );

  if (!student) {
    return <h1 className="p-8">Student Not Found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        ✏️ Edit Student
      </h1>

      <form className="space-y-4">

        <input
          defaultValue={student.rollNo}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={student.name}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={student.department}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={student.semester}
          className="w-full border rounded-lg p-3"
        />

        <input
          defaultValue={student.phone}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Update Student
        </button>

      </form>
    </div>
  );
}