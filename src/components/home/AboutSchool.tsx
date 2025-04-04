import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, History, School, Loader2 } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import { cn } from "@/lib/utils";

const AboutSchool = () => {
  const [imagesLoaded, setImagesLoaded] = useState({
    main: false,
    building: false,
    classroom: false,
    student: false,
    sports: false,
    events: false
  });

  const handleImageLoad = (imageName) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-school-primary/5 dark:bg-school-primary/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-school-secondary/5 dark:bg-school-secondary/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-school-primary/3 dark:bg-school-primary/5 blur-2xl"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="fade-in-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20 mb-4 transition-all duration-300 hover:bg-school-primary/20 dark:hover:bg-school-primary/30">
                <History className="mr-1 h-4 w-4" />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl lg:text-6xl">
                Our Story Since 1941
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
                Decades of excellence in education, nurturing generations of successful students
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-12 gap-4 relative">
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-dashed border-school-primary/30 dark:border-school-primary/40 animate-spin-slow opacity-70"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-school-secondary/10 dark:bg-school-secondary/20"></div>
                  
                  <div className="col-span-12 md:col-span-7">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl h-full">
                      {!imagesLoaded.main && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                          <Loader2 className="h-8 w-8 animate-spin text-school-primary" />
                        </div>
                      )}
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs.jpg?raw=true"
                        alt="Historical School Building"
                        className={cn(
                          "hidden md:block w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110",
                          !imagesLoaded.main && "opacity-0"
                        )}
                        onLoad={() => handleImageLoad('main')}
                      />
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                        alt="Historical School Building"
                        className={cn(
                          "block md:hidden w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110",
                          !imagesLoaded.main && "opacity-0"
                        )}
                        onLoad={() => handleImageLoad('main')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-lg">Our Campus</h3>
                        <p className="text-sm text-white/90">Where learning comes to life</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4 h-full">
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        {!imagesLoaded.building && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                            <Loader2 className="h-6 w-6 animate-spin text-school-primary" />
                          </div>
                        )}
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_front.jfif"
                          alt="School Library"
                          className={cn(
                            "w-full object-cover rounded-xl h-40 md:h-36 lg:h-44 transition-transform duration-1000 group-hover:scale-110",
                            !imagesLoaded.building && "opacity-0"
                          )}
                          onLoad={() => handleImageLoad('building')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Main Building</h3>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        {!imagesLoaded.classroom && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                            <Loader2 className="h-6 w-6 animate-spin text-school-primary" />
                          </div>
                        )}
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/classroom.png"
                          alt="School Classroom"
                          className={cn(
                            "w-full object-cover rounded-xl h-40 md:h-36 lg:h-44 transition-transform duration-1000 group-hover:scale-110",
                            !imagesLoaded.classroom && "opacity-0"
                          )}
                          onLoad={() => handleImageLoad('classroom')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Modern Classrooms</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4 h-full">
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        {!imagesLoaded.student && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                            <Loader2 className="h-6 w-6 animate-spin text-school-primary" />
                          </div>
                        )}
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                          alt="Student Life"
                          className={cn(
                            "w-full object-cover rounded-xl h-40 md:h-36 lg:h-44 transition-transform duration-1000 group-hover:scale-110",
                            !imagesLoaded.student && "opacity-0"
                          )}
                          onLoad={() => handleImageLoad('student')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Student Life</h3>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl">
                        {!imagesLoaded.sports && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                            <Loader2 className="h-6 w-6 animate-spin text-school-primary" />
                          </div>
                        )}
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_sports.jpg"
                          alt="Sports Facilities"
                          className={cn(
                            "w-full object-cover rounded-xl h-40 md:h-36 lg:h-44 transition-transform duration-1000 group-hover:scale-110",
                            !imagesLoaded.sports && "opacity-0"
                          )}
                          onLoad={() => handleImageLoad('sports')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold">Sports Facilities</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl h-full">
                      {!imagesLoaded.events && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/40">
                          <Loader2 className="h-8 w-8 animate-spin text-school-primary" />
                        </div>
                      )}
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true"
                        alt="School Events"
                        className={cn(
                          "w-full h-full object-cover rounded-xl transition-transform duration-1000 group-hover:scale-110",
                          !imagesLoaded.events && "opacity-0"
                        )}
                        onLoad={() => handleImageLoad('events')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-lg">School Events</h3>
                        <p className="text-sm text-white/90">Creating memories that last a lifetime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative p-1">
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-school-secondary/10 dark:bg-school-secondary/20 rounded-full blur-md"></div>
                  <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-school-primary/5 dark:bg-school-primary/10 rounded-full blur-sm"></div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-school-primary mb-6 flex items-center">
                    <School className="mr-3 h-7 w-7 text-school-primary" />
                    A Legacy of Excellence
                  </h3>

                  <div className="space-y-6 text-muted-foreground">
                    <p className="leading-relaxed text-base md:text-lg">
                      Established in 1941, Durgapur Tarak Nath High School has
                      been a pillar of education in the region for over eight
                      decades. With a strong commitment to academic excellence and
                      holistic development, the school started its journey with a
                      modest beginning and has since evolved into a renowned
                      institution.
                    </p>
                    
                    <div className="p-5 bg-white/50 dark:bg-gray-800/50 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-medium text-school-primary mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Our Educational Philosophy
                      </h4>
                      <p className="text-sm md:text-base">
                        Over the years, we have expanded our facilities and
                        curriculum to meet the changing educational needs while
                        staying true to our core values of knowledge, discipline,
                        and social responsibility.
                      </p>
                    </div>
                    
                    <p className="leading-relaxed text-base md:text-lg">
                      Today, our school continues to uphold its legacy, nurturing
                      generations of students who have excelled in various fields,
                      making meaningful contributions to society.
                    </p>
                  </div>

                  {/* Enhanced Timeline */}
                  <div className="mt-10 relative border-l-2 border-school-primary/30 dark:border-school-primary/40 pl-8 py-2 space-y-10">
                    <div className="relative timeline-item">
                      <div className="absolute -left-12 flex items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs shadow-md">
                        1941
                      </div>
                      <div className="absolute -left-12 w-12 h-12 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-sm"></div>
                      <h4 className="font-semibold text-lg text-school-primary">Establishment</h4>
                      <p className="text-sm md:text-base text-muted-foreground">Founded with just 50 students and 5 teachers</p>
                    </div>
                    
                    <div className="relative timeline-item">
                      <div className="absolute -left-12 flex items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs shadow-md">
                        1965
                      </div>
                      <div className="absolute -left-12 w-12 h-12 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-sm"></div>
                      <h4 className="font-semibold text-lg text-school-primary">Major Expansion</h4>
                      <p className="text-sm md:text-base text-muted-foreground">New building constructed, enrollment reached 500</p>
                    </div>
                    
                    <div className="relative timeline-item">
                      <div className="absolute -left-12 flex items-center justify-center w-8 h-8 rounded-full bg-school-primary text-white text-xs shadow-md">
                        2023
                      </div>
                      <div className="absolute -left-12 w-12 h-12 bg-school-primary/10 dark:bg-school-primary/20 rounded-full blur-sm"></div>
                      <h4 className="font-semibold text-lg text-school-primary">Modern Era</h4>
                      <p className="text-sm md:text-base text-muted-foreground">New technology integration, over 1500 students</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Button asChild variant="default" className="group bg-school-primary hover:bg-school-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300">
                      <Link to="/about" className="flex items-center px-6 py-2">
                        Explore Our Full History
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
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