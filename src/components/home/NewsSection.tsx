
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

const NewsSection = () => {
  // Static news items
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Students win regional science competition",
      date: "May 15, 2023",
      category: "Achievement",
      imageUrl: "https://images.unsplash.com/photo-1564066636936-5e8c7a472487?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "New sports facilities inaugurated",
      date: "April 10, 2023",
      category: "Infrastructure",
      imageUrl: "https://images.unsplash.com/photo-1519758965398-9970d90bbda4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Cultural festival showcases student talent",
      date: "March 20, 2023",
      category: "Event",
      imageUrl: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Function to get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Infrastructure":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <section>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center">
          <div className="relative mr-3 sm:mr-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-blue-700 dark:text-blue-400">
            Latest News
          </h2>
        </div>
      </div>

      <Card className="border border-slate-200 shadow-sm dark:border-gray-800 dark:bg-gray-950/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-gray-800">
            {newsItems.map((item) => (
              <AnimatedSection 
                key={item.id} 
                animation="fade-in-up"
              >
                <div className="flex flex-col sm:flex-row p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors duration-200">
                  <div className="w-full sm:w-24 h-20 mb-3 sm:mb-0 sm:mr-4 overflow-hidden rounded-md flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium ${getCategoryColor(item.category)}`}
                      >
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {item.date}
                      </span>
                    </div>
                    
                    <h3 className="text-sm sm:text-base font-medium leading-tight mb-2">
                      {item.title}
                    </h3>
                    
                    <Link 
                      to="/notices" 
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="p-4 sm:p-5 flex justify-center border-t border-slate-200 dark:border-gray-800">
            <Button 
              asChild 
              variant="ghost" 
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Link to="/notices" className="flex items-center">
                View all news
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsSection;
