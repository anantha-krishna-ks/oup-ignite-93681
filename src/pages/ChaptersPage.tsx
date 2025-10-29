import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

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
    navigate(`/book-reader?subject=${subject}&chapter=${chapterId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} />
      
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Modern Header */}
          <div className="mb-10">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 -ml-2 hover:bg-muted/50"
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
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
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
              <div
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                  {/* Book Cover with Gradient */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-90`}>
                      {/* Decorative Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white rounded-full" />
                        <div className="absolute bottom-8 left-6 w-16 h-16 border-4 border-white rotate-45" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                        <div className="mb-4 p-4 bg-white/20 backdrop-blur-sm rounded-full">
                          <BookOpen className="w-10 h-10 md:w-12 md:h-12" />
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-center leading-tight mb-2 drop-shadow-lg">
                          {chapter.title}
                        </h3>
                        <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur-sm">
                          Chapter {index + 1}
                        </Badge>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* 3D Book Spine Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                    
                    {/* Corner Fold Effect */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-white/30" />
                  </div>

                  {/* Book Details Card */}
                  <div className="p-5 space-y-3 bg-card">
                    <div>
                      <h4 className="font-bold text-base md:text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                        {chapter.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
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
                      className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm group-hover:shadow-md transition-all"
                      size="sm"
                    >
                      Start Reading
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
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
