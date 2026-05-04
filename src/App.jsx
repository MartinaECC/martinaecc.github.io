import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import TestPage from "./pages/TestPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pdp" element={<TestPage testId="pdp" />} />
            <Route path="/bfti" element={<TestPage testId="bfti" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
