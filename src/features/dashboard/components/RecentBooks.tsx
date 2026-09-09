import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { books } from "@/data/books";

export function RecentBooks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Books</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {books.map((book) => (
                <TableRow key={book.title}>
                  <TableCell className="font-medium">{book.title}</TableCell>

                  <TableCell>{book.author}</TableCell>

                  <TableCell>
                    <span
                      className={
                        book.status === "Available"
                          ? "font-medium text-green-600 dark:text-green-400"
                          : "font-medium text-orange-600 dark:text-orange-400"
                      }
                    >
                      {book.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
