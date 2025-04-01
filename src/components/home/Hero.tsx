
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Star, 
  Users,
  Atom,
  PiIcon,
  BookOpen as BookIcon,
  Globe,
  Palette
} from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const subjects = [
  { name: "Science", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200", icon: <Atom className="h-4 w-4" /> },
  { name: "Mathematics", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200", icon: <PiIcon className="h-4 w-4" /> },
  { name: "English", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200", icon: <BookIcon className="h-4 w-4" /> },
  { name: "Social Studies", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200", icon: <Globe className="h-4 w-4" /> },
  { name: "Arts", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200", icon: <Palette className="h-4 w-4" /> }
];

const testimonials = [
  {
    quote: "DTNHS has provided my child with an excellent foundation for their future.",
    author: "Priya Sharma, Parent"
  },
  {
    quote: "The teachers here truly care about each student's success and well-being.",
    author: "Rajesh Kumar, Parent"
  },
  {
    quote: "My years at DTNHS were transformative and prepared me well for college.",
    author: "Ananya Gupta, Alumni"
  }
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImages = [
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true",
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/classroom.png?raw=true",
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-[95vh] py-12 overflow-hidden bg-white dark:bg-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-school-primary/10 dark:bg-school-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-56 h-56 bg-school-secondary/10 dark:bg-school-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        
        {/* Floating Shapes */}
        <div className="hidden lg:block">
          {/* Polygons, Circles and Other Shapes */}
          <div className="absolute top-1/4 left-1/5 w-12 h-12 transform rotate-45 bg-school-primary/10 dark:bg-school-primary/20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full border-2 border-dashed border-school-secondary/20 dark:border-school-secondary/30 animate-spin-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-10 h-10 transform rotate-12 rounded-md bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-400/20 dark:to-purple-400/20 animate-float-delayed"></div>
          <div className="absolute top-2/3 right-1/5 w-14 h-14 rounded-lg border border-green-300/20 dark:border-green-300/30 transform -rotate-12 animate-float"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-1/6 left-1/3 text-school-primary/20 dark:text-school-primary/30 animate-float-delayed transform rotate-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="absolute top-2/3 right-1/6 text-school-secondary/20 dark:text-school-secondary/30 animate-float transform -rotate-12">
            <BookOpen className="w-10 h-10" />
          </div>
          <div className="absolute bottom-1/5 left-1/5 text-blue-400/20 dark:text-blue-400/30 animate-float-delayed transform rotate-12">
            <Atom className="w-6 h-6" />
          </div>
          <div className="absolute top-1/2 right-1/3 text-green-400/20 dark:text-green-400/30 animate-float transform -rotate-6">
            <Globe className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="container relative z-20 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 pt-8 md:pt-16 pb-8">
            <AnimatedSection animation="fade-in-up" className="relative">
              <div className="absolute -left-12 -top-12 w-24 h-24 text-school-primary rotate-12 opacity-10 dark:opacity-5">
                <Star className="w-full h-full" strokeWidth={1} />
              </div>
              
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-school-primary/20 to-school-secondary/20 dark:from-school-primary/30 dark:to-school-secondary/30 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Star className="mr-2 h-4 w-4 text-school-primary" />
                <span className="text-school-primary font-medium">Excellence in Education Since 1941</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                <span className="relative inline-block">
                  <span className="relative z-10">Shaping Futures,</span>
                  <span className="absolute -bottom-1.5 left-0 w-full h-4 bg-school-primary/20 dark:bg-school-primary/30 rounded-lg -z-0"></span>
                </span>
                <span className="block mt-2">Building <span className="text-school-primary">Leaders.</span></span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Nurturing minds, building character, and creating a brighter future through quality education at Durgapur Tarak Nath High School.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-school-primary to-school-secondary hover:shadow-lg hover:shadow-school-primary/20 transition-all duration-300">
                  <Link to="/academics">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 hover:bg-background/5 hover:border-school-primary transition-all duration-300">
                  <Link to="/about">
                    <BookOpen className="mr-2 h-4 w-4" />
                    About Us
                  </Link>
                </Button>
              </div>
              
              {/* Stats Section */}
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { icon: <Users className="h-5 w-5 text-school-primary" />, value: "50+", label: "Expert Teachers" },
                  { icon: <GraduationCap className="h-5 w-5 text-school-primary" />, value: "1000+", label: "Successful Students" },
                  { icon: <Calendar className="h-5 w-5 text-school-primary" />, value: "80+", label: "Years of Excellence" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-2">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <AnimatedSection animation="fade-in-up" delay={200} className="relative perspective-1000">
              <div className="absolute -right-12 top-1/2 w-24 h-24 text-school-secondary rotate-45 opacity-10 dark:opacity-5">
                <Star className="w-full h-full" strokeWidth={1} />
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Image Carousel - Increased height for desktop */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 transform rotate-x-6 hover:rotate-x-0 hover:scale-105 bg-gradient-to-br from-school-light to-white dark:from-gray-800 dark:to-gray-900">
                  {heroImages.map((src, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <img 
                        src={src} 
                        alt="Students at DTNHS" 
                        className={`w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-[600px] xl:h-[650px] object-cover rounded-t-2xl ${isLoaded ? "blur-none" : "blur-sm"}`}
                      />
                    </div>
                  ))}
                  
                  {/* Image Carousel Navigation Dots */}
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentImage === index 
                            ? "bg-white scale-125" 
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Testimonials Tab - Improved visibility and style */}
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-b-2xl">
                    <Tabs defaultValue="testimonial-0" className="w-full">
                      <TabsList className="w-full justify-center mb-3 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-full">
                        {testimonials.map((_, i) => (
                          <TabsTrigger 
                            key={i} 
                            value={`testimonial-${i}`} 
                            className="text-xs px-3 py-1.5 data-[state=active]:bg-school-primary data-[state=active]:text-white rounded-full"
                          >
                            <span className="sr-only">Testimonial {i+1}</span>
                            <span aria-hidden="true" className="block w-1.5 h-1.5 rounded-full bg-current"></span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {testimonials.map((testimonial, i) => (
                        <TabsContent key={i} value={`testimonial-${i}`} className="mt-2">
                          <div className="text-center">
                            <p className="text-gray-700 dark:text-gray-300 italic mb-3 leading-relaxed text-base">"<span className="font-medium">{testimonial.quote}</span>"</p>
                            <p className="text-sm text-school-primary font-medium">— {testimonial.author}</p>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <h3 className="font-bold text-school-primary">Your Journey to Excellence</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Begins Here</p>
                </div>
                
                <div className="absolute -top-4 -right-4 md:-right-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <h3 className="font-bold text-school-primary">Education Beyond</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Boundaries</p>
                </div>
              </div>
              
              {/* Subject Tags */}
              <div className="mt-12 grid grid-cols-5 gap-2 max-w-md mx-auto">
                {subjects.map((subject, index) => (
                  <div 
                    key={index} 
                    className={`${subject.color} rounded-full px-3 py-1.5 text-xs text-center flex items-center justify-center gap-1 transform hover:scale-110 transition-transform`}
                  >
                    <span>{subject.icon}</span>
                    <span className="hidden sm:inline">{subject.name}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Decorative Scrolling Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
