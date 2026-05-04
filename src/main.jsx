import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

try {
    const redirectPath = sessionStorage.getItem("spa-redirect-path");

    if (redirectPath && redirectPath.startsWith("/") && redirectPath !== window.location.pathname) {
        sessionStorage.removeItem("spa-redirect-path");
        window.history.replaceState(null, "", redirectPath);
    }
} catch (error) {}

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
