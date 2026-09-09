import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter book title" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isbn">ISBN</Label>
        <Input id="isbn" placeholder="Enter ISBN" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input id="author" placeholder="Enter author" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" placeholder="Enter category" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedDate">Published Date</Label>
        <Input id="publishedDate" type="date" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit">Add Book</Button>
      </div>
    </div>
  );
}
