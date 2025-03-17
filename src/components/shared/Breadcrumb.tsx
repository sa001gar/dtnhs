
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
    <div className="relative">
      {/* Clip path design element */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-school-primary/20 to-school-secondary/20 -z-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
        }}
      ></div>
      
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm py-2 px-4 ${className}`}
      >
        <Link
          to="/"
          className="flex items-center text-school-primary hover:text-school-primary/80 transition-colors font-medium"
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
                <span className="font-medium bg-gradient-to-r from-school-primary to-school-secondary bg-clip-text text-transparent ml-1">
                  {routeNames[segment] || segment}
                </span>
              ) : (
                <Link
                  to={path}
                  className="ml-1 text-muted-foreground hover:text-school-primary transition-colors"
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
