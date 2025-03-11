
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";

const Routine = () => {
  const routines = {
    primary: {
      monday: [
        { time: "8:00 - 8:45", subject: "English" },
        { time: "8:45 - 9:30", subject: "Mathematics" },
        { time: "9:30 - 10:15", subject: "Science" },
        { time: "10:15 - 10:30", subject: "Break" },
        { time: "10:30 - 11:15", subject: "Social Studies" },
        { time: "11:15 - 12:00", subject: "Arts & Crafts" }
      ],
      tuesday: [
        { time: "8:00 - 8:45", subject: "Mathematics" },
        { time: "8:45 - 9:30", subject: "English" },
        { time: "9:30 - 10:15", subject: "Physical Education" },
        { time: "10:15 - 10:30", subject: "Break" },
        { time: "10:30 - 11:15", subject: "Science" },
        { time: "11:15 - 12:00", subject: "Music" }
      ]
    },
    secondary: {
      monday: [
        { time: "8:00 - 8:45", subject: "Physics" },
        { time: "8:45 - 9:30", subject: "Chemistry" },
        { time: "9:30 - 10:15", subject: "Mathematics" },
        { time: "10:15 - 10:30", subject: "Break" },
        { time: "10:30 - 11:15", subject: "English" },
        { time: "11:15 - 12:00", subject: "Computer Science" },
        { time: "12:00 - 12:45", subject: "Physical Education" }
      ],
      tuesday: [
        { time: "8:00 - 8:45", subject: "Biology" },
        { time: "8:45 - 9:30", subject: "Mathematics" },
        { time: "9:30 - 10:15", subject: "History" },
        { time: "10:15 - 10:30", subject: "Break" },
        { time: "10:30 - 11:15", subject: "Geography" },
        { time: "11:15 - 12:00", subject: "English" },
        { time: "12:00 - 12:45", subject: "Arts" }
      ]
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Class Routines"
        description="View the weekly class schedules for different grades."
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <div className="mt-8">
          <AnimatedSection animation="fade-in-up">
            <Tabs defaultValue="primary">
              <TabsList className="mb-4">
                <TabsTrigger value="primary">Primary Classes</TabsTrigger>
                <TabsTrigger value="secondary">Secondary Classes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="primary">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monday</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {routines.primary.monday.map((period, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="font-medium">{period.time}</span>
                            <span>{period.subject}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Tuesday</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {routines.primary.tuesday.map((period, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="font-medium">{period.time}</span>
                            <span>{period.subject}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="secondary">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monday</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {routines.secondary.monday.map((period, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="font-medium">{period.time}</span>
                            <span>{period.subject}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Tuesday</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {routines.secondary.tuesday.map((period, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                            <span className="font-medium">{period.time}</span>
                            <span>{period.subject}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Routine;
