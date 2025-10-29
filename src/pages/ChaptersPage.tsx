import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
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
    { id: "chapter-1", title: "The Magic Garden", cover: "/english-grade1-chapter.pdf", description: "A delightful story about a magical garden", duration: "12 min", pages: 24, gradient: "from-emerald-500 to-teal-600" },
    { id: "chapter-2", title: "Happy Child", cover: "/english-grade1-chapter.pdf", description: "Learn about emotions and expressions", duration: "10 min", pages: 20, gradient: "from-amber-500 to-orange-600" },
    { id: "chapter-3", title: "Three Little Pigs", cover: "/english-grade1-chapter.pdf", description: "Classic fairy tale with important lessons", duration: "15 min", pages: 28, gradient: "from-pink-500 to-rose-600" },
    { id: "chapter-4", title: "The Tortoise and the Hare", cover: "/english-grade1-chapter.pdf", description: "A tale about patience and perseverance", duration: "13 min", pages: 22, gradient: "from-blue-500 to-indigo-600" },
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

const ChaptersPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "english";
  const chapters = chapterData[subject] || chapterData.english;
  const [isOpening, setIsOpening] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

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

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId);
    setIsOpening(true);
    
    // Wait for realistic book opening animation
    setTimeout(() => {
      navigate(`/book-reader?subject=${subject}&chapter=${chapterId}`);
    }, 1600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <Header onLogout={handleLogout} />
      
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
      
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Modern Header */}
          <div className="mb-10">
            <Button
              variant="outline"
              onClick={() => navigate('/teacher-dashboard')}
              className="mb-6 -ml-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
            
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

          {/* 3D Bookshelf */}
          <div className="relative">
            {/* Shelf rows - group books in rows of 4 */}
            {Array.from({ length: Math.ceil(chapters.length / 4) }).map((_, shelfIndex) => (
              <div key={shelfIndex} className="relative mb-16">
                {/* Shelf surface */}
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/10 rounded-sm shadow-lg" 
                  style={{ 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.1)',
                    transform: 'perspective(800px) rotateX(45deg) translateZ(-2px)'
                  }}
                />
                
                {/* Shelf front edge with wood grain effect */}
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-muted via-muted-foreground/30 to-muted rounded-b-md border-t border-border/40"
                  style={{
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
                  }}
                >
                  {/* Wood texture lines */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-1 bg-muted-foreground/40 absolute left-1/4" />
                    <div className="h-full w-0.5 bg-muted-foreground/30 absolute left-1/2" />
                    <div className="h-full w-1 bg-muted-foreground/40 absolute left-3/4" />
                  </div>
                </div>

                {/* Books grid for this shelf */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-2 relative">
                  {chapters.slice(shelfIndex * 4, (shelfIndex + 1) * 4).map((chapter, index) => {
                    const globalIndex = shelfIndex * 4 + index;
                    return (
                      <motion.div
                        key={chapter.id}
                        className="group cursor-pointer relative"
                        initial={{ opacity: 0, y: 20, rotateY: -15 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ delay: globalIndex * 0.08, duration: 0.6 }}
                        whileHover={{ 
                          y: -12, 
                          rotateY: 5,
                          transition: { duration: 0.3 } 
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                      >
                        {/* Book standing upright with spine visible */}
                        <div
                          onClick={() => handleChapterClick(chapter.id)}
                          className="relative h-[340px] w-full"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Book spine (left side) */}
                          <div 
                            className={`absolute left-0 top-0 w-12 h-full bg-gradient-to-r ${chapter.gradient} rounded-l-md overflow-hidden`}
                            style={{
                              boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.3), -2px 0 8px rgba(0,0,0,0.2)',
                              transform: 'translateZ(2px)'
                            }}
                          >
                            {/* Spine text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-white text-xs font-bold writing-mode-vertical transform rotate-180 px-1 text-center line-clamp-3">
                                {chapter.title}
                              </p>
                            </div>
                            {/* Spine highlights */}
                            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
                          </div>

                          {/* Main book cover */}
                          <div 
                            className="absolute left-10 top-0 right-0 h-full bg-card border border-border rounded-r-lg overflow-hidden shadow-xl"
                            style={{
                              boxShadow: '4px 4px 16px rgba(0,0,0,0.25), inset -2px 0 4px rgba(0,0,0,0.1)',
                              transform: 'translateZ(0)'
                            }}
                          >
                            {/* Book cover gradient header */}
                            <div className={`relative h-48 bg-gradient-to-br ${chapter.gradient} overflow-hidden`}>
                              {/* Decorative pattern */}
                              <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rotate-45" />
                              </div>
                              
                              {/* Icon */}
                              <div className="relative h-full flex items-center justify-center text-white">
                                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                  <BookOpen className="w-16 h-16" />
                                </div>
                              </div>

                              {/* Hover glow */}
                              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Book details section */}
                            <div className="p-4 space-y-3 bg-card h-[calc(100%-12rem)] flex flex-col">
                              <h3 className="font-bold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                {chapter.title}
                              </h3>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                                {chapter.description}
                              </p>

                              {/* Meta info */}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-xs">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{chapter.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>{chapter.pages}p</span>
                                </div>
                              </div>

                              {/* Read button */}
                              <Button 
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm group-hover:shadow-lg transition-all text-xs"
                                size="sm"
                              >
                                Open Book
                                <BookOpen className="w-3.5 h-3.5 ml-2 group-hover:scale-110 transition-transform" />
                              </Button>
                            </div>

                            {/* Page edges on right */}
                            <div className="absolute -right-1 top-4 bottom-4 w-2 pointer-events-none">
                              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-muted/60 border-r border-border rounded-r-sm translate-x-[4px]" />
                              <div className="absolute right-0 top-[2px] bottom-[2px] w-[2px] bg-muted/80 border-r border-border rounded-r-sm translate-x-[2px]" />
                            </div>
                          </div>

                          {/* Book shadow on shelf */}
                          <div 
                            className="absolute -bottom-2 left-2 right-2 h-2 bg-black/20 blur-md rounded-full opacity-60 group-hover:opacity-80 transition-opacity"
                            style={{ transform: 'translateZ(-10px)' }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChaptersPage;
