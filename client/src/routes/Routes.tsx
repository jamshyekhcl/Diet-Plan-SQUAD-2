import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/Layout/MainLayout";
import MyProfile from "../pages/MyProfile";
import DietPlan from "../pages/DietPlan";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Test = lazy(() => import("../pages/Test"));
const BmiCalculator = lazy(() => import("../pages/BmiCalculator"));

const router = createBrowserRouter([
  // Public routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/page-not-found", element: <div>Page not found</div> },
  { path: "/bmi", element: <BmiCalculator /> },

  // User protected routes
  {
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />, // both can access
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <BmiCalculator /> },
          { path: "/myprofile", element: <MyProfile /> },
          { path: "/dietplan", element: <DietPlan /> },
          { path: "/test", element: <Test /> },
        ],
      },
    ],
  },

  // Admin only routes
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "test", element: <Test /> },
        ],
      },
    ],
  },

  // Catch-all
  { path: "*", element: <Navigate to='/page-not-found' replace /> },
]);

export default router;
