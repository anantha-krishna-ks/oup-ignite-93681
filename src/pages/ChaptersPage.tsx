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

          {/* Elegant 3D Bookshelf */}
          <div className="space-y-8">
            {Array.from({ length: Math.ceil(chapters.length / 4) }).map((_, shelfIndex) => {
              const shelfBooks = chapters.slice(shelfIndex * 4, (shelfIndex + 1) * 4);
              return (
                <motion.div
                  key={shelfIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shelfIndex * 0.15 }}
                  className="relative"
                >
                  {/* Shelf Container */}
                  <div className="relative pb-6">
                    {/* Books Row */}
                    <div className="flex gap-2 md:gap-3 px-4 pb-4 relative z-10">
                      {shelfBooks.map((chapter, bookIndex) => (
                        <motion.div
                          key={chapter.id}
                          className="group cursor-pointer relative flex-1"
                          initial={{ opacity: 0, rotateY: -20 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          transition={{ delay: shelfIndex * 0.15 + bookIndex * 0.08 }}
                          whileHover={{ 
                            y: -16,
                            rotateY: 8,
                            scale: 1.02,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }}
                          whileTap={{ scale: 0.98 }}
                          style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                          onClick={() => handleChapterClick(chapter.id)}
                        >
                          {/* Book Structure */}
                          <div className="relative h-64 md:h-72" style={{ transformStyle: "preserve-3d" }}>
                            {/* Book Spine (Left Edge) */}
                            <div 
                              className={`absolute left-0 top-0 w-11 md:w-14 h-full bg-gradient-to-r ${chapter.gradient} rounded-l-lg shadow-xl flex items-center justify-center overflow-hidden`}
                              style={{ 
                                transform: "translateZ(12px)",
                                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4), inset 2px 0 3px rgba(255,255,255,0.1), 3px 0 12px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)"
                              }}
                            >
                              {/* Spine Texture Pattern */}
                              <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
                              }} />
                              
                              {/* Spine Text */}
                              <div 
                                className="text-white font-bold text-xs md:text-sm px-2 text-center relative z-10"
                                style={{ 
                                  writingMode: "vertical-rl",
                                  textOrientation: "mixed",
                                  textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)"
                                }}
                              >
                                {chapter.title}
                              </div>
                              
                              {/* Spine Light Reflection */}
                              <div className="absolute left-1 top-0 bottom-0 w-2 bg-gradient-to-r from-white/30 to-transparent" />
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-black/20" />
                              
                              {/* Spine Top & Bottom Caps */}
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-black/30 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Book Cover (Main Face) */}
                            <div 
                              className="absolute left-9 md:left-12 top-0 right-0 h-full bg-card border-2 border-border rounded-r-lg shadow-2xl overflow-hidden"
                              style={{ 
                                transform: "translateZ(6px)",
                                boxShadow: "6px 6px 18px rgba(0,0,0,0.25), -3px 0 12px rgba(0,0,0,0.15), inset 0 0 60px rgba(0,0,0,0.05)"
                              }}
                            >
                              {/* Cover Paper Texture */}
                              <div className="absolute inset-0 opacity-[0.03]" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                                backgroundSize: "100px 100px"
                              }} />
                              
                              {/* Cover Gradient Accent */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-15`} />
                              <div className={`absolute inset-0 bg-gradient-to-tr ${chapter.gradient} opacity-10`} />
                              
                              {/* Cover Content */}
                              <div className="relative h-full p-4 flex flex-col">
                                {/* Book Icon with Embossed Effect */}
                                <div className="flex-1 flex items-center justify-center">
                                  <div 
                                    className={`p-5 bg-gradient-to-br ${chapter.gradient} rounded-2xl relative`}
                                    style={{
                                      boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)"
                                    }}
                                  >
                                    <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                                  </div>
                                </div>
                                
                                {/* Title & Info */}
                                <div className="space-y-3 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm p-3 rounded-lg -mx-1 -mb-1">
                                  <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors drop-shadow-sm">
                                    {chapter.title}
                                  </h3>
                                  
                                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2">
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span className="font-medium">{chapter.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <BookOpen className="w-3.5 h-3.5" />
                                      <span className="font-medium">{chapter.pages}p</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Realistic Page Edges (Right Side) */}
                              <div className="absolute right-0 top-3 bottom-3 w-3 pointer-events-none">
                                {[...Array(8)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="absolute right-0 bg-gradient-to-r from-muted/90 to-muted/70 border-r border-border/50" 
                                    style={{
                                      top: `${i * 0.5}px`,
                                      bottom: `${i * 0.5}px`,
                                      width: "2px",
                                      transform: `translateX(${i * 0.5}px)`,
                                      boxShadow: "1px 0 1px rgba(0,0,0,0.1)"
                                    }}
                                  />
                                ))}
                              </div>

                              {/* Cover Shine Effect */}
                              <div 
                                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ transform: "translateZ(1px)" }}
                              />
                              
                              {/* Edge Wear Effect */}
                              <div className="absolute inset-0 border-2 border-white/5 rounded-r-lg pointer-events-none" />
                            </div>

                            {/* Book Shadow on Shelf (More Realistic) */}
                            <div 
                              className="absolute left-4 -bottom-2 right-4 h-3 bg-gradient-radial from-black/30 via-black/15 to-transparent blur-md rounded-full"
                              style={{ transform: "translateZ(0)" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Realistic Wooden Shelf */}
                    <div className="relative px-2">
                      {/* Shelf Back Support */}
                      <div 
                        className="absolute -top-8 left-0 right-0 h-12 bg-gradient-to-b from-amber-800/40 via-amber-900/30 to-transparent dark:from-amber-950/40 dark:via-black/30"
                        style={{
                          boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.2)"
                        }}
                      />
                      
                      {/* Shelf Surface (Top) */}
                      <div 
                        className="h-4 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 dark:from-amber-800 dark:via-amber-900 dark:to-amber-950 rounded-t-sm relative overflow-hidden"
                        style={{
                          boxShadow: "0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.2)"
                        }}
                      >
                        {/* Wood Grain Texture */}
                        <div className="absolute inset-0 opacity-30" style={{
                          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139, 69, 19, 0.2) 3px, rgba(139, 69, 19, 0.2) 6px)`,
                        }} />
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(101, 67, 33, 0.3) 40px, rgba(101, 67, 33, 0.3) 80px)`,
                        }} />
                        
                        {/* Natural Light Variation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                        
                        {/* Top Edge Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                      </div>
                      
                      {/* Shelf Front Edge */}
                      <div 
                        className="h-6 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 dark:from-amber-900 dark:via-amber-950 dark:to-black rounded-b-sm relative overflow-hidden"
                        style={{
                          boxShadow: "0 6px 16px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)"
                        }}
                      >
                        {/* Wood Grain on Front */}
                        <div className="absolute inset-0 opacity-25" style={{
                          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.3) 2px, rgba(139, 69, 19, 0.3) 4px)`,
                        }} />
                        
                        {/* Wood Knots */}
                        <div className="absolute top-1/2 left-1/4 w-4 h-2 bg-amber-900/40 dark:bg-black/40 rounded-full blur-[1px]" />
                        <div className="absolute top-1/3 right-1/3 w-3 h-2 bg-amber-900/30 dark:bg-black/30 rounded-full blur-[1px]" />
                        
                        {/* Bottom Shadow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-b from-transparent to-black/30" />
                        
                        {/* Subtle Shine */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
                      </div>
                      
                      {/* Shelf Under-Shadow */}
                      <div 
                        className="absolute top-full left-4 right-4 h-8 bg-gradient-to-b from-black/20 to-transparent blur-sm pointer-events-none"
                        style={{ transform: "translateY(0)" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChaptersPage;
