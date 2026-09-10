import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Books } from "@/features/books/pages/Books";
import { Dashboard } from "./features/dashboard/pages/Dashboard";
import { Authors } from "./features/authors/pages/Authors";
import { Categories } from "./features/categories/pages/Categories";
import { Members } from "./features/members/pages/Members";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "members",
        element: <Members />,
      },
    ],
  },
]);
