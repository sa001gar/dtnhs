
import React from "react";
import { Calendar, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "../ui/AnimatedSection";

interface Notice {
  id: number;
  title: string;
  date: string;
  category: "Feature" | "New" | "Announcement" | "Event" | "Examination";
}

const NotificationSection = () => {
  // Hard-coded notices for static display
  const notices: Notice[] = [
    {
      id: 1,
      title: "Annual Day Celebration on June 30, 2023",
      date: "June 15, 2023",
      category: "Event",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting scheduled for all classes on May 20, 2023",
      date: "May 10, 2023",
      category: "Event",
    },
    {
      id: 3,
      title: "School closed for summer vacation from May 25 to June 15, 2023",
      date: "April 25, 2023",
      category: "Announcement",
    },
    {
      id: 4,
      title: "Opening of new state-of-the-art sports complex",
      date: "April 12, 2023",
      category: "New",
    },
    {
      id: 5,
      title: "Final examination for all classes will begin from March 15, 2023",
      date: "March 5, 2023",
      category: "Examination",
    },
  ];

  // Function to get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Feature":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "New":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Announcement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Event":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Examination":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-slate-50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="container px-4">
        <AnimatedSection animation="fade-in-up">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center">
              <div className="relative mr-3 sm:mr-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">
                Notice Board
              </h2>
            </div>
          </div>

          <Card className="border border-slate-200 shadow-sm dark:border-gray-800 dark:bg-gray-950/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="h-[400px] sm:h-[450px] md:h-[500px]">
                <ScrollArea className="h-full">
                  <div className="divide-y divide-slate-200 dark:divide-gray-800">
                    {notices.map((notice) => (
                      <div 
                        key={notice.id} 
                        className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors duration-200"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs font-medium ${getCategoryColor(notice.category)}`}
                            >
                              {notice.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-sm sm:text-base md:text-lg font-medium leading-tight">
                            {notice.title}
                          </h3>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1.5" />
                            <span>{notice.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NotificationSection;
