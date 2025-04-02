
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
  pattern?: "dots" | "grid" | "noise" | "stripes" | "none";
  className?: string;
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
  small?: boolean;
  accentColor?: string;
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
}) => {
  const patternClasses = {
    dots: "bg-dots-pattern",
    grid: "bg-grid-pattern",
    noise: "bg-noise-pattern",
    stripes: "bg-stripes-pattern",
    none: "",
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
        small ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-32",
        scrolled ? "pt-12" : "",
        patternClasses[pattern],
        className
      )}
    >
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
          className="text-center"
        >
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
    </div>
  );
};

export default PageHeader;
