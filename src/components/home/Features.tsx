
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Users, Building, Trophy, BookOpen, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../ui/AnimatedSection";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  index: number;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, link, index, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatedSection
      animation="fade-in-up"
      delay={index * 100}
      className="relative"
    >
      <div
        className={cn(
          "flex flex-col rounded-xl border-2 p-6 transition-all duration-500 h-full",
          isHovered ? "shadow-lg -translate-y-2" : "shadow",
          `border-${color}/20 hover:border-${color}/50 bg-gradient-to-br from-white to-${color}/5 dark:from-gray-800 dark:to-${color}/10`
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500",
          `bg-${color}/10 text-${color}`,
          isHovered && `bg-${color} text-white`
        )}>
          {icon}
        </div>
        <h3 className={cn("mb-2 text-xl font-semibold transition-colors duration-500", isHovered && `text-${color}`)}>
          {title}
        </h3>
        <p className="flex-1 text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto">
          <Button asChild variant="ghost" className={cn(
            "group p-0",
            `text-${color}`
          )}>
            <Link to={link} className="flex items-center px-4 py-2 space-x-1">
              Learn more
              <ArrowRight className={cn(
                "ml-1 h-4 w-4 transition-transform",
                isHovered ? "translate-x-1" : ""
              )} />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Academic Excellence",
      description: "Our rigorous curriculum is designed to challenge and inspire students to achieve their highest potential.",
      icon: <BookOpen className="h-6 w-6"/>,
      link: "/academics",
      color: "school-primary"
    },
    {
      title: "Experienced Faculty",
      description: "Our teachers are experienced professionals dedicated to guiding students toward academic and personal success.",
      icon: <Users className="h-6 w-6"/>,
      link: "/teachers",
      color: "purple"
    },
    {
      title: "Modern Facilities",
      description: "Our campus features state-of-the-art classrooms, labs, and sports facilities to enhance the learning experience.",
      icon: <Building className="h-6 w-6"/>,
      link: "/about",
      color: "blue"
    },
    {
      title: "Extracurricular Activities",
      description: "We offer a wide range of clubs, sports, and activities to help students develop their talents and interests.",
      icon: <Trophy className="h-6 w-6"/>,
      link: "/students",
      color: "amber"
    },
    {
      title: "Student Support",
      description: "We provide counseling, tutoring, and other support services to help students overcome challenges and achieve success.",
      icon: <HeartPulse className="h-6 w-6"/>,
      link: "/students",
      color: "rose"
    },
    {
      title: "Track Record of Success",
      description: "Our students consistently achieve excellent results in board examinations and competitive entrance tests.",
      icon: <Book className="h-6 w-6"/>,
      link: "/results",
      color: "emerald"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-school-light/20 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-school-primary/5 dark:bg-school-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-school-secondary/5 dark:bg-school-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="hidden lg:block">
          <div className="absolute top-40 left-20 w-12 h-12 rounded-full border-2 border-dashed border-school-primary/20 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-40 w-8 h-8 rounded-full bg-school-secondary/10 animate-float"></div>
        </div>
      </div>
      
      <div className="container px-4 relative z-10">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20 mb-4">
            <Trophy className="mr-1 h-4 w-4" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Why Choose Our School?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are committed to providing a supportive and challenging environment where students can thrive academically and personally.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
              index={index}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
