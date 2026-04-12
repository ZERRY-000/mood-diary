import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login.jsx";
import HomePage from "../pages/Home.jsx";
// import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <HomePage />
  },
  // {
  //   path: "/dashboard",
  //   element: <DashboardPage />
  // }
]);

export default router;