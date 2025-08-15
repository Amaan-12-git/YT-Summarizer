import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "639822532594-05t63oo7sa44cp82icp07pi37nlmvbaf.apps.googleusercontent.com";
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
