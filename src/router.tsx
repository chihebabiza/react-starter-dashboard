import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Books } from "@/features/books/pages/Books";
import { DashboardPage } from "./features/dashboard/pages/Dashboard";
import { Authors } from "./features/authors/pages/Authors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
    ],
  },
]);
