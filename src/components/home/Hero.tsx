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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fixed image URLs with placeholder fallbacks
  const heroImages = [
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true",
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/classroom.png?raw=true",
    "https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true"
  ];

  // Preload images
  useEffect(() => {
    // Load original images if available
    const originalImages = [
      "https://github.com/sa001gar/dtnhs/blob/main/images/home/2024-09-13.jpg?raw=true",
      "https://github.com/sa001gar/dtnhs/blob/main/images/home/classroom.png?raw=true",
      "https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true"
    ];
    
    // Try to preload original images
    originalImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        // If original image loads, use it
        heroImages[index] = src;
        setIsLoaded(true);
      };
      img.src = src;
    });

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <section className="relative min-h-[95vh] py-12 overflow-hidden bg-white dark:bg-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-school-primary/10 dark:bg-school-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-56 h-56 bg-school-secondary/10 dark:bg-school-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        
        {/* Floating Shapes - Simplified and Reduced */}
        <div className="hidden lg:block">
          <div className="absolute top-1/4 left-1/5 w-12 h-12 transform rotate-45 bg-school-primary/10 dark:bg-school-primary/20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full border-2 border-dashed border-school-secondary/20 dark:border-school-secondary/30 animate-spin-slow"></div>
          
          {/* Floating Icons - Only kept a few */}
          <div className="absolute top-1/6 left-1/3 text-school-primary/20 dark:text-school-primary/30 animate-float-delayed transform rotate-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="absolute top-2/3 right-1/6 text-school-secondary/20 dark:text-school-secondary/30 animate-float transform -rotate-12">
            <BookOpen className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="container relative z-20 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12 lg:gap-16">
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
                  {/* Removed the underline element */}
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
          
          {/* Right Side - Image and Testimonials */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <AnimatedSection animation="fade-in-up" delay={200} className="relative perspective-1000">
              <div className="absolute -right-12 top-1/2 w-24 h-24 text-school-secondary rotate-45 opacity-10 dark:opacity-5">
                <Star className="w-full h-full" strokeWidth={1} />
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Image Carousel - Fixed visibility issues */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform hover:scale-105 bg-gradient-to-br from-school-light to-white dark:from-gray-800 dark:to-gray-900" style={{height: "320px"}}>
                  {heroImages.map((src, index) => (
                    <div 
                      key={index} 
                      className={`transition-opacity duration-1000 ease-in-out ${
                        currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "block"
                      }}
                    >
                      <img 
                        src={src} 
                        alt={`Students at DTNHS ${index + 1}`} 
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{opacity: isLoaded ? 1 : 0.7}}
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
                </div>
                
                {/* Testimonials Section */}
                <div className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-b-2xl shadow-lg">
                  <div className="relative overflow-hidden" style={{minHeight: "100px"}}>
                    {testimonials.map((testimonial, i) => (
                      <div
                        key={i}
                        className={`transition-all duration-500 ${
                          currentTestimonial === i
                            ? "opacity-100 transform translate-y-0"
                            : "opacity-0 absolute inset-0 transform translate-y-8"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="text-center w-full">
                            <p className="text-gray-700 dark:text-gray-300 italic mb-3 leading-relaxed text-base">
                              "{testimonial.quote}"
                            </p>
                            <p className="text-sm text-school-primary font-medium">— {testimonial.author}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentTestimonial === index
                            ? "bg-school-primary scale-125"
                            : "bg-gray-300 dark:bg-gray-600 hover:bg-school-primary/70"
                        }`}
                        aria-label={`View testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 md:-left-10 bg-orange-100 dark:bg-amber-950 rounded-2xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <h3 className="font-bold text-school-primary">Your Journey to Excellence</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Begins Here</p>
                </div>
                
                <div className="absolute -top-4 -right-4 md:-right-8 bg-lime-100 dark:bg-green-900 rounded-2xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <h3 className="font-bold text-school-primary">Education Beyond</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Boundaries</p>
                </div>
              </div>
              
              {/* Subject Tags - Improved styling and responsiveness */}
              <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-md mx-auto">
                {subjects.map((subject, index) => (
                  <div 
                    key={index} 
                    className={`${subject.color} rounded-full px-4 py-2 text-sm flex items-center justify-center gap-2 transform hover:scale-110 transition-transform shadow-sm`}
                  >
                    <span className="flex-shrink-0">{subject.icon}</span>
                    <span className="hidden sm:inline font-medium">{subject.name}</span>
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