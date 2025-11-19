import { BookOpen, ChevronDown, Home, BarChart3, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import MobileSidebar from "./MobileSidebar";
import oxfordIgniteLogo from "@/assets/oxford-ignite-logo.png";

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
  showChapterSelector = false
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
                onClick={() => navigate("/chapters")}
                className="h-9 w-9 rounded-lg border-2"
              >
                <Home className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>

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
              <p className="text-xs text-muted-foreground mb-3">{role === "teacher" ? "Teacher Account" : "Class 6 Student"}</p>
              
              {role === "teacher" && (
                <div className="text-left space-y-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Teaching Teacher</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Class 6-A</p>
                      <p className="pl-4">Mathematics, General Science</p>
                      <p>Class 6-B</p>
                      <p className="pl-4">Mathematics, General Science</p>
                      <p>Class 7-A</p>
                      <p className="pl-4">General Science</p>
                      <p>Class 7-B</p>
                      <p className="pl-4">General Science</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Class Teacher</p>
                    <p className="text-xs text-muted-foreground">Class 6-A, Class 7-A</p>
                  </div>
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