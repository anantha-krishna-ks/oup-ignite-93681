// Assessment Report Data
export interface AssessmentData {
  id: string;
  studentName: string;
  class: string;
  section: string;
  subject: string;
  assignmentsAssigned: number;
  assignmentsSubmitted: number;
  completionRate: number;
  averageScore: number;
  lastSubmission: string;
}

export const assessmentData: AssessmentData[] = [
  { id: "1", studentName: "Aarav Sharma", class: "Grade 5", section: "A", subject: "Mathematics", assignmentsAssigned: 12, assignmentsSubmitted: 11, completionRate: 92, averageScore: 87, lastSubmission: "2026-01-10" },
  { id: "2", studentName: "Priya Patel", class: "Grade 5", section: "A", subject: "English", assignmentsAssigned: 10, assignmentsSubmitted: 10, completionRate: 100, averageScore: 94, lastSubmission: "2026-01-11" },
  { id: "3", studentName: "Rohan Kumar", class: "Grade 5", section: "B", subject: "Science", assignmentsAssigned: 8, assignmentsSubmitted: 6, completionRate: 75, averageScore: 78, lastSubmission: "2026-01-08" },
  { id: "4", studentName: "Ananya Singh", class: "Grade 6", section: "A", subject: "Mathematics", assignmentsAssigned: 15, assignmentsSubmitted: 14, completionRate: 93, averageScore: 91, lastSubmission: "2026-01-12" },
  { id: "5", studentName: "Vikram Reddy", class: "Grade 6", section: "B", subject: "Hindi", assignmentsAssigned: 9, assignmentsSubmitted: 7, completionRate: 78, averageScore: 82, lastSubmission: "2026-01-09" },
  { id: "6", studentName: "Sneha Gupta", class: "Grade 4", section: "A", subject: "English", assignmentsAssigned: 11, assignmentsSubmitted: 11, completionRate: 100, averageScore: 96, lastSubmission: "2026-01-11" },
  { id: "7", studentName: "Arjun Nair", class: "Grade 4", section: "B", subject: "Science", assignmentsAssigned: 10, assignmentsSubmitted: 8, completionRate: 80, averageScore: 85, lastSubmission: "2026-01-10" },
  { id: "8", studentName: "Kavya Menon", class: "Grade 5", section: "A", subject: "Hindi", assignmentsAssigned: 7, assignmentsSubmitted: 7, completionRate: 100, averageScore: 89, lastSubmission: "2026-01-12" },
  { id: "9", studentName: "Rahul Joshi", class: "Grade 6", section: "A", subject: "English", assignmentsAssigned: 13, assignmentsSubmitted: 10, completionRate: 77, averageScore: 74, lastSubmission: "2026-01-07" },
  { id: "10", studentName: "Meera Iyer", class: "Grade 4", section: "A", subject: "Mathematics", assignmentsAssigned: 14, assignmentsSubmitted: 13, completionRate: 93, averageScore: 92, lastSubmission: "2026-01-11" },
];

// Ebook Report Data
export interface EbookChapter {
  chapterName: string;
  completionPercentage: number;
  timeSpent: string;
}

export interface EbookData {
  id: string;
  studentName: string;
  class: string;
  section: string;
  bookTitle: string;
  subject: string;
  overallCompletion: number;
  chaptersCompleted: number;
  totalChapters: number;
  lastAccessed: string;
  chapters: EbookChapter[];
}

export const ebookData: EbookData[] = [
  { id: "1", studentName: "Aarav Sharma", class: "Grade 5", section: "A", bookTitle: "Fun with Numbers", subject: "Mathematics", overallCompletion: 85, chaptersCompleted: 7, totalChapters: 8, lastAccessed: "2026-01-12", chapters: [
    { chapterName: "Numbers & Counting", completionPercentage: 100, timeSpent: "45 min" },
    { chapterName: "Addition Basics", completionPercentage: 100, timeSpent: "52 min" },
    { chapterName: "Subtraction Fun", completionPercentage: 100, timeSpent: "38 min" },
    { chapterName: "Multiplication Magic", completionPercentage: 100, timeSpent: "61 min" },
    { chapterName: "Division Intro", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "Fractions", completionPercentage: 100, timeSpent: "48 min" },
    { chapterName: "Decimals", completionPercentage: 80, timeSpent: "30 min" },
    { chapterName: "Word Problems", completionPercentage: 0, timeSpent: "0 min" },
  ]},
  { id: "2", studentName: "Priya Patel", class: "Grade 5", section: "A", bookTitle: "English Grammar", subject: "English", overallCompletion: 100, chaptersCompleted: 6, totalChapters: 6, lastAccessed: "2026-01-11", chapters: [
    { chapterName: "Nouns & Pronouns", completionPercentage: 100, timeSpent: "40 min" },
    { chapterName: "Verbs & Tenses", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "Adjectives", completionPercentage: 100, timeSpent: "35 min" },
    { chapterName: "Adverbs", completionPercentage: 100, timeSpent: "42 min" },
    { chapterName: "Prepositions", completionPercentage: 100, timeSpent: "38 min" },
    { chapterName: "Sentence Structure", completionPercentage: 100, timeSpent: "50 min" },
  ]},
  { id: "3", studentName: "Rohan Kumar", class: "Grade 5", section: "B", bookTitle: "Science Explorer", subject: "Science", overallCompletion: 60, chaptersCompleted: 3, totalChapters: 5, lastAccessed: "2026-01-08", chapters: [
    { chapterName: "Living Things", completionPercentage: 100, timeSpent: "65 min" },
    { chapterName: "Plants & Animals", completionPercentage: 100, timeSpent: "58 min" },
    { chapterName: "Human Body", completionPercentage: 100, timeSpent: "72 min" },
    { chapterName: "Matter & Materials", completionPercentage: 0, timeSpent: "0 min" },
    { chapterName: "Energy & Forces", completionPercentage: 0, timeSpent: "0 min" },
  ]},
  { id: "4", studentName: "Ananya Singh", class: "Grade 6", section: "A", bookTitle: "Advanced Math", subject: "Mathematics", overallCompletion: 92, chaptersCompleted: 11, totalChapters: 12, lastAccessed: "2026-01-12", chapters: [
    { chapterName: "Algebra Basics", completionPercentage: 100, timeSpent: "70 min" },
    { chapterName: "Linear Equations", completionPercentage: 100, timeSpent: "85 min" },
    { chapterName: "Geometry", completionPercentage: 100, timeSpent: "62 min" },
    { chapterName: "Triangles", completionPercentage: 100, timeSpent: "58 min" },
    { chapterName: "Circles", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "Area & Perimeter", completionPercentage: 100, timeSpent: "48 min" },
    { chapterName: "Volume", completionPercentage: 100, timeSpent: "52 min" },
    { chapterName: "Statistics", completionPercentage: 100, timeSpent: "45 min" },
    { chapterName: "Probability", completionPercentage: 100, timeSpent: "60 min" },
    { chapterName: "Ratios", completionPercentage: 100, timeSpent: "42 min" },
    { chapterName: "Percentages", completionPercentage: 100, timeSpent: "38 min" },
    { chapterName: "Data Analysis", completionPercentage: 0, timeSpent: "0 min" },
  ]},
  { id: "5", studentName: "Vikram Reddy", class: "Grade 6", section: "B", bookTitle: "Hindi Sahitya", subject: "Hindi", overallCompletion: 70, chaptersCompleted: 7, totalChapters: 10, lastAccessed: "2026-01-09", chapters: [
    { chapterName: "वर्णमाला", completionPercentage: 100, timeSpent: "35 min" },
    { chapterName: "संज्ञा", completionPercentage: 100, timeSpent: "40 min" },
    { chapterName: "सर्वनाम", completionPercentage: 100, timeSpent: "38 min" },
    { chapterName: "क्रिया", completionPercentage: 100, timeSpent: "45 min" },
    { chapterName: "विशेषण", completionPercentage: 100, timeSpent: "42 min" },
    { chapterName: "काल", completionPercentage: 100, timeSpent: "50 min" },
    { chapterName: "वाक्य रचना", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "अलंकार", completionPercentage: 0, timeSpent: "0 min" },
    { chapterName: "छंद", completionPercentage: 0, timeSpent: "0 min" },
    { chapterName: "निबंध", completionPercentage: 0, timeSpent: "0 min" },
  ]},
  { id: "6", studentName: "Sneha Gupta", class: "Grade 4", section: "A", bookTitle: "Reading Adventures", subject: "English", overallCompletion: 100, chaptersCompleted: 5, totalChapters: 5, lastAccessed: "2026-01-11", chapters: [
    { chapterName: "The Magic Garden", completionPercentage: 100, timeSpent: "30 min" },
    { chapterName: "Adventure Island", completionPercentage: 100, timeSpent: "35 min" },
    { chapterName: "Mystery House", completionPercentage: 100, timeSpent: "40 min" },
    { chapterName: "Space Journey", completionPercentage: 100, timeSpent: "38 min" },
    { chapterName: "Ocean Tales", completionPercentage: 100, timeSpent: "42 min" },
  ]},
  { id: "7", studentName: "Arjun Nair", class: "Grade 4", section: "B", bookTitle: "Science Fun", subject: "Science", overallCompletion: 75, chaptersCompleted: 6, totalChapters: 8, lastAccessed: "2026-01-10", chapters: [
    { chapterName: "Our Universe", completionPercentage: 100, timeSpent: "50 min" },
    { chapterName: "Solar System", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "Earth", completionPercentage: 100, timeSpent: "45 min" },
    { chapterName: "Weather", completionPercentage: 100, timeSpent: "40 min" },
    { chapterName: "Water Cycle", completionPercentage: 100, timeSpent: "48 min" },
    { chapterName: "Seasons", completionPercentage: 100, timeSpent: "42 min" },
    { chapterName: "Climate", completionPercentage: 0, timeSpent: "0 min" },
    { chapterName: "Environment", completionPercentage: 0, timeSpent: "0 min" },
  ]},
  { id: "8", studentName: "Kavya Menon", class: "Grade 5", section: "A", bookTitle: "Hindi Stories", subject: "Hindi", overallCompletion: 90, chaptersCompleted: 9, totalChapters: 10, lastAccessed: "2026-01-12", chapters: [
    { chapterName: "पंचतंत्र की कहानियाँ", completionPercentage: 100, timeSpent: "45 min" },
    { chapterName: "जातक कथाएँ", completionPercentage: 100, timeSpent: "50 min" },
    { chapterName: "अकबर बीरबल", completionPercentage: 100, timeSpent: "55 min" },
    { chapterName: "तेनाली रामा", completionPercentage: 100, timeSpent: "48 min" },
    { chapterName: "प्रेरणादायक कहानियाँ", completionPercentage: 100, timeSpent: "52 min" },
    { chapterName: "नैतिक कहानियाँ", completionPercentage: 100, timeSpent: "40 min" },
    { chapterName: "लोककथाएँ", completionPercentage: 100, timeSpent: "58 min" },
    { chapterName: "कविताएँ", completionPercentage: 100, timeSpent: "35 min" },
    { chapterName: "नाटक", completionPercentage: 100, timeSpent: "60 min" },
    { chapterName: "संवाद", completionPercentage: 0, timeSpent: "0 min" },
  ]},
];

// Student Report Data (for Teacher view)
export interface StudentData {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  parentName: string;
  parentContact: string;
  attendance: number;
  overallGrade: string;
  status: "Active" | "Inactive";
}

export const studentData: StudentData[] = [
  { id: "1", studentName: "Aarav Sharma", rollNumber: "2024001", class: "Grade 5", section: "A", email: "aarav.s@school.edu", parentName: "Rajesh Sharma", parentContact: "+91 98765 43210", attendance: 95, overallGrade: "A", status: "Active" },
  { id: "2", studentName: "Priya Patel", rollNumber: "2024002", class: "Grade 5", section: "A", email: "priya.p@school.edu", parentName: "Amit Patel", parentContact: "+91 98765 43211", attendance: 98, overallGrade: "A+", status: "Active" },
  { id: "3", studentName: "Rohan Kumar", rollNumber: "2024003", class: "Grade 5", section: "B", email: "rohan.k@school.edu", parentName: "Suresh Kumar", parentContact: "+91 98765 43212", attendance: 82, overallGrade: "B+", status: "Active" },
  { id: "4", studentName: "Ananya Singh", rollNumber: "2024004", class: "Grade 6", section: "A", email: "ananya.s@school.edu", parentName: "Vikram Singh", parentContact: "+91 98765 43213", attendance: 96, overallGrade: "A+", status: "Active" },
  { id: "5", studentName: "Vikram Reddy", rollNumber: "2024005", class: "Grade 6", section: "B", email: "vikram.r@school.edu", parentName: "Krishna Reddy", parentContact: "+91 98765 43214", attendance: 88, overallGrade: "B+", status: "Active" },
  { id: "6", studentName: "Sneha Gupta", rollNumber: "2024006", class: "Grade 4", section: "A", email: "sneha.g@school.edu", parentName: "Ravi Gupta", parentContact: "+91 98765 43215", attendance: 100, overallGrade: "A+", status: "Active" },
  { id: "7", studentName: "Arjun Nair", rollNumber: "2024007", class: "Grade 4", section: "B", email: "arjun.n@school.edu", parentName: "Gopal Nair", parentContact: "+91 98765 43216", attendance: 90, overallGrade: "A", status: "Active" },
  { id: "8", studentName: "Kavya Menon", rollNumber: "2024008", class: "Grade 5", section: "A", email: "kavya.m@school.edu", parentName: "Ashok Menon", parentContact: "+91 98765 43217", attendance: 94, overallGrade: "A", status: "Active" },
  { id: "9", studentName: "Rahul Joshi", rollNumber: "2024009", class: "Grade 6", section: "A", email: "rahul.j@school.edu", parentName: "Mohan Joshi", parentContact: "+91 98765 43218", attendance: 78, overallGrade: "B", status: "Inactive" },
  { id: "10", studentName: "Meera Iyer", rollNumber: "2024010", class: "Grade 4", section: "A", email: "meera.i@school.edu", parentName: "Narayan Iyer", parentContact: "+91 98765 43219", attendance: 97, overallGrade: "A+", status: "Active" },
];

// Chart data for subject-wise performance
export const subjectPerformanceData = [
  { subject: "Mathematics", avgScore: 88, submissions: 95 },
  { subject: "English", avgScore: 91, submissions: 98 },
  { subject: "Science", avgScore: 82, submissions: 88 },
  { subject: "Hindi", avgScore: 85, submissions: 92 },
];

// Chart data for class-wise completion
export const classCompletionData = [
  { class: "Grade 4", completion: 92, students: 45 },
  { class: "Grade 5", completion: 87, students: 52 },
  { class: "Grade 6", completion: 84, students: 48 },
];

// Filter options
export const classOptions = ["All Classes", "Grade 4", "Grade 5", "Grade 6"];
export const sectionOptions = ["All Sections", "A", "B"];
export const subjectOptions = ["All Subjects", "Mathematics", "English", "Science", "Hindi"];
export const statusOptions = ["All Status", "Active", "Inactive"];
