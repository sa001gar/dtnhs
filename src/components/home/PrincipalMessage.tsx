
import React from "react";
import { Link } from "react-router-dom";
import { Quote, Medal, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/CustomCard";

const PrincipalMessage: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-school-primary/5 dark:from-gray-900 dark:to-gray-800/90 dark:text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-school-primary/5 dark:bg-school-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-school-secondary/5 dark:bg-school-secondary/10 rounded-full blur-3xl"></div>
        
        {/* Floating elements */}
        <div className="hidden lg:block">
          <div className="absolute top-20 right-20 w-12 h-12 rounded-full border-2 border-dashed border-school-primary/20 dark:border-school-primary/30 animate-spin-slow"></div>
          <div className="absolute top-1/4 left-1/5 w-16 h-16 transform rotate-45 bg-school-primary/10 dark:bg-school-primary/20 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-8 h-8 rounded-full bg-school-secondary/10 dark:bg-school-secondary/20 animate-float-delayed"></div>
        </div>
      </div>
      
      <div className="container px-4 relative z-10">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20 mb-4">
            <Quote className="mr-1 h-4 w-4" />
            <span>Message From Principal</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Our Vision & Words of Wisdom
          </h2>
          <p className="mt-4 text-lg text-muted-foreground dark:text-gray-300">
            Guiding our students on the path of knowledge, character, and excellence.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Principal's Image Column */}
          <AnimatedSection animation="fade-in-up" delay={100} className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Profile Image With Decorative Elements */}
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-br from-school-primary/20 to-school-secondary/20 dark:from-school-primary/30 dark:to-school-secondary/30 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-br from-school-secondary/20 to-school-primary/20 dark:from-school-secondary/30 dark:to-school-primary/30 blur-xl"></div>
                
                <div className="relative group rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <img 
                    src="/lovable-uploads/7aaf29d0-9d50-40ab-a4a1-4cef49f51b82.png" 
                    alt="Principal of Durgapur Tarak Nath High School"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Name Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-bold text-xl">Dr. Sunil Kumar</h3>
                        <p className="text-white/90 text-sm">Principal</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700 animate-pulse">
                  <Medal className="h-6 w-6 text-amber-500" />
                </div>
                
                <div className="absolute -bottom-2 -left-2 bg-gradient-to-br from-school-primary to-school-secondary text-white rounded-full shadow-lg p-2 flex items-center justify-center animate-float">
                  <Star className="h-5 w-5" />
                </div>
              </div>
              
              {/* Additional Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto">
                <Card className="text-center p-4 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 hover:border-school-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h4 className="font-bold text-xl text-school-primary">25+</h4>
                  <p className="text-sm text-muted-foreground">Years of Experience</p>
                </Card>
                <Card className="text-center p-4 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 hover:border-school-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h4 className="font-bold text-xl text-school-primary">Ph.D</h4>
                  <p className="text-sm text-muted-foreground">in Education</p>
                </Card>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Message Column */}
          <AnimatedSection animation="fade-in-up" delay={200} className="lg:col-span-7 order-1 lg:order-2">
            <Card className="relative glass p-8 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Quote decoration */}
              <div className="absolute -top-4 -left-4 text-school-primary/10 dark:text-school-primary/5">
                <Quote className="h-24 w-24" strokeWidth={1} />
              </div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-school-primary mb-6">Dear Students and Parents,</h3>
                
                <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  Welcome to Durgapur Tarak Nath High School, a place where excellence in education meets character development. For over eight decades, our institution has been committed to nurturing young minds into responsible citizens and future leaders.
                </p>
                
                <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  At DTNHS, we believe education goes beyond textbooks. Our holistic approach focuses on academic rigor, moral values, creative pursuits, and physical fitness. Every child is unique, and we strive to discover and nurture their individual talents.
                </p>
                
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  We are proud of our rich heritage and the achievements of our alumni who have excelled in various fields. As we move forward, we remain dedicated to our motto: "Knowledge, Character, Excellence."
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-school-primary to-school-secondary flex items-center justify-center text-white text-lg font-bold">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Sunil Kumar</p>
                      <p className="text-sm text-muted-foreground">Principal, DTNHS</p>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="group border-school-primary text-school-primary hover:bg-school-primary hover:text-white">
                    <Link to="/about" className="flex items-center">
                      Read Full Message
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                {
                  quote: "Our principal's vision has transformed our school into a center of excellence and innovation.",
                  author: "Parent Association",
                  stars: 5
                },
                {
                  quote: "His leadership inspires both students and teachers to strive for their best every day.",
                  author: "Teaching Staff",
                  stars: 5
                }
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-in-up" delay={300 + (i * 100)} className="flex">
                  <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex-1 hover:border-school-primary/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex gap-1 mb-2">
                      {[...Array(item.stars)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-3">"{item.quote}"</p>
                    <p className="text-xs font-medium text-school-primary">— {item.author}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
