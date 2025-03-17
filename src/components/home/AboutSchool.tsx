
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const AboutSchool = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with clip path */}
      <div 
        className="absolute inset-0 bg-muted/30 -z-10"
        style={{
          clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
        }}
      ></div>
      
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-school-primary/5 -z-5"
        style={{
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      ></div>
      
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 bg-school-secondary/5 -z-5"
        style={{
          clipPath: "polygon(0 100%, 0 0, 100% 100%)",
        }}
      ></div>
      
      <div className="container px-4 relative">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="fade-in-up">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs.jpg?raw=true"
                        alt="Historical School Building"
                        className="hidden md:block w-full h-full object-cover"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                        }}
                      />
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                        alt="Historical School Building"
                        className="block md:hidden w-full h-full object-cover rounded-xl"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_front.jfif"
                          alt="School Library"
                          className="w-full object-cover h-40 md:h-auto"
                          style={{
                            clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
                          }}
                        />
                      </div>
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/classroom.png"
                          alt="School Playground"
                          className="w-full object-cover h-40 md:h-auto"
                          style={{
                            clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                          alt="School Playground"
                          className="w-full object-cover h-40 md:h-auto"
                          style={{
                            clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)",
                          }}
                        />
                      </div>
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_sports.jpg"
                          alt="School Library"
                          className="w-full object-cover h-40 md:h-auto"
                          style={{
                            clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <div className="overflow-hidden rounded-xl shadow-lg">
                      <img
                        src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true"
                        alt="Historical School Building"
                        className="w-full h-full object-cover"
                        style={{
                          clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative">
                  {/* Title background with clip path */}
                  <div 
                    className="absolute -left-4 -top-4 w-2/3 h-16 bg-gradient-to-r from-school-primary/10 to-school-secondary/10 -z-10"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                    }}
                  ></div>
                  
                  <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl mb-6 relative">
                    Our Story Since 1941
                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-school-secondary"></div>
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground relative">
                  {/* Text container with subtle clip path */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-school-primary/5 to-school-secondary/5 -z-10 rounded-lg"
                    style={{
                      clipPath: "polygon(0 5%, 100% 0, 97% 95%, 3% 100%)",
                    }}
                  ></div>
                  
                  <p className="relative z-10 p-2">
                    Established in 1941, Durgapur Tarak Nath High School has
                    been a pillar of education in the region for over eight
                    decades. With a strong commitment to academic excellence and
                    holistic development, the school started its journey with a
                    modest beginning and has since evolved into a renowned
                    institution.
                  </p>
                  <p className="relative z-10 p-2">
                    Over the years, we have expanded our facilities and
                    curriculum to meet the changing educational needs while
                    staying true to our core values of knowledge, discipline,
                    and social responsibility.
                  </p>
                  <p className="relative z-10 p-2">
                    Today, our school continues to uphold its legacy, nurturing
                    generations of students who have excelled in various fields,
                    making meaningful contributions to society.
                  </p>
                </div>

                <div className="mt-8">
                  <Button asChild className="group relative overflow-hidden">
                    <Link to="/about" className="flex items-center z-10">
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
