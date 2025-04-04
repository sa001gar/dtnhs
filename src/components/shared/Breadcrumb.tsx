
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
  admissions: "Admissions",
  syllabus: "Syllabus",
  "exam-schedule": "Exam Schedule",
  "previous-year-papers": "Previous Year Papers",
  alumni: "Alumni",
  blog: "Blog",
  forum: "Forum",
};

export function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // If we're on the home page, don't show the breadcrumb
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
      <Link
        to="/"
        className="flex items-center text-white/80 hover:text-white transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        
        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-white/60" />
            {isLast ? (
              <span className="font-medium text-white ml-1">
                {routeNames[segment] || segment}
              </span>
            ) : (
              <Link
                to={path}
                className="ml-1 text-white/80 hover:text-white transition-colors"
              >
                {routeNames[segment] || segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
