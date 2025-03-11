
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-school-light py-16 md:py-24">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center bg-no-repeat opacity-5"></div>
      
      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter text-school-primary sm:text-5xl md:text-6xl">
              Durgapur Tarak Nath High School
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={100}>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Nurturing minds, building character, and creating a brighter future through quality education since 1965.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={200}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full px-8">
                <Link to="/about">
                  Discover Our School
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection animation="fade-in-up" delay={300} className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-school-primary/10 text-school-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Academic Excellence</h3>
              <p className="text-muted-foreground">Consistently achieving outstanding results with a focus on holistic development.</p>
            </div>
            
            <div className="glass rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-school-primary/10 text-school-primary">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Modern Facilities</h3>
              <p className="text-muted-foreground">State-of-the-art infrastructure designed to enhance the learning experience.</p>
            </div>
            
            <div className="glass rounded-xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-school-primary/10 text-school-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Dedicated Faculty</h3>
              <p className="text-muted-foreground">Experienced teachers committed to bringing out the best in every student.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
