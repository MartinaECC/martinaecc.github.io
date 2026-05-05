import { Navigate, Route, Routes } from "react-router-dom";
import AppPrototypePage from "./pages/AppPrototypePage.jsx";
import AssessmentsAppPage from "./pages/AssessmentsAppPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import DailyFortunePage from "./pages/DailyFortunePage.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AppPrototypePage activeTab="home" />} />
             <Route path="/reports" element={<AppPrototypePage activeTab="reports" />} />
             <Route path="/benefits" element={<AppPrototypePage activeTab="benefits" />} />
             <Route path="/me" element={<AppPrototypePage activeTab="me" />} />
             <Route path="/assessments" element={<AssessmentsAppPage />} />
             <Route path="/pdp" element={<TestPage testId="pdp" />} />
             <Route path="/bfti" element={<TestPage testId="bfti" />} />
             <Route path="/mbti" element={<TestPage testId="mbti" />} />
             <Route path="/wuxing" element={<TestPage testId="wuxing" />} />
             <Route path="/daily-fortune" element={<DailyFortunePage />} />
             <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
