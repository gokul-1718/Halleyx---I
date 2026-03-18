import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import StepsPage from "../pages/StepsPage";
import ExecutionPage from "../pages/ExecutionPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/steps" element={<StepsPage />} />
        <Route path="/execution" element={<ExecutionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
