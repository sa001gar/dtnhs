
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "../ui/AnimatedSection";
import { Breadcrumb } from "./Breadcrumb";
import { SquareRounded } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
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
  className,
  children,
  showBreadcrumbs = true,
  small = false,
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-r from-school-primary to-school-secondary py-16",
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

      <div className="container relative z-10 flex items-center justify-between px-4">
        <div className="text-left">
          {showBreadcrumbs && (
            <AnimatedSection animation="fade-in-up" className="mb-4">
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
            <div className="absolute inset-0 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <SquareRounded className="h-16 w-16 stroke-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
