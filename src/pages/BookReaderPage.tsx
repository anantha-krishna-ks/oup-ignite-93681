import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookReader from "@/components/BookReader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        className={`relative z-[10000] transition-all duration-500 ease-in-out ${
          isHeaderCollapsed ? '-translate-y-full' : 'translate-y-0'
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

        {/* Toggle Button - Attached to header bottom */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
          <Button
            onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
            className="h-8 px-6 rounded-b-lg rounded-t-none shadow-lg bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
            aria-label={isHeaderCollapsed ? "Show header" : "Hide header"}
            title={isHeaderCollapsed ? "Show header" : "Hide header"}
          >
            {isHeaderCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <BookReader
          subject={subject.title}
          onClose={() => navigate(-1)}
          selectedChapter={selectedChapter}
        />
      </div>

      <Footer />
    </div>
  );
};

export default BookReaderPage;
