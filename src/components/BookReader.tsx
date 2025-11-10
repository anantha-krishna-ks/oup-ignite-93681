import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, FileText, Video, BookOpen, ZoomIn, ZoomOut, Search, X, List, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResourceViewer from "./ResourceViewer";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookReaderProps {
  subject: string;
  onClose: () => void;
}

const mockPages = [
  {
    id: 1,
    title: "Introduction",
    content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men.

Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions.`,
    annotations: [
      { id: 'a1', type: 'video', title: 'Introduction to Chapter 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 280 },
      { id: 'a2', type: 'pdf', title: 'Reference Material', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 520 },
      { id: 'a3', type: 'video', title: 'Detailed Explanation', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 780 },
    ],
    resources: [
      { id: 1, type: "video", title: "Introduction Video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 2, type: "pdf", title: "Chapter Overview", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    content: `Let's explore the fundamental concepts of this subject. Understanding the core principles is essential for mastering this field.

The foundation of knowledge begins with understanding basic terminology and concepts. Each concept builds upon the previous one, creating a comprehensive framework for learning.

As we delve deeper into the subject matter, you'll discover how these concepts interconnect and support one another. This interconnected web of knowledge forms the basis of expertise in this domain.

Practice and application are key to truly grasping these concepts. Theory alone is insufficient; you must engage with the material actively to develop true understanding and competence.`,
    annotations: [
      { id: 'a4', type: 'pdf', title: 'Core Concepts Guide', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 180 },
      { id: 'a5', type: 'video', title: 'Visual Learning Aid', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 360 },
    ],
    resources: [
      { id: 3, type: "video", title: "Core Concepts Explained", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: 3,
    title: "Advanced Topics",
    content: `Dive deeper into advanced topics and applications. This chapter explores sophisticated concepts that build upon your foundational knowledge.

Advanced learners will find these topics particularly engaging as they push the boundaries of conventional understanding. The complexity increases, but so does the reward of mastery.

Real-world applications of these advanced concepts demonstrate their practical value. You'll see how theory translates into practice in professional settings.

Critical thinking and analysis become paramount at this level. You're encouraged to question, explore, and develop your own insights as you progress through this material.`,
    annotations: [
      { id: 'a6', type: 'video', title: 'Advanced Tutorial', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 200 },
      { id: 'a7', type: 'pdf', title: 'Advanced Reading Material', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', position: 450 },
      { id: 'a8', type: 'video', title: 'Case Study Examples', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', position: 650 },
    ],
    resources: [
      { id: 4, type: "pdf", title: "Advanced Reading", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    ],
  },
];

const classes = [
  { id: "6", name: "Class 6" },
  { id: "7", name: "Class 7" },
  { id: "8", name: "Class 8" },
  { id: "9", name: "Class 9" },
  { id: "10", name: "Class 10" },
];

const chapters = [
  { id: 1, name: "Fun with Words" },
  { id: 2, name: "Jo Jo Laali (A jogula)" },
  { id: 3, name: "Kamala's First Day at School" },
  { id: 4, name: "Friends" },
  { id: 5, name: "A Little Clock" },
  { id: 6, name: "Let's Play Hide-and-Seek!" },
  { id: 7, name: "Healthy Habits" },
  { id: 8, name: "Four Seasons" },
];

const mockWorksheets = [
  { id: 1, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Worksheet 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Worksheet 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 5, title: "Worksheet 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockAnswerKeys = [
  { id: 1, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Answer Key 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Answer Key 2", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 5, title: "Answer Key 1", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockLessonPlans = [
  { id: 1, title: "Week 1 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Week 2 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 3, title: "Week 3 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 4, title: "Week 4 Lesson Plan", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
];

const mockAssessments = [
  { id: 1, title: "Chapter 1 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
  { id: 2, title: "Chapter 2 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 2 },
  { id: 3, title: "Chapter 3 Quiz", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 3 },
  { id: 4, title: "Mid-term Assessment", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", chapterId: 1 },
];

const BookReader = ({ subject, onClose }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.2);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showResources, setShowResources] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [showLessonPlans, setShowLessonPlans] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string>("1");
  const [selectedClass, setSelectedClass] = useState<string>("6");
  const [filterType, setFilterType] = useState<string>("all");
  const [worksheetSearch, setWorksheetSearch] = useState("");
  const [answerKeySearch, setAnswerKeySearch] = useState("");
  const [lessonPlanSearch, setLessonPlanSearch] = useState("");
  const [assessmentSearch, setAssessmentSearch] = useState("");

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Get the page data, using modulo to cycle through mock pages safely
  const pageIndex = ((currentPage - 1) % mockPages.length);
  const page = mockPages[pageIndex] || mockPages[0];

  // Filter resources based on selected chapter
  const filteredResources = selectedChapter === "all" 
    ? (page?.resources || [])
    : (page?.resources || []).filter(r => r.id === parseInt(selectedChapter));

  // Filter lesson plans based on selected chapter
  const filteredLessonPlans = selectedChapter === "all"
    ? mockLessonPlans
    : mockLessonPlans.filter(plan => plan.chapterId === parseInt(selectedChapter));

  // Filter assessments based on selected chapter
  const filteredAssessments = selectedChapter === "all"
    ? mockAssessments
    : mockAssessments.filter(assessment => assessment.chapterId === parseInt(selectedChapter));

  // Function to render content with annotations
  const renderContentWithAnnotations = () => {
    const content = page.content;
    const annotations = page.annotations || [];
    
    if (annotations.length === 0) {
      return <div className="text-foreground leading-relaxed whitespace-pre-line text-justify">{content}</div>;
    }

    // Sort annotations by position
    const sortedAnnotations = [...annotations].sort((a, b) => a.position - b.position);
    
    const parts = [];
    let lastIndex = 0;

    sortedAnnotations.forEach((annotation, idx) => {
      // Add text before annotation
      parts.push(
        <span key={`text-${idx}`}>
          {content.substring(lastIndex, annotation.position)}
        </span>
      );

      // Add annotation icon
      parts.push(
        <button
          key={`annotation-${annotation.id}`}
          onClick={() => setSelectedResource(annotation)}
          className="inline-flex items-center justify-center w-6 h-6 mx-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group relative"
          title={annotation.title}
        >
          {annotation.type === 'video' ? (
            <Video className="w-3.5 h-3.5 text-primary" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-secondary" />
          )}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            {annotation.title}
          </span>
        </button>
      );

      lastIndex = annotation.position;
    });

    // Add remaining text
    parts.push(
      <span key="text-end">
        {content.substring(lastIndex)}
      </span>
    );

    return <div className="text-foreground leading-relaxed text-justify">{parts}</div>;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-auto md:h-16 bg-card border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 py-3 md:py-0 gap-3 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-base md:text-xl font-bold text-foreground flex items-center gap-2 truncate">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="truncate">{subject} - Book</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
          {/* Chapter Dropdown */}
          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger className="w-full sm:w-[200px] md:w-[280px]">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4" />
                <SelectValue placeholder="Select chapter" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id.toString()}>
                  {chapter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant={showResources ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setShowResources(!showResources);
              setShowAssessments(false);
              setShowLessonPlans(false);
            }}
            title="Learning Resources"
          >
            <Video className="w-4 h-4" />
          </Button>
          <Button
            variant={showAssessments ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setShowAssessments(!showAssessments);
              setShowResources(false);
              setShowLessonPlans(false);
            }}
            title="Assessments"
          >
            <FileText className="w-4 h-4" />
          </Button>
          <Button
            variant={showLessonPlans ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setShowLessonPlans(!showLessonPlans);
              setShowResources(false);
              setShowAssessments(false);
            }}
            title="Lesson Plan"
          >
            <BookMarked className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content - PDF View */}
        <div className="flex-1 overflow-y-auto bg-muted/30 relative">
          <div className="w-full p-2 sm:p-4 md:p-8">
            {/* PDF Document */}
            <div className="bg-card shadow-2xl rounded-lg border border-border p-2 sm:p-4 md:p-8 flex justify-center overflow-x-auto relative">
              {/* PDF Controls - Embedded at bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 bg-card/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-border shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  <span className="text-xs sm:text-sm text-foreground font-medium px-2">
                    {currentPage} / {numPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
                    disabled={currentPage === numPages}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                    size="sm"
                    variant="outline"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-xs sm:text-sm text-muted-foreground min-w-[50px] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    onClick={() => setScale(Math.min(2, scale + 0.2))}
                    size="sm"
                    variant="outline"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Document
                file="/english-grade1-chapter.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center min-h-[600px]">
                    <div className="text-muted-foreground">Loading PDF...</div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center min-h-[600px]">
                    <div className="text-destructive">Error loading PDF. Please try again.</div>
                  </div>
                }
              >
                <Page 
                  pageNumber={currentPage} 
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </div>
          </div>
        </div>

        {/* Right Panel - Learning Resources */}
        {showResources && (
          <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 w-full md:w-96 bg-card md:border-l border-border overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Resources</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowResources(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-3">Filter by Type</h4>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full border-2 border-primary bg-background hover:bg-muted transition-colors">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="pdf">PDFs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {page?.resources
                    ?.filter((resource: any) => 
                      filterType === "all" || resource.type === filterType
                    )
                    .map((resource: any) => (
                      <div
                        key={resource.id}
                        onClick={() => setSelectedResource(resource)}
                        className="p-4 rounded-lg border border-border bg-card hover:bg-muted cursor-pointer transition-all hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          {resource.type === "video" ? (
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Video className="w-5 h-5 text-primary" />
                            </div>
                          ) : (
                            <div className="p-2 bg-secondary/10 rounded-lg">
                              <FileText className="w-5 h-5 text-secondary" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground mb-1">
                              {resource.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Click to preview
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Assessments */}
        {showAssessments && (
          <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 w-full md:w-96 bg-card md:border-l border-border overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Assessments</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAssessments(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>


              <Tabs defaultValue="worksheets" className="mt-6">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="worksheets" className="text-xs sm:text-sm">Worksheets</TabsTrigger>
                  <TabsTrigger value="answer-keys" className="text-xs sm:text-sm">Answer Keys</TabsTrigger>
                </TabsList>

                <TabsContent value="worksheets" className="mt-4">
                  <div className="search-container mb-4">
                    <Search className="search-icon w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search worksheets..."
                      value={worksheetSearch}
                      onChange={(e) => setWorksheetSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="space-y-2">
                    {mockWorksheets
                      .filter((w) => w.title.toLowerCase().includes(worksheetSearch.toLowerCase()))
                      .map((worksheet) => {
                        const chapter = chapters.find(ch => ch.id === worksheet.chapterId);
                        return (
                          <div
                            key={worksheet.id}
                            onClick={() =>
                              setSelectedResource({ ...worksheet, type: "pdf" })
                            }
                            className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-primary" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground font-medium">
                                  {worksheet.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Ch{chapter?.id}: {chapter?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </TabsContent>

                <TabsContent value="answer-keys" className="mt-4">
                  <div className="search-container mb-4">
                    <Search className="search-icon w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search answer keys..."
                      value={answerKeySearch}
                      onChange={(e) => setAnswerKeySearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="space-y-2">
                    {mockAnswerKeys
                      .filter((a) => a.title.toLowerCase().includes(answerKeySearch.toLowerCase()))
                      .map((answerKey) => {
                        const chapter = chapters.find(ch => ch.id === answerKey.chapterId);
                        return (
                          <div
                            key={answerKey.id}
                            onClick={() =>
                              setSelectedResource({ ...answerKey, type: "pdf" })
                            }
                            className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-secondary" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground font-medium">
                                  {answerKey.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Ch{chapter?.id}: {chapter?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Right Panel - Lesson Plans */}
        {showLessonPlans && (
          <div className="fixed md:relative inset-0 md:inset-auto z-40 md:z-0 w-full md:w-96 bg-card md:border-l border-border overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Lesson Plans</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLessonPlans(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="search-container mb-4">
                <Search className="search-icon w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search lesson plans..."
                  value={lessonPlanSearch}
                  onChange={(e) => setLessonPlanSearch(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="space-y-2">
                {filteredLessonPlans
                  .filter((plan) => plan.title.toLowerCase().includes(lessonPlanSearch.toLowerCase()))
                  .map((plan) => {
                    const chapter = chapters.find(ch => ch.id === plan.chapterId);
                    return (
                      <div
                        key={plan.id}
                        onClick={() =>
                          setSelectedResource({ ...plan, type: "pdf" })
                        }
                        className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <BookMarked className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm text-foreground font-medium">
                              {plan.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ch{chapter?.id}: {chapter?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resource Viewer Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <ResourceViewer
              resource={selectedResource}
              onClose={() => setSelectedResource(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReader;
