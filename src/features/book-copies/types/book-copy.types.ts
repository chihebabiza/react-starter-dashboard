import type { Book } from "@/features/books/types/book.types";

export type BookCopy = {
  id: number;
  copyNumber: number;
  status: BookCopyStatus;
  createdAt: string;
  book: Book;
};

export const BookCopyStatus = {
  Available: 0,
  Borrowed: 1,
  Lost: 2,
  Damaged: 3,
} as const;

export type BookCopyStatus =
  (typeof BookCopyStatus)[keyof typeof BookCopyStatus];
