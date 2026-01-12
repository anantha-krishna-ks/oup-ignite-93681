import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ParentLogin from "./pages/ParentLogin";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProfileSettings from "./pages/ProfileSettings";
import ChangePassword from "./pages/ChangePassword";
import BookReaderPage from "./pages/BookReaderPage";
import SplashScreen from "./pages/SplashScreen";
import LearnerLogin from "./pages/LearnerLogin";
import LearnerDashboard from "./pages/LearnerDashboard";
import ChaptersPage from "./pages/ChaptersPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/learner-login" element={<LearnerLogin />} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/book-reader" element={<BookReaderPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
