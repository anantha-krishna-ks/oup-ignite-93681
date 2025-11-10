import { BookOpen, ChevronDown, Home, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderProps {
  onLogout?: () => void;
  role?: "teacher" | "student";
  combinedSelection?: string;
  onCombinedChange?: (value: string) => void;
  combinedOptions?: Array<{ id: string; label: string }>;
  showClassSubjectSelector?: boolean;
}

const Header = ({ onLogout, role = "teacher", combinedSelection, onCombinedChange, combinedOptions, showClassSubjectSelector = false }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <BookOpen className="header-logo-icon" />
        </div>
        <div>
          <h1 className="header-title">Ignite</h1>
          <p className="header-subtitle">{role === "teacher" ? "Teacher" : "Student"} Portal</p>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/learner-dashboard")}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="sm:hidden">
            <p>Home</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/student-dashboard?view=reports")}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="sm:hidden">
            <p>Reports</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {showClassSubjectSelector && combinedSelection && onCombinedChange && combinedOptions && (
          <Select value={combinedSelection} onValueChange={onCombinedChange}>
            <SelectTrigger className="w-[200px] md:w-[240px] bg-white dark:bg-white dark:text-black">
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

        <DropdownMenu>
        <DropdownMenuTrigger className="header-user-trigger">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
            <AvatarFallback className="bg-primary text-primary-foreground">TC</AvatarFallback>
          </Avatar>
          <div className="header-user-info hidden md:block">
            <p className="header-user-name">Ms. Sarah Johnson</p>
            <p className="header-user-role">{role === "teacher" ? "Teacher" : "Class 6"}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={() => navigate("/profile-settings")}
          >
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted text-destructive"
            onClick={onLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
};
export default Header;