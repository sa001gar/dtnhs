import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300); // Show after 300px
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full flex items-center justify-center 
        transition-all duration-300 shadow-lg hover:scale-110
        bg-school-primary text-white 
        dark:bg-white dark:text-black dark:hover:bg-gray-200 
        ${
          isVisible
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-90"
        }`}
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
  );
};

export default BackToTopButton;
