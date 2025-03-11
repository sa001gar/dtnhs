
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-up" | "slide-in-right" | "slide-in-left" | "scale-in" | "blur-in";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.2,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-all duration-700",
        {
          "opacity-0": !isVisible,
          "opacity-100": isVisible,
          "translate-y-8": !isVisible && animation === "fade-in-up",
          "translate-y-0": isVisible && animation === "fade-in-up",
          "translate-x-8": !isVisible && animation === "slide-in-right",
          "translate-x-0": isVisible && animation === "slide-in-right",
          "translate-x-(-8)": !isVisible && animation === "slide-in-left",
          "scale-95": !isVisible && animation === "scale-in",
          "scale-100": isVisible && animation === "scale-in",
          "[filter:blur(8px)]": !isVisible && animation === "blur-in",
          "[filter:blur(0)]": isVisible && animation === "blur-in",
        },
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
