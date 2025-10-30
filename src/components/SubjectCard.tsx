import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SubjectCardProps {
  title: string;
  image: string;
  color: string;
  onClick: () => void;
}

const SubjectCard = ({ title, image, color, onClick }: SubjectCardProps) => {
  return (
    <Card onClick={onClick} className="group subject-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="subject-card-content relative">
        <div className={cn("subject-card-icon-wrapper", color)}>
          <img 
            src={image} 
            alt={title}
            className="subject-card-icon"
          />
        </div>
        
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="subject-card-title">{title}</h3>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <span className="font-medium">Open</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
