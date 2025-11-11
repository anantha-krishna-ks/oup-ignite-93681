import { ReactNode } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  role: "student" | "teacher" | "parent";
}

const Layout = ({ children, role }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active menu based on current route
  const getActiveMenu = () => {
    if (location.pathname.includes("profile")) return "profile";
    return "dashboard";
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else {
      // Navigate back to respective dashboard
      if (role === "teacher") navigate("/teacher-dashboard");
      else if (role === "student") navigate("/student-dashboard");
      else if (role === "parent") navigate("/parent-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <Header onLogout={handleLogout} />
      <div className="dashboard-container">
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
