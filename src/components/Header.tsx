import { BookOpen, ChevronDown, Home, BarChart3, List, Info, GraduationCap, Video, FileText, BookMarked } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MobileSidebar from "./MobileSidebar";
import oxfordIgniteLogo from "@/assets/oxford-ignite-logo.png";

interface TeacherToolsState {
  showResources: boolean;
  showAssessments: boolean;
  showLessonPlans: boolean;
  isOpen: boolean;
}

interface TeacherToolsCallbacks {
  setShowResources: (value: boolean) => void;
  setShowAssessments: (value: boolean) => void;
  setShowLessonPlans: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

interface HeaderProps {
  onLogout?: () => void;
  role?: "teacher" | "student";
  combinedSelection?: string;
  onCombinedChange?: (value: string) => void;
  combinedOptions?: Array<{ id: string; label: string }>;
  showClassSubjectSelector?: boolean;
  chapterSelection?: string;
  onChapterChange?: (value: string) => void;
  chapterOptions?: Array<{ id: number; name: string }>;
  showChapterSelector?: boolean;
  teacherToolsState?: TeacherToolsState;
  teacherToolsCallbacks?: TeacherToolsCallbacks;
}

const Header = ({ 
  onLogout, 
  role = "teacher", 
  combinedSelection, 
  onCombinedChange, 
  combinedOptions, 
  showClassSubjectSelector = false, 
  chapterSelection, 
  onChapterChange, 
  chapterOptions, 
  showChapterSelector = false,
  teacherToolsState,
  teacherToolsCallbacks
}: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="app-header">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Menu */}
        <MobileSidebar
          onLogout={onLogout}
          role={role}
          combinedSelection={combinedSelection}
          onCombinedChange={onCombinedChange}
          combinedOptions={combinedOptions}
          showClassSubjectSelector={showClassSubjectSelector}
        />
        
        <div className="header-brand cursor-pointer" onClick={() => navigate("/chapters")}>
          <img src={oxfordIgniteLogo} alt="Oxford Ignite" className="h-10 w-auto" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {showClassSubjectSelector && combinedSelection && onCombinedChange && combinedOptions && (
          <Select value={combinedSelection} onValueChange={onCombinedChange}>
            <SelectTrigger className="hidden md:flex w-[240px] bg-white dark:bg-white dark:text-black rounded-lg border-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <SelectValue placeholder="Select class and subject" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-white z-50">
              {combinedOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} className="dark:text-black">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {showChapterSelector && chapterSelection && onChapterChange && chapterOptions && (
          <Select value={chapterSelection} onValueChange={onChapterChange}>
            <SelectTrigger className="hidden md:flex w-[240px] bg-white dark:bg-white dark:text-black rounded-lg border-2">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4" />
                <SelectValue placeholder="Select chapter" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-white z-50">
              {chapterOptions.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id.toString()} className="dark:text-black">
                  {chapter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Navigation Icons - Desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/reports-coming-soon")}
                className="h-9 w-9 rounded-lg border-2"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reports</p>
            </TooltipContent>
          </Tooltip>

          {/* Teacher Tools Button */}
          {teacherToolsState && teacherToolsCallbacks && (
            <Popover open={teacherToolsState.isOpen} onOpenChange={teacherToolsCallbacks.setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={teacherToolsState.isOpen ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9 rounded-lg border-2"
                  title="Teacher Tools"
                >
                  <GraduationCap className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-72 p-4 bg-card border-2 border-primary/20 shadow-xl" 
                align="end"
                sideOffset={10}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-base text-foreground">Teacher Tools</h3>
                  </div>
                  
                  <Button
                    variant={teacherToolsState.showResources ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-12 text-sm font-medium"
                    onClick={() => {
                      teacherToolsCallbacks.setShowResources(!teacherToolsState.showResources);
                      teacherToolsCallbacks.setShowAssessments(false);
                      teacherToolsCallbacks.setShowLessonPlans(false);
                      teacherToolsCallbacks.setIsOpen(false);
                    }}
                  >
                    <Video className="w-5 h-5" />
                    <div className="text-left">
                      <div>Learning Resources</div>
                      <div className="text-xs opacity-70 font-normal">Videos & Materials</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant={teacherToolsState.showAssessments ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-12 text-sm font-medium"
                    onClick={() => {
                      teacherToolsCallbacks.setShowAssessments(!teacherToolsState.showAssessments);
                      teacherToolsCallbacks.setShowResources(false);
                      teacherToolsCallbacks.setShowLessonPlans(false);
                      teacherToolsCallbacks.setIsOpen(false);
                    }}
                  >
                    <FileText className="w-5 h-5" />
                    <div className="text-left">
                      <div>Assessments</div>
                      <div className="text-xs opacity-70 font-normal">Quizzes & Tests</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant={teacherToolsState.showLessonPlans ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-12 text-sm font-medium"
                    onClick={() => {
                      teacherToolsCallbacks.setShowLessonPlans(!teacherToolsState.showLessonPlans);
                      teacherToolsCallbacks.setShowResources(false);
                      teacherToolsCallbacks.setShowAssessments(false);
                      teacherToolsCallbacks.setIsOpen(false);
                    }}
                  >
                    <BookMarked className="w-5 h-5" />
                    <div className="text-left">
                      <div>Lesson Plan</div>
                      <div className="text-xs opacity-70 font-normal">Teaching Guide</div>
                    </div>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Desktop User Dropdown - Hidden on Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:flex focus:outline-none">
            <Avatar className="w-9 h-9 cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
              <AvatarFallback className="bg-primary text-primary-foreground">SJ</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover border-border p-0">
            <div className="p-4 text-center">
              <div className="flex justify-center mb-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">SJ</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-foreground mb-1">Ms. Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground mb-1">sarah.johnson@school.edu</p>
              <p className="text-xs text-muted-foreground">{role === "teacher" ? "Teacher Account" : "Class 6 Student"}</p>
              
              {role === "teacher" && (
                <div className="mt-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full text-xs h-8">
                        <Info className="w-3 h-3 mr-1.5" />
                        Teaching Details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-popover z-[9999]" align="center">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-foreground">Teaching Details</h4>
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div>
                              <p className="font-medium text-foreground">Class 6-A</p>
                              <p className="pl-3">Mathematics, General Science</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Class 6-B</p>
                              <p className="pl-3">Mathematics, General Science</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Class 7-A</p>
                              <p className="pl-3">General Science</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Class 7-B</p>
                              <p className="pl-3">General Science</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            <DropdownMenuSeparator className="my-0" />
            <div className="p-2">
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-muted rounded-md"
                onClick={() => navigate("/profile-settings")}
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-muted text-destructive rounded-md"
                onClick={onLogout}
              >
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Header;