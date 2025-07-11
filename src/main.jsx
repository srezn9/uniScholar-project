import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "./pages/HomeLayout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./shared/ErrorPage.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import AllScholarships from "./pages/AllScholarships.jsx";
import PrivateRoute from "./shared/PrivateRoute.jsx";
import ScholarshipDetails from "./pages/ScholarshipDetails.jsx";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Payments/Checkout.jsx";
import { loadStripe } from "@stripe/stripe-js";
import UserDashboard from "./Dashboards/UserDashboard.jsx/UserDashboard.jsx";
import MyProfile from "./Dashboards/UserDashboard.jsx/MyProfile.jsx";
import MyApplications from "./Dashboards/UserDashboard.jsx/MyApplications.jsx";
import MyReviews from "./Dashboards/UserDashboard.jsx/MyReviews.jsx";
import EditApplication from "./Dashboards/UserDashboard.jsx/EditApplication.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allScholarship",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/scholarships/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/userDashboard",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "applications",
        element: <MyApplications />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      {
        path: "edit-application/:id",
        element: <EditApplication />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
