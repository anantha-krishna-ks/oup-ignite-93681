import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookReader from "@/components/BookReader";
import Header from "@/components/Header";

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
    <div className="h-screen overflow-hidden flex flex-col w-full">
      <Header 
        onLogout={handleLogout} 
        role={userRole || "student"}
        showClassSubjectSelector={true}
        combinedSelection={combinedSelection}
        onCombinedChange={handleCombinedChange}
        combinedOptions={combinedOptions}
      />
      <div className="flex-1 flex flex-col">
        <BookReader
          subject={subject.title}
          onClose={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default BookReaderPage;
