
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glassEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  glassEffect = false,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        glassEffect && "glass",
        hoverEffect && "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  as: Component = "h3",
}) => {
  return (
    <Component className={cn("text-xl font-semibold tracking-tight", className)}>
      {children}
    </Component>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={cn("mt-4 flex items-center", className)}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
