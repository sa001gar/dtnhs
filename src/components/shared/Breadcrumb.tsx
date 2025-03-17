
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  className?: string;
}

// Map routes to user-friendly names
const routeNames: Record<string, string> = {
  "": "Home",
  about: "About",
  academics: "Academics",
  gallery: "Gallery",
  notices: "Notices",
  routine: "Routine",
  results: "Results",
  contact: "Contact",
  students: "Students",
  teachers: "Teachers",
};

export function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // If we're on the home page, don't show the breadcrumb
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <div className="relative my-4 overflow-hidden rounded-md">
      {/* Simple gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-school-primary/10 to-school-secondary/10 -z-10"
      ></div>
      
      {/* Decorative element */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-school-primary to-school-secondary"></div>
      
      <nav 
        aria-label="Breadcrumb" 
        className={cn(
          "flex items-center space-x-1 py-2 px-6 font-medium",
          className
        )}
      >
        <Link
          to="/"
          className="flex items-center text-school-primary hover:text-school-primary/80 transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
        
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          return (
            <div key={path} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {isLast ? (
                <span className="font-semibold text-foreground ml-1 px-2 py-1 rounded bg-school-primary/10">
                  {routeNames[segment] || segment}
                </span>
              ) : (
                <Link
                  to={path}
                  className="ml-1 text-muted-foreground hover:text-school-primary transition-colors px-1"
                >
                  {routeNames[segment] || segment}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
