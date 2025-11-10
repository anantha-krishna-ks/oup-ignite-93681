import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookReader from "@/components/BookReader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, BookOpen, ClipboardList, BookMarked, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { id: "english", title: "English" },
  { id: "mathematics", title: "Mathematics" },
  { id: "science", title: "Science" },
  { id: "hindi", title: "Hindi" },
];

const classes = [
  { id: "1", name: "Class 1" },
  { id: "2", name: "Class 2" },
  { id: "3", name: "Class 3" },
  { id: "4", name: "Class 4" },
];

const combinedOptions = classes.flatMap((cls) =>
  subjects.map((subj) => ({
    id: `${cls.id}-${subj.id}`,
    classId: cls.id,
    subjectId: subj.id,
    label: `${cls.name} - ${subj.title}`,
  }))
);

const BookReaderPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectId = searchParams.get("subject");
  const userRole = localStorage.getItem("userRole") as "student" | "teacher" | null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [combinedSelection, setCombinedSelection] = useState<string>(`1-${subjectId || "english"}`);

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    navigate(-1);
    return null;
  }

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else if (menu === "dashboard") {
      if (userRole === "teacher") navigate("/teacher-dashboard");
      else if (userRole === "student") navigate("/student-dashboard");
      else navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleCombinedChange = (value: string) => {
    setCombinedSelection(value);
    const selected = combinedOptions.find((opt) => opt.id === value);
    if (selected) {
      setSearchParams({ subject: selected.subjectId });
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "learning-resources", label: "Learning Resources", icon: BookOpen },
    { id: "assessments", label: "Assessments", icon: ClipboardList },
    ...(userRole === "teacher" ? [{ id: "lesson-plans", label: "Lesson Plans", icon: BookMarked }] : []),
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header 
        onLogout={handleLogout} 
        role={userRole || "student"}
        showClassSubjectSelector={true}
        combinedSelection={combinedSelection}
        onCombinedChange={handleCombinedChange}
        combinedOptions={combinedOptions}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden fixed top-16 left-4 z-50 bg-card border border-border shadow-md"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <nav className="flex flex-col p-4 space-y-2 mt-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === "learning-resources";

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleMenuChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <Sidebar
          activeMenu="learning-resources"
          onMenuChange={handleMenuChange}
          role={userRole === "teacher" ? "teacher" : "student"}
        />
        <div className="flex-1 flex flex-col">
          <BookReader
            subject={subject.title}
            onClose={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookReaderPage;
