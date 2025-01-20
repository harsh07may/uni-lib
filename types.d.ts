interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface User {
  id: number;
  fullname: string;
  email: string;
  universityID: number;
  universityCard: number;
  status: "PENDING" | "ACTIVE" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  lastActivityDate: string | null;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: StringIterator;
  email: string;
  password: string;
  universityID: number;
  universityCard: string;
}
