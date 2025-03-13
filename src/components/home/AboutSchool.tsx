
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const AboutSchool = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="fade-in-up">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7">
                    <img 
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" 
                      alt="Historical School Building" 
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-5">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
                      alt="School Library" 
                      className="w-full h-full object-cover rounded-xl shadow-lg mb-4"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" 
                      alt="School Playground" 
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl mb-6">Our Story Since 1965</h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Established in 1965, Durgapur Tarak Nath High School has been a cornerstone of educational excellence in the region for over five decades. Founded by visionary educator Mr. Tarak Nath Roy, the school began with just 5 classrooms and 120 students.
                  </p>
                  <p>
                    Through the years, we've grown into a premier educational institution with state-of-the-art facilities while maintaining our core values of academic excellence, character development, and social responsibility.
                  </p>
                  <p>
                    Today, our school stands as a testament to our founder's vision, having educated thousands of students who have gone on to excel in various fields across the globe.
                  </p>
                </div>
                
                <div className="mt-8">
                  <Button asChild className="group">
                    <Link to="/about" className="flex items-center">
                      Explore Our Full History 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSchool;
