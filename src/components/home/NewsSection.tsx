
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../ui/AnimatedSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const newsItems = [
  {
    id: 1,
    title: "Annual Day Celebration",
    date: "June 15, 2023",
    time: "4:00 PM",
    excerpt: "Join us for our Annual Day celebration featuring cultural performances by our talented students.",
    link: "/notices",
    category: "Event",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Science Exhibition Results",
    date: "May 28, 2023",
    time: "10:00 AM",
    excerpt: "Congratulations to all participants and winners of our recent Science Exhibition.",
    link: "/notices",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1564066636936-5e8c7a472487?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "New Sports Facilities Inaugurated",
    date: "April 12, 2023",
    time: "11:30 AM",
    excerpt: "We are proud to announce the opening of our new state-of-the-art sports complex.",
    link: "/notices",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1519758965398-9970d90bbda4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    date: "March 25, 2023",
    time: "3:00 PM",
    excerpt: "Please join us for the quarterly parent-teacher meeting to discuss your child's progress.",
    link: "/notices",
    category: "Event",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
  }
];

const NewsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const filteredNews = activeFilter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category.toLowerCase() === activeFilter);
  
  const scrollCards = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' 
      ? -scrollContainerRef.current.offsetWidth / 2
      : scrollContainerRef.current.offsetWidth / 2;
      
    scrollContainerRef.current.scrollBy({ 
      left: scrollAmount, 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-school-light dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <div className="container px-4 md:px-6">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-school-primary/10 blur-xl dark:bg-school-primary/20"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-school-secondary/10 blur-xl dark:bg-school-secondary/20"></div>
          
          <div className="inline-flex items-center rounded-full bg-school-primary/10 px-3 py-1 text-sm text-school-primary dark:bg-school-primary/20 mb-4">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Stay Updated</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Latest News & Events
          </h2>
          <p className="mt-4 text-lg text-muted-foreground dark:text-gray-300">
            Stay updated with the latest happenings, announcements, and achievements at our school.
          </p>
        </AnimatedSection>

        <div className="mt-12 relative">
          {/* Category Filter Tabs - Horizontally scrollable */}
          <AnimatedSection animation="fade-in-up" delay={100} className="overflow-hidden">
            <div className="relative">
              <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveFilter}>
                <div className="flex justify-center">
                  <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full border border-gray-200 dark:border-gray-700 max-w-full overflow-x-auto hide-scrollbar flex-nowrap">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-full data-[state=active]:bg-school-primary data-[state=active]:text-white data-[state=active]:border-transparent whitespace-nowrap px-4"
                    >
                      All News
                    </TabsTrigger>
                    <TabsTrigger 
                      value="event" 
                      className="rounded-full data-[state=active]:bg-school-primary data-[state=active]:text-white data-[state=active]:border-transparent whitespace-nowrap px-4"
                    >
                      Events
                    </TabsTrigger>
                    <TabsTrigger 
                      value="academic" 
                      className="rounded-full data-[state=active]:bg-school-primary data-[state=active]:text-white data-[state=active]:border-transparent whitespace-nowrap px-4"
                    >
                      Academic
                    </TabsTrigger>
                    <TabsTrigger 
                      value="announcement" 
                      className="rounded-full data-[state=active]:bg-school-primary data-[state=active]:text-white data-[state=active]:border-transparent whitespace-nowrap px-4"
                    >
                      Announcements
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </AnimatedSection>
          
          {/* Mobile scrollable cards with navigation buttons */}
          <div className="relative">
            {isMobile && (
              <>
                <button 
                  onClick={() => scrollCards('left')} 
                  className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
                <button 
                  onClick={() => scrollCards('right')} 
                  className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
                <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
                <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
              </>
            )}
            
            <div 
              ref={scrollContainerRef}
              className={`${
                isMobile 
                  ? 'flex overflow-x-auto pb-6 gap-4 hide-scrollbar snap-x snap-mandatory scrollbar-none' 
                  : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {filteredNews.map((item, index) => (
                <AnimatedSection 
                  key={item.id} 
                  animation="fade-in-up" 
                  delay={index * 100}
                  className={isMobile ? 'min-w-[280px] w-[85%] flex-shrink-0 snap-center' : ''}
                >
                  <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full dark:border-gray-700 dark:bg-gray-800/50 overflow-hidden group">
                    {/* Card Image */}
                    <div className="relative w-full h-44 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge 
                        variant="outline" 
                        className={`
                          absolute top-4 right-4 
                          ${item.category === 'Event' ? 'bg-blue-500/80' : 
                            item.category === 'Academic' ? 'bg-green-500/80' : 'bg-amber-500/80'} 
                          text-white border-0 backdrop-blur-sm
                        `}
                      >
                        {item.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 text-white flex items-center text-sm">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {item.date}
                      </div>
                    </div>
                    
                    <CardHeader className="pt-4 pb-2">
                      <CardTitle className="line-clamp-2 dark:text-white">{item.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <CardDescription className="text-base dark:text-gray-300 line-clamp-3">{item.excerpt}</CardDescription>
                      <div className="flex items-center mt-3 text-xs text-muted-foreground dark:text-gray-400">
                        <Clock className="mr-1 h-3 w-3" />
                        {item.time}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        asChild 
                        variant="ghost" 
                        className="group -ml-3 h-8 p-0 text-school-primary dark:text-school-primary hover:text-school-primary/80 dark:hover:text-school-primary/80 hover:bg-transparent"
                      >
                        <Link to={item.link} className="flex items-center px-4 py-3 space-x-1 transition-all">  
                          Read more
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection animation="fade-in-up" delay={300} className="mt-12 text-center">
            <Button 
              asChild 
              className="rounded-full bg-white dark:bg-gray-800 text-school-primary dark:text-school-primary border border-school-primary/20 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/notices">
                View All News & Notices
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
