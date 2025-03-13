
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "../ui/AnimatedSection";
import { Breadcrumb } from "./Breadcrumb";

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
        "relative flex w-full items-center justify-center overflow-hidden py-16",
        small ? "min-h-[180px] md:min-h-[220px]" : "min-h-[240px] md:min-h-[320px]",
        patternClasses[pattern],
        className
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-school-primary/20 backdrop-blur-sm"></div>
        </div>
      )}

      <div className="container relative z-10 px-4 text-center">
        {showBreadcrumbs && (
          <AnimatedSection animation="fade-in-up" className="mb-8">
            <Breadcrumb className="justify-center" />
          </AnimatedSection>
        )}
        
        <AnimatedSection animation="fade-in-up">
          <h1 className={cn(
            "text-3xl font-bold tracking-tighter md:text-5xl",
            backgroundImage ? "text-white" : "text-foreground"
          )}>
            {title}
          </h1>
        </AnimatedSection>
        
        {subtitle && (
          <AnimatedSection animation="fade-in-up" delay={100}>
            <p className={cn(
              "mx-auto mt-4 max-w-3xl text-lg",
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          </AnimatedSection>
        )}

        {description && (
          <AnimatedSection animation="fade-in-up" delay={100}>
            <p className={cn(
              "mx-auto mt-4 max-w-3xl text-lg",
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            )}>
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
    </div>
  );
};

export default PageHeader;
