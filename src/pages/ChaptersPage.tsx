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
    
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(`/book-reader?subject=${subject}&chapter=${chapterId}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Header onLogout={handleLogout} />
      
      {/* Book Opening Transition Overlay */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <motion.div
              className="relative w-[600px] h-[400px] perspective-1000"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Book Cover - Left Side */}
              <motion.div
                className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-primary to-primary/70 rounded-l-2xl shadow-2xl border-r-4 border-primary-foreground/20"
                initial={{ rotateY: 0, transformOrigin: "right" }}
                animate={{ rotateY: -160, transformOrigin: "right" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="p-8 h-full flex flex-col items-center justify-center text-primary-foreground">
                  <BookOpen className="w-20 h-20 mb-4" />
                  <div className="text-xl font-bold text-center">Opening Chapter...</div>
                </div>
              </motion.div>

              {/* Book Pages - Right Side */}
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full bg-card rounded-r-2xl shadow-2xl"
                initial={{ rotateY: 0, transformOrigin: "left" }}
                animate={{ rotateY: 160, transformOrigin: "left" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="p-8 h-full bg-gradient-to-br from-muted to-background rounded-r-2xl">
                  <div className="space-y-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 bg-muted-foreground/20 rounded"
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Book Spine */}
              <div className="absolute left-1/2 top-0 w-2 h-full bg-gradient-to-b from-primary-foreground/40 to-primary-foreground/20 -translate-x-1/2 shadow-lg z-10" />
            </motion.div>
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
                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{chapter.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{chapter.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-foreground">New</span>
                      </div>
                    </div>

                    {/* Read Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm group-hover:shadow-md transition-all"
                      size="sm"
                    >
                      Start Reading
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChaptersPage;
