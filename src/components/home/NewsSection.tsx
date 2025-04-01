
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../ui/AnimatedSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const newsItems = [
  {
    id: 1,
    title: "Annual Day Celebration",
    date: "June 15, 2023",
    time: "4:00 PM",
    excerpt: "Join us for our Annual Day celebration featuring cultural performances by our talented students.",
    link: "/notices",
    category: "Event"
  },
  {
    id: 2,
    title: "Science Exhibition Results",
    date: "May 28, 2023",
    time: "10:00 AM",
    excerpt: "Congratulations to all participants and winners of our recent Science Exhibition.",
    link: "/notices",
    category: "Academic"
  },
  {
    id: 3,
    title: "New Sports Facilities Inaugurated",
    date: "April 12, 2023",
    time: "11:30 AM",
    excerpt: "We are proud to announce the opening of our new state-of-the-art sports complex.",
    link: "/notices",
    category: "Announcement"
  }
];

const NewsSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-gradient-to-br from-white to-school-light py-16 md:py-24 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Latest News & Events
          </h2>
          <p className="mt-4 text-lg text-muted-foreground dark:text-gray-300">
            Stay updated with the latest happenings, announcements, and achievements at our school.
          </p>
        </AnimatedSection>

        <div className="mt-12 relative">
          {isMobile && (
            <div className="absolute right-0 top-1/2 z-10 h-12 w-8 -translate-y-1/2 bg-gradient-to-l from-white dark:from-gray-800 to-transparent"></div>
          )}
          
          <div className={`${isMobile ? 'flex overflow-x-auto pb-6 gap-4 hide-scrollbar' : 'grid grid-cols-1 gap-6 md:grid-cols-3'}`}>
            {newsItems.map((item, index) => (
              <AnimatedSection 
                key={item.id} 
                animation="fade-in-up" 
                delay={index * 100}
                className={isMobile ? 'min-w-[300px] w-[85%] flex-shrink-0' : ''}
              >
                <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full dark:border-gray-700 dark:bg-gray-800/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                        <Calendar className="mr-2 h-4 w-4" />
                        {item.date}
                      </div>
                      <Badge variant="outline" className="bg-school-primary/10 text-school-primary dark:bg-school-primary/20 dark:text-school-primary">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base dark:text-gray-300">{item.excerpt}</CardDescription>
                    <div className="flex items-center mt-4 text-xs text-muted-foreground dark:text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.time}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="group -ml-3 h-8 p-0 text-school-primary dark:text-school-primary dark:hover:text-white">
                      <Link to={item.link} className="flex items-center px-4 py-3 space-x-1 transition-transform">  
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

        <AnimatedSection animation="fade-in-up" delay={300} className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
            <Link to="/notices">
              View All News & Notices
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NewsSection;
