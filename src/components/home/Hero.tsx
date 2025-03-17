
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true" 
          alt="School Building" 
          className="w-full h-full object-cover opacity-30 dark:opacity-25"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/20 backdrop-blur-sm"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
          }}
        />
      </div>
      
      {/* Decorative Element - Left */}
      <div 
        className="absolute left-0 top-0 w-64 h-64 bg-gradient-to-br from-school-primary/30 to-school-secondary/10 -z-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 70%)",
          backdropFilter: "blur(40px)",
        }}
      />
      
      {/* Decorative Element - Right */}
      <div 
        className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tl from-school-secondary/30 to-school-primary/10 -z-10"
        style={{
          clipPath: "polygon(100% 100%, 0 100%, 20% 0, 100% 30%)",
          backdropFilter: "blur(40px)",
        }}
      />
      
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-school-primary to-school-secondary bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
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
              <Button 
                asChild 
                size="lg" 
                className="h-12 rounded-full px-8 bg-gradient-to-r from-school-primary to-school-secondary hover:opacity-90 text-white shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                }}
              >
                <Link to="/about">
                  Discover Our School
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="h-12 rounded-full px-8 border-school-primary text-school-primary hover:bg-school-primary/10 shadow-md overflow-hidden relative"
              >
                <Link to="/contact" className="z-10 relative">
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-school-primary/10 to-school-secondary/10 -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="currentColor" 
            fillOpacity="0.1" 
            className="text-school-primary"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
