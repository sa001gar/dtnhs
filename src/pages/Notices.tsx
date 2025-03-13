
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";

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
      content: "We are pleased to announce our Annual Day celebration on June 30, 2023. All parents are cordially invited to attend the event at the school auditorium from 4 PM onwards."
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "May 10, 2023",
      content: "The Parent-Teacher Meeting for all classes will be held on May 20, 2023. Parents are requested to attend the meeting to discuss their ward's academic progress."
    },
    {
      id: 3,
      title: "Summer Vacation Announcement",
      date: "April 25, 2023",
      content: "The school will remain closed for summer vacation from May 25 to June 15, 2023. Classes will resume on June 16, 2023."
    },
    {
      id: 4,
      title: "New Sports Facilities",
      date: "April 12, 2023",
      content: "We are proud to announce the opening of our new state-of-the-art sports complex. Students can utilize these facilities starting next week."
    },
    {
      id: 5,
      title: "Examination Schedule",
      date: "March 5, 2023",
      content: "The final examination for all classes will begin from March 15, 2023. The detailed schedule has been shared with students and is available on the school notice board."
    }
  ];

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
        
        <div className="space-y-6 mt-8">
          {notices.map((notice, index) => (
            <AnimatedSection key={notice.id} animation="fade-in-up" delay={index * 100}>
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    {notice.date}
                  </div>
                  <CardTitle>{notice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{notice.content}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notices;
