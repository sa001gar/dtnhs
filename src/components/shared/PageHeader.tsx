
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "../ui/AnimatedSection";
import { Breadcrumb } from "./Breadcrumb";
import { Star, Sparkle, ArrowDown, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
  pattern?: "dots" | "grid" | "noise" | "stripes" | "waves" | "hexagons" | "none";
  className?: string;
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
  small?: boolean;
  accentColor?: string;
  theme?: "default" | "gradient" | "vibrant" | "minimal" | "dark";
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  pattern = "none",
  className,
  children,
  showBreadcrumbs = true,
  small = false,
  accentColor = "school-primary",
  theme = "default",
}) => {
  const patternClasses = {
    dots: "bg-dots-pattern bg-[length:20px_20px]",
    grid: "bg-grid-pattern bg-[length:30px_30px]",
    noise: "bg-noise-pattern",
    stripes: "bg-stripes-pattern bg-[length:20px_20px]",
    waves: "after:content-[''] after:absolute after:inset-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZjIwIj48cGF0aCBkPSJNMTI4MCAwTDY0MCA3MCAwIDB2MTQwbDY0MC03MCAxMjQwIDcwVjB6Ii8+PC9nPjwvc3ZnPg==')]",
    hexagons: "after:content-[''] after:absolute after:inset-0 after:opacity-10 after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"49\" viewBox=\"0 0 28 49\"><g fill-rule=\"evenodd\"><g id=\"hexagons\" fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"nonzero\"><path d=\"M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z\"/></g></g></svg>')]",
    none: "",
  };

  const themeStyles = {
    default: "",
    gradient: "bg-gradient-to-br from-school-primary/20 to-school-secondary/20 dark:from-school-primary/30 dark:to-school-secondary/30",
    vibrant: "bg-gradient-to-r from-school-primary/30 via-school-accent/20 to-school-secondary/30 dark:from-school-primary/40 dark:via-school-accent/30 dark:to-school-secondary/40",
    minimal: "bg-muted/20",
    dark: "bg-school-dark/90 text-white",
  };

  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const titleWords = title.split(" ");
  
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden transition-all duration-700",
        small ? "py-16 md:py-20" : "py-24 md:py-32 lg:py-36",
        scrolled ? "pt-12" : "",
        patternClasses[pattern],
        themeStyles[theme],
        className
      )}
    >
      {/* Fixed geometric shapes and clip-pathed elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top-right triangle */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-school-accent/10 dark:bg-school-accent/20 rounded-full blur-3xl"></div>
        
        {/* Bottom-left blob */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-3xl"></div>
        
        {/* Clipped shape (top-left) */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-school-secondary/5 dark:bg-school-secondary/10"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}>
        </div>
        
        {/* Clipped shape (bottom-right) */}
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-school-primary/5 dark:bg-school-primary/10"
          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}>
        </div>

        {/* Animated circle (center-left) */}
        <motion.div 
          className="absolute left-10 top-1/2 w-40 h-40 border-2 border-dashed border-school-primary/10 dark:border-school-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Animated circle (center-right) */}
        <motion.div 
          className="absolute right-10 top-1/3 w-28 h-28 border border-school-secondary/10 dark:border-school-secondary/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Fixed circles (scattered) */}
        <div className="absolute left-1/4 bottom-1/4 w-6 h-6 bg-school-primary/20 dark:bg-school-primary/30 rounded-full"></div>
        <div className="absolute right-1/4 top-1/3 w-4 h-4 bg-school-secondary/20 dark:bg-school-secondary/30 rounded-full"></div>
        <div className="absolute left-1/3 top-1/4 w-3 h-3 bg-school-accent/20 dark:bg-school-accent/30 rounded-full"></div>
      </div>

      {/* Background elements */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-school-primary/40 backdrop-blur-sm"></div>
          
          {/* Animated light rays for background image */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 h-full w-24 bg-white/10 rotate-12 transform -translate-x-64 translate-y-0 animate-[beam_8s_ease-in-out_infinite_alternate]"></div>
            <div className="absolute top-0 left-2/4 h-full w-36 bg-white/5 -rotate-12 transform -translate-x-64 translate-y-0 animate-[beam_12s_ease-in-out_infinite_alternate]" style={{ animationDelay: "2s" }}></div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          {/* Dynamic gradient that follows mouse */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-background to-background/80 transition-all duration-500"
            style={{
              backgroundPosition: `calc(50% + ${mousePosition.x / 30}px) calc(50% + ${mousePosition.y / 30}px)`,
            }}
          >
            {/* Interactive floating elements */}
            <div 
              className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-school-primary/5 dark:bg-school-primary/10 blur-3xl animate-pulse"
              style={{ 
                transform: `translate(${mousePosition.x / 60}px, ${mousePosition.y / 60}px)` 
              }}
            ></div>
            <div 
              className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-school-secondary/5 dark:bg-school-secondary/15 blur-3xl animate-pulse" 
              style={{ 
                animationDelay: "1s",
                transform: `translate(${-mousePosition.x / 50}px, ${-mousePosition.y / 50}px)` 
              }}
            ></div>
            
            {/* Animated decorative elements */}
            <div className="hidden md:block">
              <motion.div 
                className="absolute top-1/4 right-1/4 w-14 h-14 rounded-full border-2 border-dashed border-school-primary/20 dark:border-school-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              
              <motion.div 
                className="absolute bottom-1/4 left-1/5 text-school-primary/20 dark:text-school-primary/30"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-10 h-10" />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 right-1/6 text-school-secondary/20 dark:text-school-secondary/30 transform rotate-12"
                animate={{ y: [-15, 15, -15], rotate: [12, 20, 12] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkle className="w-8 h-8" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1/3 right-1/5 text-school-primary/15 dark:text-school-primary/25"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flame className="w-12 h-12" />
              </motion.div>
              
              <motion.div 
                className="absolute top-2/3 left-1/6 text-school-secondary/15 dark:text-school-secondary/25"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-9 h-9" />
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="container relative z-10 px-4">
        {showBreadcrumbs && (
          <AnimatedSection animation="fade-in-up" className="mb-6 md:mb-8">
            <Breadcrumb className="justify-center" />
          </AnimatedSection>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative"
        >
          {/* Decorative circles behind title */}
          <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-school-primary/10 dark:bg-school-primary/20 blur-sm hidden md:block"></div>
          <div className="absolute -right-4 -bottom-4 w-10 h-10 rounded-full bg-school-secondary/10 dark:bg-school-secondary/20 blur-sm hidden md:block"></div>
          
          <h1 className={cn(
            "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center max-w-4xl mx-auto leading-tight",
            backgroundImage ? "text-white" : "text-foreground"
          )}>
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mx-1 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="relative inline-block">
                  {word}
                  <motion.span 
                    className={`absolute -bottom-1 left-0 w-full h-1.5 bg-${accentColor} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 + (i * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  ></motion.span>
                </span>
              </motion.span>
            ))}
          </h1>
        </motion.div>
        
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={cn(
              "mx-auto mt-6 max-w-3xl text-lg md:text-xl lg:text-2xl text-center",
              backgroundImage ? "text-white/90" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          </motion.div>
        )}

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={cn(
              "mx-auto mt-4 max-w-3xl text-md md:text-lg text-center",
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex justify-center"
          >
            {children}
          </motion.div>
        )}

        {/* Scroll down indicator for larger headers */}
        {!small && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 50,
                behavior: 'smooth'
              });
            }}
          >
            <span className={cn(
              "text-sm mb-2",
              backgroundImage ? "text-white/70" : "text-muted-foreground"
            )}>
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className={cn(
                "h-6 w-6",
                backgroundImage ? "text-white/70" : "text-muted-foreground"
              )} />
            </motion.div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-gradient-to-b from-transparent to-background/20 blur-lg"></div>
      </div>
      
      {/* Bottom wave pattern - enhanced for more dimension */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden leading-none w-full">
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ 
            width: 'calc(100% + 1.3px)', 
            height: '16px',
            filter: 'drop-shadow(0px -2px 2px rgba(0,0,0,0.03))'
          }}
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.65,88.39,118.75,73.15,177.57,63.13,242.91,52.19,282.22,59.58,321.39,56.44Z" 
            className={`fill-current ${backgroundImage ? 'text-background/20' : 'text-background'}`}
          ></path>
        </svg>
      </div>

      {/* Clip path decoration at the top */}
      <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden">
        <div className="absolute top-0 w-full h-12 bg-school-primary/10 dark:bg-school-primary/15" 
             style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 60%)" }}></div>
        <div className="absolute top-0 right-0 w-1/3 h-16 bg-school-secondary/10 dark:bg-school-secondary/15" 
             style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%)" }}></div>
      </div>
    </div>
  );
};

export default PageHeader;
