import { useEffect, useState } from "react";
import {
  BookOpen,
  Home,
  Library,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { title: "Dashboard", icon: Home },
  { title: "Books", icon: BookOpen },
  { title: "Members", icon: Users },
  { title: "Library", icon: Library },
  { title: "Settings", icon: Settings },
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
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

        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 items-center border-b px-4 md:px-6">
            <SidebarTrigger />

            <div className="ml-4">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Add book */}
              <Button className="hidden sm:flex">Add Book</Button>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode((value) => !value)}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Account menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                  >
                    <Avatar>
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">Chiheb</span>
                      <span className="text-xs text-muted-foreground">
                        chiheb@example.com
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="flex-1 space-y-6 p-4 md:p-6">
            {/* Welcome */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="text-muted-foreground">
                Here's what's happening in your library today.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Total Books
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>

                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Members</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">342</div>

                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Borrowed
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">186</div>

                  <p className="text-xs text-muted-foreground">
                    14 due this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Available
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">1,062</div>

                  <p className="text-xs text-muted-foreground">
                    85% of total collection
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent books */}
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
                          <TableCell className="font-medium">
                            {book.title}
                          </TableCell>

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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
