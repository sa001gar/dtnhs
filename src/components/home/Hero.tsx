
import React from "react";
import { ArrowRight, Play, Users, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";

const Hero = () => {
  const stats = [
    { label: "Students", value: "1000+", icon: Users },
    { label: "Years of Excellence", value: "80+", icon: Award },
    { label: "Subjects", value: "15+", icon: BookOpen },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-red-50/40 dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-800/60">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-school-primary/20 to-school-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-school-secondary/15 to-school-primary/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-school-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-school-secondary rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <AnimatedSection animation="fade-in-up">
                <div className="inline-flex items-center rounded-full bg-school-primary/10 backdrop-blur-sm px-4 py-2 mb-6 border border-school-primary/20">
                  <Award className="h-4 w-4 mr-2 text-school-primary" />
                  <span className="text-sm font-medium text-school-primary">
                    Excellence in Education Since 1941
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-up" delay={100}>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                  <span className="block">Welcome to</span>
                  <span className="block bg-gradient-to-r from-school-primary to-school-secondary bg-clip-text text-transparent">
                    DTNHS
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-up" delay={200}>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Durgapur Tarak Nath High School has been nurturing young minds for over 8 decades. 
                  Join us in our mission to provide quality education and shape the leaders of tomorrow.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-up" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-school-primary hover:bg-school-primary/90 text-white shadow-lg hover:shadow-xl transition-all rounded-full group">
                    <Link to="/admissions" className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-school-primary text-school-primary hover:bg-school-primary hover:text-white transition-all rounded-full group">
                    <Link to="/about" className="flex items-center gap-2">
                      <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      Learn More
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection animation="fade-in-up" delay={400}>
                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200/60 dark:border-gray-700/60">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <stat.icon className="h-6 w-6 text-school-primary" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right content - Image */}
            <div className="relative">
              <AnimatedSection animation="fade-in-right" delay={200}>
                <div className="relative perspective-1000">
                  {/* Main image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img 
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" 
                      alt="DTNHS School Building" 
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-school-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 animate-float">
                    <BookOpen className="h-8 w-8 text-school-primary" />
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-school-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 animate-float-delayed">
                    <Award className="h-6 w-6 text-school-secondary" />
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-1/4 -right-8 w-4 h-4 bg-school-primary/40 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 -left-8 w-3 h-3 bg-school-secondary/40 rounded-full animate-pulse delay-500"></div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatedSection animation="fade-in-up" delay={600}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-school-primary/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-school-primary/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Hero;
