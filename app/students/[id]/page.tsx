import { students, type Student } from "@/app/data/students";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentDetailsPage({ params }: Props) {
  const { id } = await params;

  const student = students.find(
    (s: Student) => s.id === Number(id)
  );

  if (!student) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600">
          Student Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        👨‍🎓 Student Details
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

        <p>
          <strong>ID:</strong> {student.id}
        </p>

        <p>
          <strong>Roll Number:</strong> {student.rollNo}
        </p>

        <p>
          <strong>Name:</strong> {student.name}
        </p>

        <p>
          <strong>Department:</strong> {student.department}
        </p>

        <p>
          <strong>Semester:</strong> {student.semester}
        </p>

        <p>
          <strong>Phone:</strong> {student.phone}
        </p>

      </div>

    </div>
  );
}