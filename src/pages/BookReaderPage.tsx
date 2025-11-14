import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookReader from "@/components/BookReader";
import Header from "@/components/Header";
import { chapters } from "@/data/chapters";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

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
  const [combinedSelection, setCombinedSelection] = useState<string>(`1-${subjectId || "english"}`);
  const [selectedChapter, setSelectedChapter] = useState<string>("1");
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    navigate(-1);
    return null;
  }

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

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isHeaderCollapsed ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <Header 
          onLogout={handleLogout} 
          role={userRole || "student"}
          showClassSubjectSelector={true}
          combinedSelection={combinedSelection}
          onCombinedChange={handleCombinedChange}
          combinedOptions={combinedOptions}
          showChapterSelector={true}
          chapterSelection={selectedChapter}
          onChapterChange={setSelectedChapter}
          chapterOptions={chapters}
        />
      </div>

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 h-10 w-10 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 p-0 ${
          isHeaderCollapsed ? 'translate-y-0' : '-translate-y-20 opacity-0 pointer-events-none'
        }`}
        title={isHeaderCollapsed ? "Show header" : "Hide header"}
      >
        {isHeaderCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </Button>

      <div className="flex-1 flex flex-col">
        <BookReader
          subject={subject.title}
          onClose={() => navigate(-1)}
          selectedChapter={selectedChapter}
        />
      </div>
    </div>
  );
};

export default BookReaderPage;
