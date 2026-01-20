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
  lastAccessed: string;
}

export interface SubjectProgress {
  subject: string;
  bookTitle: string;
  overallCompletion: number;
  chaptersCompleted: number;
  totalChapters: number;
  chapters: EbookChapter[];
}

export interface EbookData {
  id: string;
  studentName: string;
  class: string;
  section: string;
  lastAccessed: string;
  subjects: SubjectProgress[];
}

export const ebookData: EbookData[] = [
  { 
    id: "1", 
    studentName: "Aarav Sharma", 
    class: "Grade 5", 
    section: "A", 
    lastAccessed: "2026-01-12",
    subjects: [
      {
        subject: "Mathematics",
        bookTitle: "Fun with Numbers",
        overallCompletion: 85,
        chaptersCompleted: 7,
        totalChapters: 8,
        chapters: [
          { chapterName: "Numbers & Counting", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-05" },
          { chapterName: "Addition Basics", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-06" },
          { chapterName: "Subtraction Fun", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-07" },
          { chapterName: "Multiplication Magic", completionPercentage: 100, timeSpent: "61 min", lastAccessed: "2026-01-08" },
          { chapterName: "Division Intro", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-09" },
          { chapterName: "Fractions", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-10" },
          { chapterName: "Decimals", completionPercentage: 80, timeSpent: "30 min", lastAccessed: "2026-01-12" },
          { chapterName: "Word Problems", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "English",
        bookTitle: "English Grammar Essentials",
        overallCompletion: 70,
        chaptersCompleted: 4,
        totalChapters: 6,
        chapters: [
          { chapterName: "Nouns & Pronouns", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-03" },
          { chapterName: "Verbs & Tenses", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-05" },
          { chapterName: "Adjectives", completionPercentage: 100, timeSpent: "32 min", lastAccessed: "2026-01-08" },
          { chapterName: "Adverbs", completionPercentage: 80, timeSpent: "25 min", lastAccessed: "2026-01-10" },
          { chapterName: "Prepositions", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Sentence Structure", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Science",
        bookTitle: "Science Explorer",
        overallCompletion: 40,
        chaptersCompleted: 2,
        totalChapters: 5,
        chapters: [
          { chapterName: "Living Things", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-04" },
          { chapterName: "Plants & Animals", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-06" },
          { chapterName: "Human Body", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Matter & Materials", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Energy & Forces", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Hindi",
        bookTitle: "हिंदी व्याकरण",
        overallCompletion: 60,
        chaptersCompleted: 3,
        totalChapters: 5,
        chapters: [
          { chapterName: "वर्णमाला", completionPercentage: 100, timeSpent: "30 min", lastAccessed: "2026-01-02" },
          { chapterName: "संज्ञा", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-04" },
          { chapterName: "सर्वनाम", completionPercentage: 100, timeSpent: "28 min", lastAccessed: "2026-01-07" },
          { chapterName: "क्रिया", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "विशेषण", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "2", 
    studentName: "Priya Patel", 
    class: "Grade 5", 
    section: "A", 
    lastAccessed: "2026-01-11",
    subjects: [
      {
        subject: "English",
        bookTitle: "English Grammar",
        overallCompletion: 100,
        chaptersCompleted: 6,
        totalChapters: 6,
        chapters: [
          { chapterName: "Nouns & Pronouns", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-02" },
          { chapterName: "Verbs & Tenses", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "Adjectives", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-06" },
          { chapterName: "Adverbs", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-08" },
          { chapterName: "Prepositions", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-10" },
          { chapterName: "Sentence Structure", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-11" },
        ]
      },
      {
        subject: "Mathematics",
        bookTitle: "Fun with Numbers",
        overallCompletion: 90,
        chaptersCompleted: 7,
        totalChapters: 8,
        chapters: [
          { chapterName: "Numbers & Counting", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-03" },
          { chapterName: "Addition Basics", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-04" },
          { chapterName: "Subtraction Fun", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-05" },
          { chapterName: "Multiplication Magic", completionPercentage: 100, timeSpent: "58 min", lastAccessed: "2026-01-06" },
          { chapterName: "Division Intro", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-07" },
          { chapterName: "Fractions", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-08" },
          { chapterName: "Decimals", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-10" },
          { chapterName: "Word Problems", completionPercentage: 20, timeSpent: "10 min", lastAccessed: "2026-01-11" },
        ]
      },
      {
        subject: "Science",
        bookTitle: "Science Explorer",
        overallCompletion: 80,
        chaptersCompleted: 4,
        totalChapters: 5,
        chapters: [
          { chapterName: "Living Things", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-02" },
          { chapterName: "Plants & Animals", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-04" },
          { chapterName: "Human Body", completionPercentage: 100, timeSpent: "62 min", lastAccessed: "2026-01-07" },
          { chapterName: "Matter & Materials", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-09" },
          { chapterName: "Energy & Forces", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "3", 
    studentName: "Rohan Kumar", 
    class: "Grade 5", 
    section: "B", 
    lastAccessed: "2026-01-08",
    subjects: [
      {
        subject: "Science",
        bookTitle: "Science Explorer",
        overallCompletion: 60,
        chaptersCompleted: 3,
        totalChapters: 5,
        chapters: [
          { chapterName: "Living Things", completionPercentage: 100, timeSpent: "65 min", lastAccessed: "2026-01-03" },
          { chapterName: "Plants & Animals", completionPercentage: 100, timeSpent: "58 min", lastAccessed: "2026-01-05" },
          { chapterName: "Human Body", completionPercentage: 100, timeSpent: "72 min", lastAccessed: "2026-01-08" },
          { chapterName: "Matter & Materials", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Energy & Forces", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Mathematics",
        bookTitle: "Fun with Numbers",
        overallCompletion: 50,
        chaptersCompleted: 4,
        totalChapters: 8,
        chapters: [
          { chapterName: "Numbers & Counting", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-02" },
          { chapterName: "Addition Basics", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-03" },
          { chapterName: "Subtraction Fun", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-05" },
          { chapterName: "Multiplication Magic", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-07" },
          { chapterName: "Division Intro", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Fractions", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Decimals", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Word Problems", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "4", 
    studentName: "Ananya Singh", 
    class: "Grade 6", 
    section: "A", 
    lastAccessed: "2026-01-12",
    subjects: [
      {
        subject: "Mathematics",
        bookTitle: "Advanced Math",
        overallCompletion: 92,
        chaptersCompleted: 11,
        totalChapters: 12,
        chapters: [
          { chapterName: "Algebra Basics", completionPercentage: 100, timeSpent: "70 min", lastAccessed: "2026-01-01" },
          { chapterName: "Linear Equations", completionPercentage: 100, timeSpent: "85 min", lastAccessed: "2026-01-02" },
          { chapterName: "Geometry", completionPercentage: 100, timeSpent: "62 min", lastAccessed: "2026-01-03" },
          { chapterName: "Triangles", completionPercentage: 100, timeSpent: "58 min", lastAccessed: "2026-01-04" },
          { chapterName: "Circles", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-05" },
          { chapterName: "Area & Perimeter", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-06" },
          { chapterName: "Volume", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-07" },
          { chapterName: "Statistics", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-08" },
          { chapterName: "Probability", completionPercentage: 100, timeSpent: "60 min", lastAccessed: "2026-01-09" },
          { chapterName: "Ratios", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-10" },
          { chapterName: "Percentages", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-12" },
          { chapterName: "Data Analysis", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "English",
        bookTitle: "Advanced English",
        overallCompletion: 85,
        chaptersCompleted: 6,
        totalChapters: 7,
        chapters: [
          { chapterName: "Essay Writing", completionPercentage: 100, timeSpent: "65 min", lastAccessed: "2026-01-02" },
          { chapterName: "Comprehension", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "Poetry Analysis", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-06" },
          { chapterName: "Letter Writing", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-08" },
          { chapterName: "Story Writing", completionPercentage: 100, timeSpent: "58 min", lastAccessed: "2026-01-10" },
          { chapterName: "Report Writing", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-11" },
          { chapterName: "Debate Skills", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Science",
        bookTitle: "Advanced Science",
        overallCompletion: 75,
        chaptersCompleted: 6,
        totalChapters: 8,
        chapters: [
          { chapterName: "Cell Biology", completionPercentage: 100, timeSpent: "70 min", lastAccessed: "2026-01-01" },
          { chapterName: "Genetics Basics", completionPercentage: 100, timeSpent: "75 min", lastAccessed: "2026-01-03" },
          { chapterName: "Ecology", completionPercentage: 100, timeSpent: "60 min", lastAccessed: "2026-01-05" },
          { chapterName: "Chemistry Intro", completionPercentage: 100, timeSpent: "68 min", lastAccessed: "2026-01-07" },
          { chapterName: "Physics Basics", completionPercentage: 100, timeSpent: "72 min", lastAccessed: "2026-01-09" },
          { chapterName: "Electricity", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-11" },
          { chapterName: "Magnetism", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Light & Sound", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Hindi",
        bookTitle: "उच्च हिंदी",
        overallCompletion: 70,
        chaptersCompleted: 7,
        totalChapters: 10,
        chapters: [
          { chapterName: "गद्य साहित्य", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-02" },
          { chapterName: "पद्य साहित्य", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "नाटक", completionPercentage: 100, timeSpent: "60 min", lastAccessed: "2026-01-05" },
          { chapterName: "उपन्यास अंश", completionPercentage: 100, timeSpent: "65 min", lastAccessed: "2026-01-07" },
          { chapterName: "कहानी", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-09" },
          { chapterName: "निबंध लेखन", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-10" },
          { chapterName: "पत्र लेखन", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-12" },
          { chapterName: "व्याकरण", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "मुहावरे", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "लोकोक्तियाँ", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "5", 
    studentName: "Vikram Reddy", 
    class: "Grade 6", 
    section: "B", 
    lastAccessed: "2026-01-09",
    subjects: [
      {
        subject: "Hindi",
        bookTitle: "Hindi Sahitya",
        overallCompletion: 70,
        chaptersCompleted: 7,
        totalChapters: 10,
        chapters: [
          { chapterName: "वर्णमाला", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-01" },
          { chapterName: "संज्ञा", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-02" },
          { chapterName: "सर्वनाम", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-03" },
          { chapterName: "क्रिया", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-05" },
          { chapterName: "विशेषण", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-06" },
          { chapterName: "काल", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-08" },
          { chapterName: "वाक्य रचना", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-09" },
          { chapterName: "अलंकार", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "छंद", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "निबंध", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Mathematics",
        bookTitle: "Advanced Math",
        overallCompletion: 65,
        chaptersCompleted: 8,
        totalChapters: 12,
        chapters: [
          { chapterName: "Algebra Basics", completionPercentage: 100, timeSpent: "60 min", lastAccessed: "2026-01-01" },
          { chapterName: "Linear Equations", completionPercentage: 100, timeSpent: "70 min", lastAccessed: "2026-01-02" },
          { chapterName: "Geometry", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-03" },
          { chapterName: "Triangles", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-04" },
          { chapterName: "Circles", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-05" },
          { chapterName: "Area & Perimeter", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-06" },
          { chapterName: "Volume", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-07" },
          { chapterName: "Statistics", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-08" },
          { chapterName: "Probability", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Ratios", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Percentages", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Data Analysis", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "6", 
    studentName: "Sneha Gupta", 
    class: "Grade 4", 
    section: "A", 
    lastAccessed: "2026-01-11",
    subjects: [
      {
        subject: "English",
        bookTitle: "Reading Adventures",
        overallCompletion: 100,
        chaptersCompleted: 5,
        totalChapters: 5,
        chapters: [
          { chapterName: "The Magic Garden", completionPercentage: 100, timeSpent: "30 min", lastAccessed: "2026-01-05" },
          { chapterName: "Adventure Island", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-07" },
          { chapterName: "Mystery House", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-09" },
          { chapterName: "Space Journey", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-10" },
          { chapterName: "Ocean Tales", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-11" },
        ]
      },
      {
        subject: "Mathematics",
        bookTitle: "Math Basics",
        overallCompletion: 95,
        chaptersCompleted: 6,
        totalChapters: 6,
        chapters: [
          { chapterName: "Counting Fun", completionPercentage: 100, timeSpent: "25 min", lastAccessed: "2026-01-03" },
          { chapterName: "Simple Addition", completionPercentage: 100, timeSpent: "30 min", lastAccessed: "2026-01-05" },
          { chapterName: "Simple Subtraction", completionPercentage: 100, timeSpent: "28 min", lastAccessed: "2026-01-07" },
          { chapterName: "Shapes", completionPercentage: 100, timeSpent: "32 min", lastAccessed: "2026-01-09" },
          { chapterName: "Patterns", completionPercentage: 100, timeSpent: "26 min", lastAccessed: "2026-01-10" },
          { chapterName: "Time & Money", completionPercentage: 80, timeSpent: "20 min", lastAccessed: "2026-01-11" },
        ]
      },
      {
        subject: "Science",
        bookTitle: "Science Fun",
        overallCompletion: 85,
        chaptersCompleted: 5,
        totalChapters: 6,
        chapters: [
          { chapterName: "My Body", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-04" },
          { chapterName: "Animals Around Us", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-06" },
          { chapterName: "Plants", completionPercentage: 100, timeSpent: "32 min", lastAccessed: "2026-01-08" },
          { chapterName: "Air & Water", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-09" },
          { chapterName: "Day & Night", completionPercentage: 100, timeSpent: "28 min", lastAccessed: "2026-01-10" },
          { chapterName: "Seasons", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Hindi",
        bookTitle: "हिंदी पाठमाला",
        overallCompletion: 80,
        chaptersCompleted: 4,
        totalChapters: 5,
        chapters: [
          { chapterName: "अक्षर ज्ञान", completionPercentage: 100, timeSpent: "25 min", lastAccessed: "2026-01-03" },
          { chapterName: "शब्द रचना", completionPercentage: 100, timeSpent: "30 min", lastAccessed: "2026-01-05" },
          { chapterName: "वाक्य बनाओ", completionPercentage: 100, timeSpent: "28 min", lastAccessed: "2026-01-07" },
          { chapterName: "कहानी पढ़ो", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-10" },
          { chapterName: "कविता", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "7", 
    studentName: "Arjun Nair", 
    class: "Grade 4", 
    section: "B", 
    lastAccessed: "2026-01-10",
    subjects: [
      {
        subject: "Science",
        bookTitle: "Science Fun",
        overallCompletion: 75,
        chaptersCompleted: 6,
        totalChapters: 8,
        chapters: [
          { chapterName: "Our Universe", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-02" },
          { chapterName: "Solar System", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "Earth", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-05" },
          { chapterName: "Weather", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-07" },
          { chapterName: "Water Cycle", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-09" },
          { chapterName: "Seasons", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-10" },
          { chapterName: "Climate", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Environment", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "English",
        bookTitle: "Reading Adventures",
        overallCompletion: 60,
        chaptersCompleted: 3,
        totalChapters: 5,
        chapters: [
          { chapterName: "The Magic Garden", completionPercentage: 100, timeSpent: "28 min", lastAccessed: "2026-01-03" },
          { chapterName: "Adventure Island", completionPercentage: 100, timeSpent: "32 min", lastAccessed: "2026-01-06" },
          { chapterName: "Mystery House", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-09" },
          { chapterName: "Space Journey", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Ocean Tales", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  },
  { 
    id: "8", 
    studentName: "Kavya Menon", 
    class: "Grade 5", 
    section: "A", 
    lastAccessed: "2026-01-12",
    subjects: [
      {
        subject: "Hindi",
        bookTitle: "Hindi Stories",
        overallCompletion: 90,
        chaptersCompleted: 9,
        totalChapters: 10,
        chapters: [
          { chapterName: "पंचतंत्र की कहानियाँ", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-02" },
          { chapterName: "जातक कथाएँ", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-03" },
          { chapterName: "अकबर बीरबल", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "तेनाली रामा", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-06" },
          { chapterName: "प्रेरणादायक कहानियाँ", completionPercentage: 100, timeSpent: "52 min", lastAccessed: "2026-01-07" },
          { chapterName: "नैतिक कहानियाँ", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-08" },
          { chapterName: "लोककथाएँ", completionPercentage: 100, timeSpent: "58 min", lastAccessed: "2026-01-10" },
          { chapterName: "कविताएँ", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-11" },
          { chapterName: "नाटक", completionPercentage: 100, timeSpent: "60 min", lastAccessed: "2026-01-12" },
          { chapterName: "संवाद", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "English",
        bookTitle: "English Grammar Essentials",
        overallCompletion: 85,
        chaptersCompleted: 5,
        totalChapters: 6,
        chapters: [
          { chapterName: "Nouns & Pronouns", completionPercentage: 100, timeSpent: "38 min", lastAccessed: "2026-01-03" },
          { chapterName: "Verbs & Tenses", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-05" },
          { chapterName: "Adjectives", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-07" },
          { chapterName: "Adverbs", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-09" },
          { chapterName: "Prepositions", completionPercentage: 100, timeSpent: "42 min", lastAccessed: "2026-01-11" },
          { chapterName: "Sentence Structure", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Mathematics",
        bookTitle: "Fun with Numbers",
        overallCompletion: 75,
        chaptersCompleted: 6,
        totalChapters: 8,
        chapters: [
          { chapterName: "Numbers & Counting", completionPercentage: 100, timeSpent: "40 min", lastAccessed: "2026-01-02" },
          { chapterName: "Addition Basics", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-04" },
          { chapterName: "Subtraction Fun", completionPercentage: 100, timeSpent: "35 min", lastAccessed: "2026-01-06" },
          { chapterName: "Multiplication Magic", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-08" },
          { chapterName: "Division Intro", completionPercentage: 100, timeSpent: "50 min", lastAccessed: "2026-01-10" },
          { chapterName: "Fractions", completionPercentage: 100, timeSpent: "45 min", lastAccessed: "2026-01-12" },
          { chapterName: "Decimals", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Word Problems", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      },
      {
        subject: "Science",
        bookTitle: "Science Explorer",
        overallCompletion: 60,
        chaptersCompleted: 3,
        totalChapters: 5,
        chapters: [
          { chapterName: "Living Things", completionPercentage: 100, timeSpent: "55 min", lastAccessed: "2026-01-04" },
          { chapterName: "Plants & Animals", completionPercentage: 100, timeSpent: "48 min", lastAccessed: "2026-01-07" },
          { chapterName: "Human Body", completionPercentage: 100, timeSpent: "62 min", lastAccessed: "2026-01-10" },
          { chapterName: "Matter & Materials", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
          { chapterName: "Energy & Forces", completionPercentage: 0, timeSpent: "0 min", lastAccessed: "-" },
        ]
      }
    ]
  }
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

// Combined class-section options (without "All" option)
export const classSectionOptions = [
  { id: "grade4-a", label: "Grade 4 - A", class: "Grade 4", section: "A" },
  { id: "grade4-b", label: "Grade 4 - B", class: "Grade 4", section: "B" },
  { id: "grade5-a", label: "Grade 5 - A", class: "Grade 5", section: "A" },
  { id: "grade5-b", label: "Grade 5 - B", class: "Grade 5", section: "B" },
  { id: "grade6-a", label: "Grade 6 - A", class: "Grade 6", section: "A" },
  { id: "grade6-b", label: "Grade 6 - B", class: "Grade 6", section: "B" },
];
