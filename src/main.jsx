// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Dashboard />
  // {/* </StrictMode>, */}
);