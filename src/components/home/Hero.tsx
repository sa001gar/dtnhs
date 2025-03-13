
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true" 
          alt="School Building" 
          className="w-full  object-cover opacity-30 dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm" />
      </div>
      
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter text-school-primary sm:text-5xl md:text-6xl lg:text-7xl">
              Durgapur Tarak Nath High School
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={100}>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Nurturing minds, building character, and creating a brighter future through quality education since 1941.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={200}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full px-8 bg-school-primary hover:bg-school-primary/90 text-white">
                <Link to="/about">
                  Discover Our School
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8 border-school-primary text-school-primary hover:bg-school-primary/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
