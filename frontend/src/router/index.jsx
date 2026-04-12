import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login.jsx";
import HomePage from "../pages/Home.jsx";
import AppLayout from "./AppLayout.jsx";
// import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: <AppLayout />,         // layout ที่มี navbar
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      // {
      //   path: "/dashboard",
      //   element: <DashboardPage />
      // }
    ]
  }
]);

export default router;