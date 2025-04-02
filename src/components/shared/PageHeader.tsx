
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "../ui/AnimatedSection";
import { Breadcrumb } from "./Breadcrumb";
import { Star, Sparkle } from "lucide-react";

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
    dots: "bg-dots",
    grid: "bg-grid",
    noise: "bg-noise",
    stripes: "bg-stripes",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        small ? "py-12 md:py-16" : "py-16 md:py-24",
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
          <div className="absolute inset-0 bg-school-primary/30 backdrop-blur-sm"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-background to-background/80">
          {/* Decorative floating elements */}
          <div className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full bg-school-primary/5 dark:bg-school-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-school-secondary/5 dark:bg-school-secondary/10 blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
          
          <div className="hidden md:block">
            <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full border-2 border-dashed border-school-primary/20 animate-spin-slow"></div>
            <div className="absolute bottom-1/4 left-1/5 text-school-primary/20 animate-float">
              <Star className="w-8 h-8" />
            </div>
            <div className="absolute top-1/3 right-1/6 text-school-secondary/20 animate-float-delayed transform rotate-12">
              <Sparkle className="w-6 h-6" />
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
        
        <AnimatedSection animation="fade-in-up">
          <h1 className={cn(
            "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center max-w-3xl mx-auto",
            backgroundImage ? "text-white" : "text-foreground"
          )}>
            <span className="relative inline-block">
              {title}
              <span className={`absolute -bottom-1 left-0 w-full h-1 bg-${accentColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </span>
          </h1>
        </AnimatedSection>
        
        {subtitle && (
          <AnimatedSection animation="fade-in-up" delay={100}>
            <p className={cn(
              "mx-auto mt-4 max-w-3xl text-lg md:text-xl text-center",
              backgroundImage ? "text-white/90" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          </AnimatedSection>
        )}

        {description && (
          <AnimatedSection animation="fade-in-up" delay={150}>
            <p className={cn(
              "mx-auto mt-4 max-w-3xl text-md md:text-lg text-center",
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          </AnimatedSection>
        )}

        {children && (
          <AnimatedSection animation="fade-in-up" delay={200}>
            <div className="mt-8 flex justify-center">{children}</div>
          </AnimatedSection>
        )}

        {/* Decorative elements */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-transparent to-background/20 blur-lg"></div>
      </div>
      
      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden leading-none w-full">
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ 
            width: 'calc(100% + 1.3px)', 
            height: '12px' 
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
