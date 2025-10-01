import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { ThemeProvider } from "./themeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
   <ThemeProvider>
    <App />
  </ThemeProvider>
);
