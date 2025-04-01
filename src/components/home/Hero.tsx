
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Users, BookOpen, Star } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

const subjects = [
  { name: "Science", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" },
  { name: "Mathematics", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200" },
  { name: "English", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200" },
  { name: "Social Studies", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200" },
  { name: "Arts", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200" }
];

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] py-12 overflow-hidden bg-white dark:bg-gray-900">
      <div className="container relative z-20 px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Left Side - Content */}
          <div className="w-full md:w-1/2 pt-8 md:pt-16 pb-8 md:pr-12">
            <AnimatedSection animation="fade-in-up" className="relative">
              <div className="absolute -left-12 -top-12 w-24 h-24 text-school-primary rotate-12 opacity-10 dark:opacity-5">
                <Star className="w-full h-full" strokeWidth={1} />
              </div>
              
              {/* Search Bar */}
              <div className="max-w-md mb-8 hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 pl-4">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search courses, programs..."
                  className="bg-transparent border-none focus:outline-none text-sm flex-grow px-3 text-gray-700 dark:text-gray-300"
                />
                <Button size="sm" className="rounded-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-4 inline-flex items-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20">
                <Star className="mr-1 h-3.5 w-3.5" />
                <span>Excellence in Education Since 1941</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Connecting Students to
                <span className="relative">
                  <span className="block mt-2 relative z-10 text-school-primary">a World of Knowledge.</span>
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-school-primary/20 dark:bg-school-primary/30 rounded-lg -z-0"></span>
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Nurturing minds, building character, and creating a brighter future through quality education at Durgapur Tarak Nath High School.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Button asChild size="lg" className="rounded-full px-8 bg-school-primary hover:bg-school-primary/90">
                  <Link to="/academics">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/about">
                    <BookOpen className="mr-2 h-4 w-4" />
                    About Us
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-school-primary/20 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <Users className="h-4 w-4 text-school-primary" />
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <span className="font-medium text-gray-900 dark:text-white">50+ Expert Teachers</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <AnimatedSection animation="fade-in-up" delay={200} className="relative">
              <div className="absolute -right-12 top-1/2 w-24 h-24 text-school-secondary rotate-45 opacity-10 dark:opacity-5">
                <Star className="w-full h-full" strokeWidth={1} />
              </div>
              
              <div className="relative bg-gradient-to-br from-school-light to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6">
                <img 
                  src="https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true" 
                  alt="Students" 
                  className="w-full h-auto rounded-2xl object-cover shadow-lg"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                  <h3 className="font-bold text-school-primary">Your Journey to Excellence</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Begins Here</p>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                  <h3 className="font-bold text-school-primary">Education Beyond</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Boundaries</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-2">
                {subjects.slice(0, 3).map((subject, index) => (
                  <div key={index} className={`${subject.color} rounded-full px-3 py-1 text-xs text-center`}>
                    {subject.name}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-school-primary/10 rounded-full dark:bg-school-primary/5 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-school-secondary/10 rounded-full dark:bg-school-secondary/5 blur-xl"></div>
      </div>
    </section>
  );
};

export default Hero;
