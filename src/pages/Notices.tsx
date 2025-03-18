
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, MessageCircle, Bell } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notices = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const notices = [
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

  const categories = ["All", ...new Set(notices.map(notice => notice.category))];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Notices & Announcements"
        description="Stay updated with the latest announcements, events, and important information."
        pattern="stripes"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="All" className="mt-0">
            <div className="space-y-6">
              {notices.map((notice, index) => (
                <AnimatedSection key={notice.id} animation="fade-in-up" delay={index * 100}>
                  <Card className={`notice-card border-l-4 ${notice.urgent ? 'border-destructive dark:border-destructive' : 'border-school-primary dark:border-school-primary'} hover:shadow-md dark:bg-card/80 backdrop-blur-sm`}>
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center text-sm text-muted-foreground gap-4">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {notice.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {notice.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-school-primary/10 text-school-primary dark:bg-school-primary/20">
                            {notice.category}
                          </Badge>
                          {notice.urgent && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className={`${notice.urgent ? 'text-destructive dark:text-destructive' : ''}`}>
                        {notice.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground dark:text-muted-foreground/90">{notice.content}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>
          
          {categories.filter(cat => cat !== "All").map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="space-y-6">
                {notices
                  .filter(notice => notice.category === category)
                  .map((notice, index) => (
                    <AnimatedSection key={notice.id} animation="fade-in-up" delay={index * 100}>
                      <Card className={`notice-card border-l-4 ${notice.urgent ? 'border-destructive dark:border-destructive' : 'border-school-primary dark:border-school-primary'} hover:shadow-md dark:bg-card/80 backdrop-blur-sm`}>
                        <CardHeader>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center text-sm text-muted-foreground gap-4">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {notice.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {notice.time}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-school-primary/10 text-school-primary dark:bg-school-primary/20">
                                {notice.category}
                              </Badge>
                              {notice.urgent && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> Urgent
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardTitle className={`${notice.urgent ? 'text-destructive dark:text-destructive' : ''}`}>
                            {notice.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground dark:text-muted-foreground/90">{notice.content}</p>
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
