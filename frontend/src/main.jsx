import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ProjectContext from "./ProjectContext.jsx";

import Home from "./Pages/Home.jsx";
import RSOs from "./Pages/RSOs.jsx";
import Admins from "./Pages/Admins.jsx";
import Settings from "./Pages/Settings.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/rsos", element: <RSOs /> },
  { path: "/admins", element: <Admins /> },
  { path: "settings", element: <Settings /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectContext>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ProjectContext>
);
