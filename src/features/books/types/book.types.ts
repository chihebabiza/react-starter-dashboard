export type Book = {
  id: number;
  title: string;
  isbn: string;
  publishedDate: string | null;
  createdAt: string;
  authorName: string;
  categoryName: string;
};

export type BookCreate = {
  title: string;
  isbn: string;
  authorId: number;
  categoryId: number;
  publishedDate: string;
};

export type BookUpdate = {
  title: string;
  isbn: string;
  publishedDate: string | null;
  authorId: number;
  categoryId: number;
};
