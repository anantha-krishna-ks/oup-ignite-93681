import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search, Download, Eye, FileText, BookOpen, Users, TrendingUp, CheckCircle, Clock, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  assessmentData,
  ebookData,
  studentData,
  classSectionOptions,
  subjectOptions,
  statusOptions,
  type EbookData,
  type StudentData,
} from "@/data/reportsData";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const ReportsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ebook");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassSection, setSelectedClassSection] = useState("grade4-a");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Pagination states
  const [assessmentPage, setAssessmentPage] = useState(1);
  const [ebookPage, setEbookPage] = useState(1);
  const [studentPage, setStudentPage] = useState(1);
  const [assessmentItemsPerPage, setAssessmentItemsPerPage] = useState(5);
  const [ebookItemsPerPage, setEbookItemsPerPage] = useState(5);
  const [studentItemsPerPage, setStudentItemsPerPage] = useState(5);

  // Get selected class and section from combined selection
  const selectedOption = classSectionOptions.find(opt => opt.id === selectedClassSection);
  const selectedClass = selectedOption?.class || "Grade 4";
  const selectedSection = selectedOption?.section || "A";

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedClassSection("grade4-a");
    setSelectedSubject("All Subjects");
    setSelectedStatus("All Status");
    setAssessmentPage(1);
    setEbookPage(1);
    setStudentPage(1);
  };

  // Helper function to generate page numbers for pagination
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(5, totalPages); i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  // Filtered Assessment Data
  const filteredAssessmentData = useMemo(() => {
    return assessmentData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = item.class === selectedClass;
      const matchesSection = item.section === selectedSection;
      const matchesSubject = selectedSubject === "All Subjects" || item.subject === selectedSubject;
      return matchesSearch && matchesClass && matchesSection && matchesSubject;
    });
  }, [searchQuery, selectedClass, selectedSection, selectedSubject]);

  // Filtered Ebook Data
  const filteredEbookData = useMemo(() => {
    return ebookData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = item.class === selectedClass;
      const matchesSection = item.section === selectedSection;
      const matchesSubject = selectedSubject === "All Subjects" || item.subject === selectedSubject;
      return matchesSearch && matchesClass && matchesSection && matchesSubject;
    });
  }, [searchQuery, selectedClass, selectedSection, selectedSubject]);

  // Filtered Student Data
  const filteredStudentData = useMemo(() => {
    return studentData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = item.class === selectedClass;
      const matchesSection = item.section === selectedSection;
      const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;
      return matchesSearch && matchesClass && matchesSection && matchesStatus;
    });
  }, [searchQuery, selectedClass, selectedSection, selectedStatus]);

  // Stats calculations
  const assessmentStats = useMemo(() => ({
    totalAssignments: filteredAssessmentData.reduce((acc, item) => acc + item.assignmentsAssigned, 0),
    totalSubmissions: filteredAssessmentData.reduce((acc, item) => acc + item.assignmentsSubmitted, 0),
    avgCompletion: Math.round(filteredAssessmentData.reduce((acc, item) => acc + item.completionRate, 0) / (filteredAssessmentData.length || 1)),
    avgScore: Math.round(filteredAssessmentData.reduce((acc, item) => acc + item.averageScore, 0) / (filteredAssessmentData.length || 1)),
  }), [filteredAssessmentData]);

  const ebookStats = useMemo(() => {
    // Calculate total hours from all chapters
    const totalMinutes = filteredEbookData.reduce((acc, item) => {
      return acc + item.chapters.reduce((chapterAcc, chapter) => {
        const minutes = parseInt(chapter.timeSpent.replace(' min', '')) || 0;
        return chapterAcc + minutes;
      }, 0);
    }, 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10; // Round to 1 decimal

    return {
      totalBooks: filteredEbookData.length,
      avgCompletion: Math.round(filteredEbookData.reduce((acc, item) => acc + item.overallCompletion, 0) / (filteredEbookData.length || 1)),
      totalHours,
      totalChapters: filteredEbookData.reduce((acc, item) => acc + item.totalChapters, 0),
    };
  }, [filteredEbookData]);

  const studentStats = useMemo(() => ({
    totalStudents: filteredStudentData.length,
    activeStudents: filteredStudentData.filter(item => item.status === "Active").length,
    avgAttendance: Math.round(filteredStudentData.reduce((acc, item) => acc + item.attendance, 0) / (filteredStudentData.length || 1)),
    topPerformers: filteredStudentData.filter(item => item.overallGrade === "A+").length,
  }), [filteredStudentData]);

  const getCompletionBadge = (rate: number) => {
    if (rate === 100) return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Complete</Badge>;
    if (rate >= 80) return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">Good</Badge>;
    if (rate >= 60) return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">In Progress</Badge>;
    return <Badge className="bg-red-500/10 text-red-600 border-red-200">Needs Attention</Badge>;
  };

  const getGradeBadge = (grade: string) => {
    const gradeColors: Record<string, string> = {
      "A+": "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      "A": "bg-blue-500/10 text-blue-600 border-blue-200",
      "B+": "bg-violet-500/10 text-violet-600 border-violet-200",
      "B": "bg-amber-500/10 text-amber-600 border-amber-200",
    };
    return <Badge className={gradeColors[grade] || "bg-muted text-muted-foreground"}>{grade}</Badge>;
  };

  // Ebook Detail Dialog
  const EbookDetailDialog = ({ ebook }: { ebook: EbookData }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              {ebook.bookTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                {ebook.studentName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{ebook.studentName}</p>
                <p className="text-xs text-muted-foreground">{ebook.class} - {ebook.section}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <Progress value={ebook.overallCompletion} className="h-2" />
                </div>
                <span className="text-lg font-bold text-primary">{ebook.overallCompletion}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {ebook.chaptersCompleted} of {ebook.totalChapters} chapters completed
              </p>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="p-6">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Chapter Progress
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {ebook.chapters.map((chapter, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border transition-all ${
                  chapter.completionPercentage === 100 
                    ? 'bg-emerald-50/50 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-800/30' 
                    : chapter.completionPercentage > 0 
                      ? 'bg-blue-50/50 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-800/30' 
                      : 'bg-muted/30 border-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                      chapter.completionPercentage === 100 
                        ? 'bg-emerald-500 text-white' 
                        : chapter.completionPercentage > 0 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {chapter.completionPercentage === 100 ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="font-medium text-sm truncate">{chapter.chapterName}</span>
                  </div>
                  <Badge 
                    variant={chapter.completionPercentage === 100 ? "default" : "secondary"}
                    className={`min-w-[44px] justify-center text-xs shrink-0 ${
                      chapter.completionPercentage === 100 
                        ? 'bg-emerald-500 hover:bg-emerald-600' 
                        : chapter.completionPercentage > 0 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : ''
                    }`}
                  >
                    {chapter.completionPercentage}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={chapter.completionPercentage} 
                    className={`h-1.5 flex-1 ${
                      chapter.completionPercentage === 100 
                        ? '[&>div]:bg-emerald-500' 
                        : ''
                    }`} 
                  />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {chapter.timeSpent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Student Detail Dialog
  const StudentDetailDialog = ({ student }: { student: StudentData }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Eye className="h-3.5 w-3.5 mr-1.5" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Student Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="font-medium">{student.studentName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Roll Number</p>
              <p className="font-medium">{student.rollNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Class & Section</p>
              <p className="font-medium">{student.class} - {student.section}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-sm">{student.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Parent Name</p>
              <p className="font-medium">{student.parentName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Parent Contact</p>
              <p className="font-medium">{student.parentContact}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{student.attendance}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{student.overallGrade}</p>
              <p className="text-xs text-muted-foreground">Grade</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Badge variant={student.status === "Active" ? "default" : "secondary"} className="mt-1">
                {student.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/chapters")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Progress Reports</h1>
                <p className="text-sm text-muted-foreground">Track performance and learning analytics</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation - Industry Standard */}
          <div className="border-b">
            <div className="flex gap-1">
              {[
                // Hidden for now - uncomment when needed
                // { 
                //   id: "assessment", 
                //   label: "Assessment Report", 
                //   icon: FileText, 
                //   count: filteredAssessmentData.length,
                // },
                { 
                  id: "ebook", 
                  label: "E-book Report", 
                  icon: BookOpen, 
                  count: filteredEbookData.length,
                },
                // Hidden for now - uncomment when needed
                // { 
                //   id: "student", 
                //   label: "Student Report", 
                //   icon: Users, 
                //   count: filteredStudentData.length,
                // },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-2.5 px-5 py-3.5 font-medium text-sm transition-colors
                      ${isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    <span className={`
                      inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 text-xs font-semibold rounded-full
                      ${isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                      }
                    `}>
                      {tab.count}
                    </span>
                    {/* Active indicator bar */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="border-dashed">
            <CardContent className="pt-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, roll number, or book title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedClassSection} onValueChange={setSelectedClassSection}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Class - Section" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white z-50">
                      {classSectionOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id} className="dark:text-black">{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {activeTab !== "student" && (
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {activeTab === "student" && (
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Button variant="ghost" size="icon" onClick={resetFilters} className="shrink-0">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Report Tab */}
          <TabsContent value="assessment" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{assessmentStats.totalAssignments}</p>
                      <p className="text-xs text-muted-foreground">Total Assigned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{assessmentStats.totalSubmissions}</p>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{assessmentStats.avgCompletion}%</p>
                      <p className="text-xs text-muted-foreground">Avg Completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{assessmentStats.avgScore}%</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="overflow-hidden border">
              <CardHeader className="bg-muted/40 border-b py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Assessment Details</CardTitle>
                    <CardDescription>Student-wise assignment tracking</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredAssessmentData.length} records
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 border-b-2 border-primary/20 hover:bg-primary/5">
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Student</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Class</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Subject</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Assigned</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Submitted</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Score</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssessmentData
                        .slice((assessmentPage - 1) * assessmentItemsPerPage, assessmentPage * assessmentItemsPerPage)
                        .map((item, index) => (
                        <TableRow 
                          key={item.id} 
                          className={`${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-primary/5 transition-colors border-b`}
                        >
                          <TableCell className="font-medium py-4">{item.studentName}</TableCell>
                          <TableCell className="py-4 text-muted-foreground">{item.class} - {item.section}</TableCell>
                          <TableCell className="py-4">{item.subject}</TableCell>
                          <TableCell className="text-center py-4 font-medium">{item.assignmentsAssigned}</TableCell>
                          <TableCell className="text-center py-4 font-medium">{item.assignmentsSubmitted}</TableCell>
                          <TableCell className="text-center py-4">
                            <span className="font-semibold">{item.averageScore}%</span>
                          </TableCell>
                          <TableCell className="py-4">{getCompletionBadge(item.completionRate)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                {(() => {
                  const totalPages = Math.ceil(filteredAssessmentData.length / assessmentItemsPerPage);
                  const pageNumbers = getPageNumbers(assessmentPage, totalPages);
                  return (
                    <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                      <p className="text-sm text-muted-foreground">
                        Total Records: {filteredAssessmentData.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setAssessmentPage(p => Math.max(1, p - 1))}
                          disabled={assessmentPage === 1}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {pageNumbers.map((page, idx) => (
                          <Button
                            key={idx}
                            variant={assessmentPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => typeof page === 'number' && setAssessmentPage(page)}
                            className="h-8 w-8 p-0 text-sm"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setAssessmentPage(p => Math.min(totalPages, p + 1))}
                          disabled={assessmentPage >= totalPages}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show per Page:</span>
                        <Select 
                          value={String(assessmentItemsPerPage)} 
                          onValueChange={(val) => { setAssessmentItemsPerPage(Number(val)); setAssessmentPage(1); }}
                        >
                          <SelectTrigger className="w-[70px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                              <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* E-book Report Tab */}
          <TabsContent value="ebook" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{ebookStats.totalBooks}</p>
                      <p className="text-xs text-muted-foreground">Books in Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{ebookStats.totalHours}h</p>
                      <p className="text-xs text-muted-foreground">Hours of E-Book Usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{ebookStats.avgCompletion}%</p>
                      <p className="text-xs text-muted-foreground">Avg Completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <FileText className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{ebookStats.totalChapters}</p>
                      <p className="text-xs text-muted-foreground">Total Chapters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="overflow-hidden border">
              <CardHeader className="bg-muted/40 border-b py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">E-book Progress</CardTitle>
                    <CardDescription>Chapter-wise completion tracking</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredEbookData.length} records
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 border-b-2 border-primary/20 hover:bg-primary/5">
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Student</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Total Chapters Completed</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Total Chapters in Progress</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Hours of Usage</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEbookData
                        .slice((ebookPage - 1) * ebookItemsPerPage, ebookPage * ebookItemsPerPage)
                        .map((item, index) => {
                          const chaptersCompleted = item.chapters.filter(ch => ch.completionPercentage === 100).length;
                          const chaptersInProgress = item.chapters.filter(ch => ch.completionPercentage > 0 && ch.completionPercentage < 100).length;
                          const totalHours = Math.round(item.chapters.reduce((acc, ch) => acc + (parseInt(ch.timeSpent.replace(' min', '')) || 0), 0) / 60 * 10) / 10;
                          
                          return (
                            <TableRow 
                              key={item.id}
                              className={`${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-primary/5 transition-colors border-b`}
                            >
                              <TableCell className="py-4 font-medium">{item.studentName}</TableCell>
                              <TableCell className="text-center py-4">
                                <span className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                                  {chaptersCompleted}
                                </span>
                              </TableCell>
                              <TableCell className="text-center py-4">
                                <span className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold text-sm">
                                  {chaptersInProgress}
                                </span>
                              </TableCell>
                              <TableCell className="text-center py-4">
                                <span className="font-medium">{totalHours}h</span>
                              </TableCell>
                              <TableCell className="py-4">
                                <EbookDetailDialog ebook={item} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                {(() => {
                  const totalPages = Math.ceil(filteredEbookData.length / ebookItemsPerPage);
                  const pageNumbers = getPageNumbers(ebookPage, totalPages);
                  return (
                    <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                      <p className="text-sm text-muted-foreground">
                        Total Records: {filteredEbookData.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEbookPage(p => Math.max(1, p - 1))}
                          disabled={ebookPage === 1}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {pageNumbers.map((page, idx) => (
                          <Button
                            key={idx}
                            variant={ebookPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => typeof page === 'number' && setEbookPage(page)}
                            className="h-8 w-8 p-0 text-sm"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEbookPage(p => Math.min(totalPages, p + 1))}
                          disabled={ebookPage >= totalPages}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show per Page:</span>
                        <Select 
                          value={String(ebookItemsPerPage)} 
                          onValueChange={(val) => { setEbookItemsPerPage(Number(val)); setEbookPage(1); }}
                        >
                          <SelectTrigger className="w-[70px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                              <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Report Tab */}
          <TabsContent value="student" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{studentStats.totalStudents}</p>
                      <p className="text-xs text-muted-foreground">Total Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{studentStats.activeStudents}</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{studentStats.avgAttendance}%</p>
                      <p className="text-xs text-muted-foreground">Avg Attendance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{studentStats.topPerformers}</p>
                      <p className="text-xs text-muted-foreground">Top Performers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="overflow-hidden border">
              <CardHeader className="bg-muted/40 border-b py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Student Directory</CardTitle>
                    <CardDescription>View and manage student information</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {filteredStudentData.length} records
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 border-b-2 border-primary/20 hover:bg-primary/5">
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Roll No.</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Student Name</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Class</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Email</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Attendance</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4 text-center">Grade</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Status</TableHead>
                        <TableHead className="font-bold text-foreground text-xs uppercase tracking-wider py-4">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudentData
                        .slice((studentPage - 1) * studentItemsPerPage, studentPage * studentItemsPerPage)
                        .map((item, index) => (
                        <TableRow 
                          key={item.id}
                          className={`${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-primary/5 transition-colors border-b`}
                        >
                          <TableCell className="font-mono text-sm py-4">{item.rollNumber}</TableCell>
                          <TableCell className="font-medium py-4">{item.studentName}</TableCell>
                          <TableCell className="py-4 text-muted-foreground">{item.class} - {item.section}</TableCell>
                          <TableCell className="text-sm text-muted-foreground py-4">{item.email}</TableCell>
                          <TableCell className="text-center py-4">
                            <span className="font-semibold">{item.attendance}%</span>
                          </TableCell>
                          <TableCell className="text-center py-4">{getGradeBadge(item.overallGrade)}</TableCell>
                          <TableCell className="py-4">
                            <Badge variant={item.status === "Active" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <StudentDetailDialog student={item} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                {(() => {
                  const totalPages = Math.ceil(filteredStudentData.length / studentItemsPerPage);
                  const pageNumbers = getPageNumbers(studentPage, totalPages);
                  return (
                    <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                      <p className="text-sm text-muted-foreground">
                        Total Records: {filteredStudentData.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setStudentPage(p => Math.max(1, p - 1))}
                          disabled={studentPage === 1}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {pageNumbers.map((page, idx) => (
                          <Button
                            key={idx}
                            variant={studentPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => typeof page === 'number' && setStudentPage(page)}
                            className="h-8 w-8 p-0 text-sm"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setStudentPage(p => Math.min(totalPages, p + 1))}
                          disabled={studentPage >= totalPages}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show per Page:</span>
                        <Select 
                          value={String(studentItemsPerPage)} 
                          onValueChange={(val) => { setStudentItemsPerPage(Number(val)); setStudentPage(1); }}
                        >
                          <SelectTrigger className="w-[70px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                              <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsPage;
