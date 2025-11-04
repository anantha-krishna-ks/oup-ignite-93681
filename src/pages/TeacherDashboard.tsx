import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Download, FileText, Activity, Calculator, Eye, Video, FileIcon, Layers, Menu, LayoutDashboard, BookOpen, ClipboardList, BookMarked, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import scienceImg from "@/assets/science-subject.png";
import mathImg from "@/assets/mathematics-subject.png";
import englishImg from "@/assets/english-subject.png";
import hindiImg from "@/assets/hindi-subject.png";
import comingSoonImage from "@/assets/coming-soon.png";

const classes = [
  { id: "class-1", name: "Class 1" },
  { id: "class-2", name: "Class 2" },
  { id: "class-3", name: "Class 3" },
  { id: "class-4", name: "Class 4" },
];

const subjects = [
  { id: "english", title: "English", image: englishImg, color: "bg-green-500" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "bg-purple-500" },
  { id: "science", title: "Science", image: scienceImg, color: "bg-blue-500" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "bg-orange-500" },
];

const assessmentClasses = [
  { id: "class-1", name: "Class 1" },
  { id: "class-2", name: "Class 2" },
  { id: "class-3", name: "Class 3" },
  { id: "class-4", name: "Class 4" },
];

const activities = [
  { id: 1, name: "Activity on Prepositions" },
  { id: 2, name: "Activity on Verbs" },
  { id: 3, name: "Activity on Adjectives" },
  { id: 4, name: "Activity on Nouns" },
  { id: 5, name: "Activity on Sentence Formation" },
];

const chapters = [
  { id: "chapter-1", name: "Chapter 1" },
  { id: "chapter-2", name: "Chapter 2" },
  { id: "chapter-3", name: "Chapter 3" },
  { id: "chapter-4", name: "Chapter 4" },
];

const learningResources = [
  { id: 1, name: "Introduction to Alphabets", type: "video", icon: Video },
  { id: 2, name: "Grammar Basics PDF", type: "pdf", icon: FileIcon },
  { id: 3, name: "Phonics Interactive Exercise", type: "interactive", icon: Layers },
  { id: 4, name: "Reading Comprehension Video", type: "video", icon: Video },
  { id: 5, name: "Writing Practice Sheet", type: "pdf", icon: FileIcon },
  { id: 6, name: "Vocabulary Building Game", type: "interactive", icon: Layers },
  { id: 7, name: "Story Reading Session", type: "video", icon: Video },
  { id: 8, name: "Grammar Worksheets", type: "pdf", icon: FileIcon },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("class-1");
  const [assessmentClass, setAssessmentClass] = useState("class-1");
  const [assessmentSubject, setAssessmentSubject] = useState("english");
  const [assessmentChapter, setAssessmentChapter] = useState("chapter-1");
  const [resourceClass, setResourceClass] = useState("class-1");
  const [resourceSubject, setResourceSubject] = useState("english");
  const [resourceChapter, setResourceChapter] = useState("chapter-1");
  const [lessonPlanClass, setLessonPlanClass] = useState("class-1");
  const [lessonPlanSubject, setLessonPlanSubject] = useState("english");
  const [lessonPlanChapter, setLessonPlanChapter] = useState("chapter-1");
  const [lessonPlanDialog, setLessonPlanDialog] = useState(false);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState<{ subject: string; number: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourceSearch, setResourceSearch] = useState("");
  const [assessmentSearch, setAssessmentSearch] = useState("");
  const [lessonPlanSearch, setLessonPlanSearch] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "teacher") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else {
      setActiveMenu(menu);
    }
  };

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/chapters?subject=${subjectId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} />

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
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "learning-resources", label: "Learning Resources", icon: BookOpen },
                { id: "assessments", label: "Assessments", icon: ClipboardList },
                { id: "lesson-plans", label: "Lesson Plans", icon: BookMarked },
                { id: "reports", label: "Reports", icon: FileText },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
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
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} role="teacher" />

        <main className="flex-1 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-[1.6rem] font-semibold text-foreground mb-2">
                  Welcome Back, Teacher
                </h2>
                <p className="text-muted-foreground">
                  Select a class and subject to begin your teaching session
                </p>
              </div>

              <div className="mb-8 max-w-sm">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Subjects for {classes.find((c) => c.id === selectedClass)?.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      title={subject.title}
                      image={subject.image}
                      color={subject.color}
                      onClick={() => handleSubjectClick(subject.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "learning-resources" && (
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
                Learning Resources
              </h2>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={resourceClass} onValueChange={setResourceClass}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={resourceSubject} onValueChange={setResourceSubject}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Chapter
                  </label>
                  <Select value={resourceChapter} onValueChange={setResourceChapter}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search
                  </label>
                  <div className="search-container">
                    <Search className="search-icon w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search resources..."
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              {/* Count Widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Videos</CardTitle>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningResources.filter(r => r.type === "video").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Video resources</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">PDFs</CardTitle>
                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningResources.filter(r => r.type === "pdf").length}
                    </div>
                    <p className="text-xs text-muted-foreground">PDF documents</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Interactivities</CardTitle>
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningResources.filter(r => r.type === "interactive").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Interactive exercises</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{learningResources.length}</div>
                    <p className="text-xs text-muted-foreground">Total resources</p>
                  </CardContent>
                </Card>
              </div>

              {/* Resources List */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Resources</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-3">
                     {learningResources
                       .filter((resource) =>
                         resource.name.toLowerCase().includes(resourceSearch.toLowerCase())
                       )
                       .map((resource) => {
                       const Icon = resource.icon;
                       return (
                         <div
                           key={resource.id}
                           className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                         >
                           <div className="flex items-center gap-3">
                             <Icon className="h-5 w-5 text-primary" />
                             <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                               {resource.name}
                             </span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="shadow-sm hover:shadow transition-shadow w-full sm:w-auto"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeMenu === "reports" && (
            <div className="p-8 flex items-center justify-center min-h-[80vh]">
              <div className="max-w-2xl text-center">
                <img 
                  src={comingSoonImage} 
                  alt="Coming Soon - Reports feature launching soon" 
                  className="w-full h-auto mb-8 animate-fade-in"
                />
                <h2 className="text-3xl font-bold text-foreground mb-4">Reports Coming Soon</h2>
                <p className="text-muted-foreground text-lg">
                  We're working on powerful analytics and reporting features. Stay tuned for student performance insights and class analytics!
                </p>
              </div>
            </div>
          )}

          {activeMenu === "assessments" && (
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
                Assessments
              </h2>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={assessmentClass} onValueChange={setAssessmentClass}>
                    <SelectTrigger className="bg-white dark:bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      {assessmentClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={assessmentSubject} onValueChange={setAssessmentSubject}>
                    <SelectTrigger className="bg-white dark:bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Chapter
                  </label>
                  <Select value={assessmentChapter} onValueChange={setAssessmentChapter}>
                    <SelectTrigger className="bg-white dark:bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search
                  </label>
                  <div className="search-container">
                    <Search className="search-icon w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search assessments..."
                      value={assessmentSearch}
                      onChange={(e) => setAssessmentSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              {/* Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Work Sheets</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Available resources</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Activities</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activities.length}</div>
                    <p className="text-xs text-muted-foreground">Interactive exercises</p>
                  </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{12 + activities.length}</div>
                    <p className="text-xs text-muted-foreground">Total resources</p>
                  </CardContent>
                </Card>
              </div>

              {/* Activities List */}
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Activities</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-3">
                     {activities
                       .filter((activity) =>
                         activity.name.toLowerCase().includes(assessmentSearch.toLowerCase())
                       )
                       .map((activity) => (
                       <div
                        key={activity.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">{activity.name}</span>
                        <Button size="sm" variant="outline" className="shadow-sm hover:shadow transition-shadow w-full sm:w-auto">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeMenu === "lesson-plans" && (
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
                Lesson Plans
              </h2>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={lessonPlanClass} onValueChange={setLessonPlanClass}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={lessonPlanSubject} onValueChange={setLessonPlanSubject}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Chapter
                  </label>
                  <Select value={lessonPlanChapter} onValueChange={setLessonPlanChapter}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search
                  </label>
                  <div className="search-container">
                    <Search className="search-icon w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search lesson plans..."
                      value={lessonPlanSearch}
                      onChange={(e) => setLessonPlanSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              {/* Total Lesson Plans Widget */}
              <Card className="mb-6 md:mb-8 max-w-full sm:max-w-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lesson Plans</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">Available for {classes.find((c) => c.id === lessonPlanClass)?.name}</p>
                </CardContent>
              </Card>

              {/* Lesson Plans List */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Plans</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-3">
                     {subjects
                       .filter((subject) => {
                         const lessonPlanName = `${subject.title} - Lesson Plan`;
                         return lessonPlanName.toLowerCase().includes(lessonPlanSearch.toLowerCase());
                       })
                       .map((subject) => (
                       <>
                         {[1, 2, 3, 4].map((num) => (
                          <div
                            key={`${subject.id}-${num}`}
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                          >
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                              {subject.title} - Lesson Plan 1.{num}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="shadow-sm hover:shadow transition-shadow w-full sm:w-auto"
                              onClick={() => {
                                setSelectedLessonPlan({ subject: subject.title, number: `1.${num}` });
                                setLessonPlanDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Lesson Plan Preview Dialog */}
      <Dialog open={lessonPlanDialog} onOpenChange={setLessonPlanDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedLessonPlan?.subject} - Lesson Plan {selectedLessonPlan?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Objective</h3>
              <p className="text-muted-foreground">
                Students will be able to understand and apply key concepts related to {selectedLessonPlan?.subject}.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Duration</h3>
              <p className="text-muted-foreground">45 minutes</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Materials Needed</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Textbook</li>
                <li>Worksheets</li>
                <li>Whiteboard and markers</li>
                <li>Interactive activities</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Lesson Flow</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Introduction (10 minutes)</h4>
                  <p className="text-muted-foreground">
                    Begin with a warm-up activity to engage students and introduce the topic.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Main Activity (25 minutes)</h4>
                  <p className="text-muted-foreground">
                    Interactive lesson with examples, guided practice, and student participation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Conclusion (10 minutes)</h4>
                  <p className="text-muted-foreground">
                    Review key concepts, answer questions, and assign homework.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Assessment</h3>
              <p className="text-muted-foreground">
                Monitor student participation and understanding through questioning and observation.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
