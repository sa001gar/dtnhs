
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../ui/AnimatedSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    id: 1,
    title: "Annual Day Celebration",
    date: "June 15, 2023",
    excerpt: "Join us for our Annual Day celebration featuring cultural performances by our talented students.",
    link: "/notices"
  },
  {
    id: 2,
    title: "Science Exhibition Results",
    date: "May 28, 2023",
    excerpt: "Congratulations to all participants and winners of our recent Science Exhibition.",
    link: "/notices"
  },
  {
    id: 3,
    title: "New Sports Facilities Inaugurated",
    date: "April 12, 2023",
    excerpt: "We are proud to announce the opening of our new state-of-the-art sports complex.",
    link: "/notices"
  }
];

const NewsSection: React.FC = () => {
  return (
    <section className="bg-school-light py-16 md:py-24">
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl md:text-5xl">
            Latest News & Events
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest happenings, announcements, and achievements at our school.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <AnimatedSection 
              key={item.id} 
              animation="fade-in-up" 
              delay={index * 100}
            >
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.date}
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="group -ml-3 h-8 p-0 text-school-primary">
                    <Link to={item.link} className="flex items-center">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in-up" delay={300} className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full">
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
