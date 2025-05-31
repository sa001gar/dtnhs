
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BackToTopButton = () => {
  // Component disabled - returning null to hide it
  return null;

  /*
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full 
              flex items-center justify-center 
              bg-school-primary text-white shadow-lg transition-all duration-300 
              hover:scale-110 hover:bg-school-primary/90 
              dark:bg-white dark:text-black dark:hover:bg-gray-200
              ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="17 11 12 6 7 11" />
              <line x1="12" y1="18" x2="12" y2="6" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-black text-white dark:bg-white dark:text-black rounded px-3 py-1 text-sm shadow-md">
          Back to top
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  */
};

export default BackToTopButton;
