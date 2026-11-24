import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { logoBlue } from "./lib/assets";

/* favicon from the bundled logo (the build is a single self-contained file) */
const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/webp";
icon.href = logoBlue();
document.head.appendChild(icon);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
