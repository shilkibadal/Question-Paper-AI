import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Textbooks
import Textbooks from "./pages/textbooks/Textbooks";
import UploadTextbook from "./pages/textbooks/UploadTextbook";
import TextbookDetails from "./pages/textbooks/TextbookDetails";

// Question papers
import GeneratePaper from "./pages/papers/GeneratePaper";
import QuestionPapers from "./pages/papers/QuestionPapers";
import ViewPaper from "./pages/papers/ViewPaper";

// Settings
import Settings from "./pages/Settings";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* =========================
            DASHBOARD PAGES
        ========================= */}

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Textbooks */}
          <Route
            path="/textbooks"
            element={<Textbooks />}
          />

          <Route
            path="/textbooks/upload"
            element={<UploadTextbook />}
          />

          <Route
            path="/textbooks/:id"
            element={<TextbookDetails />}
          />

          {/* Question Papers */}
          <Route
            path="/generate-paper"
            element={<GeneratePaper />}
          />

          <Route
            path="/question-papers"
            element={<QuestionPapers />}
          />

          <Route
            path="/question-papers/:id"
            element={<ViewPaper />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;