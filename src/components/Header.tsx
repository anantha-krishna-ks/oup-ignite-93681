import { BookOpen, ChevronDown, Home, BarChart3 } from "lucide-react";
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
}

const Header = ({ onLogout, role = "teacher", combinedSelection, onCombinedChange, combinedOptions, showClassSubjectSelector = false }: HeaderProps) => {
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
        
        <div className="header-brand">
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
        <DropdownMenuTrigger className="header-user-trigger hidden md:flex">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
            <AvatarFallback className="bg-primary text-primary-foreground">TC</AvatarFallback>
          </Avatar>
          <div className="header-user-info">
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