import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ProjectContext from "./ProjectContext.jsx";

import Home from "./Pages/Home.jsx";
import RSOs from "./Pages/RSOs.jsx";
import Admins from "./Pages/Admins.jsx";
import Settings from "./Pages/Settings.jsx";
import Login from "./Pages/Auth/Login.jsx";
// import Signup from "./Pages/Signup.jsx";
// hello world

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/rsos", element: <RSOs /> },
  { path: "/admins", element: <Admins /> },
  { path: "/settings", element: <Settings /> },
  { path: "/login", element: <Login /> },
  // { path: "/signup", element: <Signup /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectContext>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ProjectContext>
);
