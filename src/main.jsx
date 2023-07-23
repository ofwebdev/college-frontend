import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./provider/AuthProvider.jsx";
import "./index.css";

import Login from "./Page/Login.jsx";
import Register from "./Page/Register.jsx";
import ForgotPassword from "./Page/ForgotPassword.jsx";
import Page404 from "./Page/Page404.jsx";
import CollegeList from "./Page/College.jsx";
import CollegeDetails from "./Page/CollegeDetials.jsx";
import Admission from "./Page/Admission.jsx";
import MyCollege from "./Page/MyCollege.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/college",
    element: <CollegeList />,
  },
  {
    path: "details/:id",
    element: (
      <PrivateRoute>
        <CollegeDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "admission",
    element: <Admission />,
  },
  {
    path: "mycollege",
    element: (
      <PrivateRoute>
        <MyCollege />
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
