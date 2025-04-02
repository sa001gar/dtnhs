
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, History, School } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import { cn } from "@/lib/utils";

const AboutSchool = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-school-primary/5 dark:bg-school-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-school-secondary/5 dark:bg-school-secondary/10 blur-3xl"></div>
      </div>
      
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="fade-in-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20 mb-4">
                <History className="mr-1 h-4 w-4" />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
                Our Story Since 1941
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
                Decades of excellence in education, nurturing generations of successful students
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-12 gap-4 relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-dashed border-school-primary/30 dark:border-school-primary/40 animate-spin-slow opacity-70"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-school-secondary/10 dark:bg-school-secondary/20"></div>
                  
                  <div className="col-span-12 md:col-span-7">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs.jpg?raw=true"
                        alt="Historical School Building"
                        className="hidden md:block w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110"
                      />
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                        alt="Historical School Building"
                        className="block md:hidden w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold">Our Campus</h3>
                        <p className="text-sm text-white/90">Where learning comes to life</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_front.jfif"
                          alt="School Library"
                          className="w-full object-cover rounded-xl h-40 md:h-auto transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Main Building</h3>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/classroom.png"
                          alt="School Playground"
                          className="w-full object-cover rounded-xl h-40 md:h-auto transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Modern Classrooms</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                          alt="School Playground"
                          className="w-full object-cover rounded-xl h-40 md:h-auto transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Student Life</h3>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_sports.jpg"
                          alt="School Library"
                          className="w-full object-cover rounded-xl h-40 md:h-auto transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Sports Facilities</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true"
                        alt="Historical School Building"
                        className="w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold">School Events</h3>
                        <p className="text-sm text-white/90">Creating memories that last a lifetime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-school-secondary/10 dark:bg-school-secondary/20 rounded-full blur-md"></div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-school-primary mb-6">
                    <School className="inline-block mr-2 h-6 w-6 text-school-primary" />
                    A Legacy of Excellence
                  </h3>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Established in 1941, Durgapur Tarak Nath High School has
                      been a pillar of education in the region for over eight
                      decades. With a strong commitment to academic excellence and
                      holistic development, the school started its journey with a
                      modest beginning and has since evolved into a renowned
                      institution.
                    </p>
                    
                    <div className="p-4 bg-white/50 dark:bg-gray-800/50 border border-border rounded-lg shadow-sm">
                      <h4 className="font-medium text-school-primary mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Our Educational Philosophy
                      </h4>
                      <p className="text-sm">
                        Over the years, we have expanded our facilities and
                        curriculum to meet the changing educational needs while
                        staying true to our core values of knowledge, discipline,
                        and social responsibility.
                      </p>
                    </div>
                    
                    <p className="leading-relaxed">
                      Today, our school continues to uphold its legacy, nurturing
                      generations of students who have excelled in various fields,
                      making meaningful contributions to society.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="mt-8 relative border-l border-school-primary/20 dark:border-school-primary/30 pl-6 py-2 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-9 flex p-2 items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs">
                        1941
                      </div>
                      <h4 className="font-semibold ml-2">Establishment</h4>
                      <p className="text-sm text-muted-foreground ml-2">Founded with just 50 students and 5 teachers</p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-9 flex p-2 items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs">
                        1965
                      </div>
                      <h4 className="font-semibold ml-2">Major Expansion</h4>
                      <p className="text-sm text-muted-foreground ml-2">New building constructed, enrollment reached 500</p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-9 flex p-2 items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs">
                        2023
                      </div>
                      <h4 className="font-semibold ml-2">Modern Era</h4>
                      <p className="text-sm text-muted-foreground ml-2">New technology integration, over 1500 students</p>
                    </div>
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
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSchool;
