export type Issue = {
  id: number;
  studentName: string;
  rollNo: string;
  bookTitle: string;
  accession: string;
  issueDate: string;
  dueDate: string;
  status: string;
};

export const issues: Issue[] = [
  {
    id: 1,
    studentName: "Ali Khan",
    rollNo: "CS-001",
    bookTitle: "Artificial Intelligence",
    accession: "18569",
    issueDate: "2026-07-20",
    dueDate: "2026-08-03",
    status: "Issued",
  },
  {
    id: 2,
    studentName: "Ahmed Raza",
    rollNo: "CS-002",
    bookTitle: "Database Systems",
    accession: "18570",
    issueDate: "2026-07-18",
    dueDate: "2026-08-01",
    status: "Returned",
  },
];