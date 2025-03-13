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
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs.jpg?raw=true"
                      alt="Historical School Building"
                      className="hidden md:block w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <img
                      src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                      alt="Historical School Building"
                      className="block md:hidden w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_front.jfif"
                        alt="School Library"
                        className="w-full object-cover rounded-xl shadow-lg h-40 md:h-auto"
                      />
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/classroom.png"
                        alt="School Playground"
                        className="w-full object-cover rounded-xl shadow-lg h-40 md:h-auto"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-4">
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_child.jfif"
                        alt="School Playground"
                        className="w-full object-cover rounded-xl shadow-lg h-40 md:h-auto"
                      />
                      <img
                        src="https://raw.githubusercontent.com/sa001gar/dtnhs/refs/heads/main/images/home/dtnhs_sports.jpg"
                        alt="School Library"
                        className="w-full object-cover rounded-xl shadow-lg h-40 md:h-auto"
                      />
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <img
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true"
                      alt="Historical School Building"
                      className="hidden md:block w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <img
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true"
                      alt="Historical School Building"
                      className="block md:hidden w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>


                </div>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl mb-6">
                  Our Story Since 1941
                </h2>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Established in 1941, Durgapur Tarak Nath High School has
                    been a pillar of education in the region for over eight
                    decades. With a strong commitment to academic excellence and
                    holistic development, the school started its journey with a
                    modest beginning and has since evolved into a renowned
                    institution.
                  </p>
                  <p>
                    Over the years, we have expanded our facilities and
                    curriculum to meet the changing educational needs while
                    staying true to our core values of knowledge, discipline,
                    and social responsibility.
                  </p>
                  <p>
                    Today, our school continues to uphold its legacy, nurturing
                    generations of students who have excelled in various fields,
                    making meaningful contributions to society.
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
