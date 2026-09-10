import type { BookCopy } from "@/features/book-copies/types/book-copy.types";
import type { Member } from "@/features/members/types/member.types";

export type Loan = {
  id: number;
  member: Member;
  bookCopy: BookCopy;
  borrowedDate: string;
  returnedDate?: string;
  duoDate: string;
};

export type LoanCreate = {
  memberId: number;
  bookCopyId: number;
  borrowedDate: string;
  period: number;
};

export type LoanUpdate = {
  returnedDate: string;
};
