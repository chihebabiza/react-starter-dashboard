import type { Author } from "@/features/authors/types/author.types";
import type { Category } from "@/features/categories/types/category.types";

export type Book = {
  id: number;
  title: string;
  isbn: string;
  publishedDate: string | null;
  createdAt: string;
  author: Author;
  category: Category;
};

export type BookCreate = {
  title: string;
  isbn: string;
  authorId: number;
  categoryId: number;
  publishedDate: string;
  quantity: number;
};

export type BookUpdate = {
  title: string;
  isbn: string;
  publishedDate: string | null;
  authorId: number;
  categoryId: number;
};
