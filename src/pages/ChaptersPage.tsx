import { useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen, Clock, Star, List, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Mock chapter data with enhanced metadata
const chapterData: Record<string, { 
  id: string; 
  title: string; 
  cover: string; 
  description: string;
  duration: string;
  pages: number;
  gradient: string;
}[]> = {
  english: [
    { id: "chapter-1", title: "Fun with Words", cover: "/english-grade1-chapter.pdf", description: "Explore the joy of words and language", duration: "10 min", pages: 18, gradient: "from-indigo-500 to-purple-600" },
    { id: "chapter-2", title: "Jo Jo Laali (A jogula)", cover: "/english-grade1-chapter.pdf", description: "A delightful story about Jo Jo Laali", duration: "12 min", pages: 24, gradient: "from-emerald-500 to-teal-600" },
    { id: "chapter-3", title: "Kamala's First Day at School", cover: "/english-grade1-chapter.pdf", description: "Join Kamala on her exciting first day", duration: "10 min", pages: 20, gradient: "from-amber-500 to-orange-600" },
    { id: "chapter-4", title: "Friends", cover: "/english-grade1-chapter.pdf", description: "Learn about friendship and caring", duration: "15 min", pages: 28, gradient: "from-pink-500 to-rose-600" },
    { id: "chapter-5", title: "A Little Clock", cover: "/english-grade1-chapter.pdf", description: "Discover how to tell time", duration: "13 min", pages: 22, gradient: "from-blue-500 to-indigo-600" },
    { id: "chapter-6", title: "Let's Play Hide-and-Seek!", cover: "/english-grade1-chapter.pdf", description: "A fun game adventure", duration: "11 min", pages: 20, gradient: "from-purple-500 to-violet-600" },
    { id: "chapter-7", title: "Healthy Habits", cover: "/english-grade1-chapter.pdf", description: "Learn about staying healthy", duration: "14 min", pages: 26, gradient: "from-cyan-500 to-blue-600" },
    { id: "chapter-8", title: "Four Seasons", cover: "/english-grade1-chapter.pdf", description: "Explore the seasons of the year", duration: "12 min", pages: 24, gradient: "from-lime-500 to-green-600" },
  ],
  mathematics: [
    { id: "chapter-1", title: "Numbers 1-10", cover: "/english-grade1-chapter.pdf", description: "Introduction to counting and numbers", duration: "11 min", pages: 18, gradient: "from-purple-500 to-violet-600" },
    { id: "chapter-2", title: "Addition Basics", cover: "/english-grade1-chapter.pdf", description: "Learn to add simple numbers", duration: "14 min", pages: 26, gradient: "from-cyan-500 to-blue-600" },
    { id: "chapter-3", title: "Shapes Around Us", cover: "/english-grade1-chapter.pdf", description: "Identify and learn basic shapes", duration: "9 min", pages: 16, gradient: "from-fuchsia-500 to-pink-600" },
    { id: "chapter-4", title: "Patterns & Colors", cover: "/english-grade1-chapter.pdf", description: "Explore patterns and color recognition", duration: "12 min", pages: 20, gradient: "from-red-500 to-orange-600" },
  ],
  science: [
    { id: "chapter-1", title: "Our Body", cover: "/english-grade1-chapter.pdf", description: "Learn about different body parts", duration: "16 min", pages: 30, gradient: "from-lime-500 to-green-600" },
    { id: "chapter-2", title: "Plants & Trees", cover: "/english-grade1-chapter.pdf", description: "Discover the world of plants", duration: "13 min", pages: 24, gradient: "from-emerald-500 to-green-600" },
    { id: "chapter-3", title: "Animals Around Us", cover: "/english-grade1-chapter.pdf", description: "Meet different types of animals", duration: "15 min", pages: 28, gradient: "from-sky-500 to-blue-600" },
    { id: "chapter-4", title: "Water & Air", cover: "/english-grade1-chapter.pdf", description: "Understanding our environment", duration: "14 min", pages: 26, gradient: "from-teal-500 to-cyan-600" },
  ],
  hindi: [
    { id: "chapter-1", title: "वर्णमाला", cover: "/english-grade1-chapter.pdf", description: "Hindi alphabets and sounds", duration: "10 min", pages: 20, gradient: "from-orange-500 to-red-600" },
    { id: "chapter-2", title: "मेरा परिवार", cover: "/english-grade1-chapter.pdf", description: "Learn about family members", duration: "12 min", pages: 22, gradient: "from-rose-500 to-pink-600" },
    { id: "chapter-3", title: "फल और सब्जियाँ", cover: "/english-grade1-chapter.pdf", description: "Fruits and vegetables vocabulary", duration: "11 min", pages: 18, gradient: "from-yellow-500 to-orange-600" },
    { id: "chapter-4", title: "रंग और आकार", cover: "/english-grade1-chapter.pdf", description: "Colors and shapes in Hindi", duration: "13 min", pages: 24, gradient: "from-violet-500 to-purple-600" },
  ],
};

const classes = [
  { id: "1", name: "Class 1" },
  { id: "2", name: "Class 2" },
  { id: "3", name: "Class 3" },
  { id: "4", name: "Class 4" },
];

const subjects = [
  { id: "english", name: "English" },
  { id: "mathematics", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "hindi", name: "Hindi" },
];

const ChaptersPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "english";
  const chapters = chapterData[subject] || chapterData.english;
  const [isOpening, setIsOpening] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("learning-resources");
  const [selectedClass, setSelectedClass] = useState<string>("1");
  const [selectedSubject, setSelectedSubject] = useState<string>(subject);

  const subjectTitles: Record<string, string> = {
    english: "English",
    mathematics: "Mathematics",
    science: "Science",
    hindi: "Hindi",
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "dashboard") {
      navigate("/teacher-dashboard");
    }
  };

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    setSearchParams({ subject: newSubject });
  };

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId);
    setIsOpening(true);
    
    // Wait for realistic book opening animation
    setTimeout(() => {
      navigate(`/book-reader?subject=${subject}&chapter=${chapterId}`);
    }, 1600);
  };

  return (
    <div className="dashboard-layout">
      <Header onLogout={handleLogout} />
      <div className="dashboard-container">
        <Sidebar
          activeMenu={activeMenu}
          onMenuChange={handleMenuChange}
          role="teacher"
        />
      
      {/* Realistic Book Opening Transition */}
      <AnimatePresence>
        {isOpening && selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ perspective: "2000px" }}>
              {/* Left Page (Cover) */}
              <motion.div
                className="absolute w-[45vw] h-[70vh] origin-right"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ 
                  duration: 1.4, 
                  ease: [0.45, 0, 0.15, 1],
                  delay: 0.1
                }}
              >
                {/* Front of left page (book cover) */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-l-lg shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${chapters.find(c => c.id === selectedChapter)?.gradient} p-12 flex flex-col items-center justify-center text-white`}>
                    <BookOpen className="w-32 h-32 mb-6 drop-shadow-lg" />
                    <h2 className="text-4xl font-bold text-center mb-3 drop-shadow-md">
                      {chapters.find(c => c.id === selectedChapter)?.title}
                    </h2>
                    <p className="text-xl opacity-90 drop-shadow-sm">
                      {subjectTitles[subject]}
                    </p>
                  </div>
                  {/* Book spine shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
                </div>
                
                {/* Back of left page */}
                <div 
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-card to-muted rounded-l-lg shadow-inner p-12"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="space-y-4">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.3, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.05 }}
                        className="h-4 bg-foreground/10 rounded"
                        style={{ width: `${Math.random() * 25 + 75}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Page (Content) */}
              <motion.div
                className="absolute w-[45vw] h-[70vh] origin-left"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 0 }}
              >
                {/* Front of right page */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50 rounded-r-lg shadow-2xl p-12"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 0.3, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.04 }}
                        className="h-4 bg-foreground/10 rounded"
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                      />
                    ))}
                  </motion.div>
                  {/* Page shadow on left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-black/10" />
                </div>
              </motion.div>

              {/* Center spine/binding */}
              <div className="absolute w-3 h-[70vh] bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/50 to-muted-foreground/30 shadow-lg" 
                style={{ 
                  left: "50%", 
                  transform: "translateX(-50%)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.2)"
                }} 
              />

              {/* Ambient shadow under book */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute w-[92vw] h-8 bg-black/40 blur-3xl"
                style={{ top: "calc(50% + 36vh)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
        <main className="dashboard-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Modern Header */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                {/* Class Dropdown */}
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[160px] bg-white dark:bg-white dark:text-black">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <SelectValue placeholder="Select class" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Subject Dropdown */}
                <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                  <SelectTrigger className="w-[180px] bg-white dark:bg-white dark:text-black">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <SelectValue placeholder="Select subject" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subj) => (
                      <SelectItem key={subj.id} value={subj.id}>
                        {subj.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                    {subjectTitles[subject]}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base mt-1">
                    {chapters.length} chapters available
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
                Choose a chapter below to begin your learning journey
              </p>
            </div>
          </div>

          {/* Premium Chapters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                className="group cursor-pointer h-full relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  onClick={() => handleChapterClick(chapter.id)}
                  className="relative h-full rounded-2xl overflow-visible bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
                >
                  {/* 3D Book Pages Stack on Right Edge */}
                  <div className="absolute -right-1 top-4 bottom-4 w-3 pointer-events-none">
                    {/* Page layers creating depth effect */}
                    <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-muted border-r border-t border-b border-border rounded-r-sm translate-x-[6px] opacity-70" />
                    <div className="absolute right-0 top-[2px] bottom-[2px] w-[3px] bg-muted border-r border-t border-b border-border rounded-r-sm translate-x-[4px] opacity-85" />
                    <div className="absolute right-0 top-[4px] bottom-[4px] w-[3px] bg-card border-r border-t border-b border-border/80 rounded-r-sm translate-x-[2px]" />
                  </div>

                  {/* Book Cover with Gradient */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0 rounded-t-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-90`}>
                      {/* Decorative Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white rounded-full" />
                        <div className="absolute bottom-2 left-2 w-10 h-10 border-2 border-white rotate-45" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full flex items-center justify-center text-white">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                          <BookOpen className="w-10 h-10 md:w-12 md:h-12" />
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* 3D Book Spine Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                    
                    {/* Corner Fold Effect */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white/30" />
                  </div>

                  {/* Book Details Card */}
                  <div className="p-4 space-y-2 bg-card flex-1 flex flex-col rounded-b-2xl">
                    {/* Chapter Title */}
                    <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                    
                    {/* Pages Count */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{chapter.pages} pages</span>
                    </div>

                    {/* Read Button */}
                    <Button 
                      className="w-full mt-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm group-hover:shadow-md transition-all"
                      size="sm"
                    >
                      Start Reading
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default ChaptersPage;
