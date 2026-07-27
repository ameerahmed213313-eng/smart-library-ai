export type Book = {
  id: number;
  accession: string;
  title: string;
  author: string;
  subject: string;
  status: string;
  cupboard: string;
  shelf: string;
};

export const books: Book[] = [
  {
    id: 1,
    accession: "18569",
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    subject: "Computer Science",
    status: "Available",
    cupboard: "C-05",
shelf: "S-03",
    
  },
  {
    id: 2,
    accession: "18570",
    title: "Database Systems",
    author: "Elmasri",
    subject: "Computer Science",
    status: "Issued",
    cupboard: "C-02",
shelf: "S-01",
  },
  {
    id: 3,
    accession: "18571",
    title: "Operating Systems",
    author: "Silberschatz",
    subject: "Computer Science",
    status: "Available",
    cupboard: "C-07",
shelf: "S-04",
  },
];