import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import NotFound from "./components/notfound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found</div>,
  },
  {
    path: "/signup",
    element: (
      <GoogleOAuthProvider clientId={clientId}>
        <Signup />
      </GoogleOAuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <GoogleOAuthProvider clientId={clientId}>
        <Login />
      </GoogleOAuthProvider>
    ),
  },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
