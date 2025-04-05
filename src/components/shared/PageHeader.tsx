
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "../ui/AnimatedSection";
import { Breadcrumb } from "./Breadcrumb";
import { SquareCode } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
  small?: boolean;
  pattern?: string; // Added pattern prop to fix TypeScript errors
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  className,
  children,
  showBreadcrumbs = true,
  small = false,
  pattern,
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-r from-school-primary to-school-secondary py-14",
        small ? "min-h-[80px] md:min-h-[120px]" : "min-h-[140px] md:min-h-[220px]",
        className
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-school-primary/50 backdrop-blur-sm"></div>
        </div>
      )}

      <div className="container relative z-10 flex items-center justify-between px-8">
        <div className="text-left">
          {showBreadcrumbs && (
            <AnimatedSection animation="fade-in-up" className="mb-6">
              <Breadcrumb className="justify-start" />
            </AnimatedSection>
          )}
          
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-3xl font-bold tracking-tighter text-white md:text-5xl">
              {title}
            </h1>
          </AnimatedSection>
          
          {subtitle && (
            <AnimatedSection animation="fade-in-up" delay={100}>
              <p className="mt-4 max-w-3xl text-lg text-white/80">
                {subtitle}
              </p>
            </AnimatedSection>
          )}

          {description && (
            <AnimatedSection animation="fade-in-up" delay={100}>
              <p className="mt-4 max-w-3xl text-lg text-white/80">
                {description}
              </p>
            </AnimatedSection>
          )}

          {children && (
            <AnimatedSection animation="fade-in-up" delay={200}>
              <div className="mt-8">{children}</div>
            </AnimatedSection>
          )}
        </div>

        <div className="hidden md:block">
          <div className="relative h-32 w-32 animate-float">
            <div className="absolute inset-0 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm shadow-lg overflow-hidden">
              <img 
                src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" 
                alt="School Building" 
                className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="absolute -inset-1 border-2 border-dashed border-white/40 rounded-lg animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Curvy shape at the bottom
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none h-16 w-full">
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
          width="100%"
          height="100"
        >
          <path
            className="fill-background dark:fill-background"
            d="M0,0 C0,0 0,30 0,30 C120,36 240,42 360,42 C480,42 600,36 720,30 C840,24 960,18 1080,18 C1200,18 1320,24 1440,30 C1560,36 1680,42 1800,42 C1920,42 2040,36 2160,30 C2280,24 2400,18 2520,18 C2640,18 2760,24 2880,30 L2880,100 L0,100 Z"
          ></path>
        </svg>
      </div> */}
    </div>
  );
};

export default PageHeader;
