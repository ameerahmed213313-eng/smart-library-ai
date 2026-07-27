export type Student = {
  id: number;
  rollNo: string;
  name: string;
  department: string;
  semester: string;
  phone: string;
};

export const students: Student[] = [
  {
    id: 1,
    rollNo: "CS-001",
    name: "Ali Khan",
    department: "Computer Science",
    semester: "6th",
    phone: "03001234567",
  },
  {
    id: 2,
    rollNo: "CS-002",
    name: "Ahmed Raza",
    department: "Computer Science",
    semester: "4th",
    phone: "03111234567",
  },
  {
    id: 3,
    rollNo: "MTH-001",
    name: "Fatima Noor",
    department: "Mathematics",
    semester: "8th",
    phone: "03211234567",
  },
];
