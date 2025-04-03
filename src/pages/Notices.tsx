
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, Check, Search } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notices, setNotices] = useState([]);
  const [readNotices, setReadNotices] = useState<number[]>([]);
  
  useEffect(() => {
    // Load all notices
    const fetchNotices = () => {
      const defaultNotices = [
        {
          id: 1,
          title: "Annual Day Celebration",
          date: "June 15, 2023",
          time: "4:00 PM",
          content: "We are pleased to announce our Annual Day celebration on June 30, 2023. All parents are cordially invited to attend the event at the school auditorium from 4 PM onwards.",
          category: "Event",
          urgent: true
        },
        {
          id: 2,
          title: "Parent-Teacher Meeting",
          date: "May 10, 2023",
          time: "10:00 AM - 1:00 PM",
          content: "The Parent-Teacher Meeting for all classes will be held on May 20, 2023. Parents are requested to attend the meeting to discuss their ward's academic progress.",
          category: "Meeting",
          urgent: false
        },
        {
          id: 3,
          title: "Summer Vacation Announcement",
          date: "April 25, 2023",
          time: "12:00 PM",
          content: "The school will remain closed for summer vacation from May 25 to June 15, 2023. Classes will resume on June 16, 2023.",
          category: "Announcement",
          urgent: false
        },
        {
          id: 4,
          title: "New Sports Facilities",
          date: "April 12, 2023",
          time: "11:30 AM",
          content: "We are proud to announce the opening of our new state-of-the-art sports complex. Students can utilize these facilities starting next week.",
          category: "Announcement",
          urgent: false
        },
        {
          id: 5,
          title: "Examination Schedule",
          date: "March 5, 2023",
          time: "9:00 AM",
          content: "The final examination for all classes will begin from March 15, 2023. The detailed schedule has been shared with students and is available on the school notice board.",
          category: "Examination",
          urgent: true
        }
      ];
      
      setNotices(defaultNotices);
      
      // Load read status from localStorage
      const storedReadNotices = localStorage.getItem("readNotices");
      if (storedReadNotices) {
        setReadNotices(JSON.parse(storedReadNotices));
      }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    fetchNotices();
    window.scrollTo(0, 0);
  }, []);

  // Mark notice as read
  const markAsRead = (id: number) => {
    if (!readNotices.includes(id)) {
      const updatedReadNotices = [...readNotices, id];
      setReadNotices(updatedReadNotices);
      localStorage.setItem("readNotices", JSON.stringify(updatedReadNotices));
    }
  };

  // Filter notices by search term
  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(search.toLowerCase()) || 
    notice.content.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", ...new Set(notices.map(notice => notice.category))];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Helmet>
        <title>Notices & Announcements | School Portal</title>
        <meta name="description" content="Stay updated with the latest announcements, events, and important information from our school." />
      </Helmet>
      
      <PageHeader
        title="Notices & Announcements"
        description="Stay updated with the latest announcements, events, and important information."
        pattern="stripes"
      />

      <div className="container py-6 sm:py-8 md:py-12">
        <div className="mb-4 sm:mb-6">
          <Breadcrumb />
        </div>
        
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search notices..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="mb-6 sm:mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <TabsList className="inline-flex h-9 sm:h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs sm:text-sm whitespace-nowrap">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="All" className="mt-0">
            <div className="space-y-4 sm:space-y-6">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, index) => (
                  <AnimatedSection key={notice.id} animation="fade-in-up" delay={index * 100}>
                    <Card 
                      className={`notice-card border-l-4 ${notice.urgent ? 'border-destructive dark:border-destructive' : 'border-school-primary dark:border-school-primary'} hover:shadow-md dark:bg-card/80 backdrop-blur-sm ${readNotices.includes(notice.id) ? 'bg-muted/30' : ''}`}
                      onClick={() => markAsRead(notice.id)}
                    >
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-2 sm:gap-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              {notice.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              {notice.time}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <Badge variant="outline" className="text-xs px-1 sm:px-2 py-0.5 bg-school-primary/10 text-school-primary dark:bg-school-primary/20">
                              {notice.category}
                            </Badge>
                            {notice.urgent && (
                              <Badge variant="destructive" className="text-xs flex items-center gap-0.5 sm:gap-1">
                                <AlertCircle className="h-2 w-2 sm:h-3 sm:w-3" /> Urgent
                              </Badge>
                            )}
                            {readNotices.includes(notice.id) && (
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-0.5 sm:gap-1">
                                <Check className="h-2 w-2 sm:h-3 sm:w-3" /> Read
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className={`text-base sm:text-lg md:text-xl ${notice.urgent ? 'text-destructive dark:text-destructive' : ''}`}>
                          {notice.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                        <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground/90">{notice.content}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))
              ) : (
                <Card className="p-4 sm:p-8 text-center">
                  <p className="text-sm sm:text-base text-muted-foreground">No notices found matching your search.</p>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {categories.filter(cat => cat !== "All").map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="space-y-4 sm:space-y-6">
                {filteredNotices
                  .filter(notice => notice.category === category)
                  .map((notice, index) => (
                    <AnimatedSection key={notice.id} animation="fade-in-up" delay={index * 100}>
                      <Card 
                        className={`notice-card border-l-4 ${notice.urgent ? 'border-destructive dark:border-destructive' : 'border-school-primary dark:border-school-primary'} hover:shadow-md dark:bg-card/80 backdrop-blur-sm ${readNotices.includes(notice.id) ? 'bg-muted/30' : ''}`}
                        onClick={() => markAsRead(notice.id)}
                      >
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-2 sm:gap-4">
                              <div className="flex items-center">
                                <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                {notice.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                {notice.time}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              <Badge variant="outline" className="text-xs px-1 sm:px-2 py-0.5 bg-school-primary/10 text-school-primary dark:bg-school-primary/20">
                                {notice.category}
                              </Badge>
                              {notice.urgent && (
                                <Badge variant="destructive" className="text-xs flex items-center gap-0.5 sm:gap-1">
                                  <AlertCircle className="h-2 w-2 sm:h-3 sm:w-3" /> Urgent
                                </Badge>
                              )}
                              {readNotices.includes(notice.id) && (
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 flex items-center gap-0.5 sm:gap-1">
                                  <Check className="h-2 w-2 sm:h-3 sm:w-3" /> Read
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardTitle className={`text-base sm:text-lg md:text-xl ${notice.urgent ? 'text-destructive dark:text-destructive' : ''}`}>
                            {notice.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                          <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground/90">{notice.content}</p>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notices;
