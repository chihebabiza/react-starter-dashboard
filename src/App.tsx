import { BookOpen, Home, Library, Settings, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navigation = [
  {
    title: "Dashboard",
    icon: Home,
  },
  {
    title: "Books",
    icon: BookOpen,
  },
  {
    title: "Members",
    icon: Users,
  },
  {
    title: "Library",
    icon: Library,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Available",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    status: "Borrowed",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    status: "Available",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "Borrowed",
  },
];

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="flex h-16 items-center border-b px-6">
              <BookOpen className="mr-2 h-5 w-5" />
              <span className="text-lg font-semibold">BookFlow</span>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>

            <div className="ml-auto">
              <Button variant="outline">Add Book</Button>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-muted-foreground">
                Here's what's happening in your library today.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,248</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">342</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Borrowed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">186</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,062</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Books</CardTitle>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.title}>
                        <TableCell className="font-medium">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
