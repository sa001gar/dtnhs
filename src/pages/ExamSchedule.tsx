
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, GraduationCap, Info } from "lucide-react";
import PageLoader from "@/components/shared/PageLoader";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExamSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const examTypes = [
    { id: "mid-term", label: "Mid-Term Exams" },
    { id: "final", label: "Final Exams" },
    { id: "unit-tests", label: "Unit Tests" },
    { id: "board-exams", label: "Board Exams" },
  ];

  const schedules = {
    "mid-term": [
      {
        class: "Classes V-VIII",
        dates: "August 10-20, 2023",
        examDetails: [
          { date: "August 10, 2023", day: "Monday", subject: "English", time: "10:00 AM - 12:00 PM" },
          { date: "August 11, 2023", day: "Tuesday", subject: "Bengali/Hindi", time: "10:00 AM - 12:00 PM" },
          { date: "August 12, 2023", day: "Wednesday", subject: "Mathematics", time: "10:00 AM - 12:00 PM" },
          { date: "August 13, 2023", day: "Thursday", subject: "Science", time: "10:00 AM - 12:00 PM" },
          { date: "August 14, 2023", day: "Friday", subject: "Social Studies", time: "10:00 AM - 12:00 PM" },
        ]
      },
      {
        class: "Classes IX-X",
        dates: "August 16-25, 2023",
        examDetails: [
          { date: "August 16, 2023", day: "Monday", subject: "First Language", time: "10:00 AM - 1:00 PM" },
          { date: "August 17, 2023", day: "Tuesday", subject: "Second Language", time: "10:00 AM - 1:00 PM" },
          { date: "August 18, 2023", day: "Wednesday", subject: "Mathematics", time: "10:00 AM - 1:00 PM" },
          { date: "August 19, 2023", day: "Thursday", subject: "Physical Science", time: "10:00 AM - 1:00 PM" },
          { date: "August 20, 2023", day: "Friday", subject: "Life Science", time: "10:00 AM - 1:00 PM" },
          { date: "August 22, 2023", day: "Monday", subject: "History", time: "10:00 AM - 1:00 PM" },
          { date: "August 23, 2023", day: "Tuesday", subject: "Geography", time: "10:00 AM - 1:00 PM" },
          { date: "August 24, 2023", day: "Wednesday", subject: "Optional Subjects", time: "10:00 AM - 1:00 PM" },
        ]
      },
      {
        class: "Classes XI-XII",
        dates: "August 18-28, 2023",
        examDetails: [
          { date: "August 18, 2023", day: "Monday", subject: "Languages", time: "10:00 AM - 1:00 PM" },
          { date: "August 20, 2023", day: "Wednesday", subject: "Physics/Accountancy", time: "10:00 AM - 1:00 PM" },
          { date: "August 22, 2023", day: "Friday", subject: "Chemistry/Business Studies", time: "10:00 AM - 1:00 PM" },
          { date: "August 24, 2023", day: "Monday", subject: "Mathematics/Economics", time: "10:00 AM - 1:00 PM" },
          { date: "August 26, 2023", day: "Wednesday", subject: "Biology/Computer Applications", time: "10:00 AM - 1:00 PM" },
        ]
      },
    ],
    "final": [
      {
        class: "Classes V-VIII",
        dates: "February 15-25, 2024",
        examDetails: [
          { date: "February 15, 2024", day: "Monday", subject: "English", time: "10:00 AM - 12:00 PM" },
          { date: "February 16, 2024", day: "Tuesday", subject: "Bengali/Hindi", time: "10:00 AM - 12:00 PM" },
          { date: "February 17, 2024", day: "Wednesday", subject: "Mathematics", time: "10:00 AM - 12:00 PM" },
          { date: "February 18, 2024", day: "Thursday", subject: "Science", time: "10:00 AM - 12:00 PM" },
          { date: "February 19, 2024", day: "Friday", subject: "Social Studies", time: "10:00 AM - 12:00 PM" },
        ]
      },
      {
        class: "Classes IX-X",
        dates: "February 18-March 1, 2024",
        examDetails: [
          { date: "February 18, 2024", day: "Monday", subject: "First Language", time: "10:00 AM - 1:00 PM" },
          { date: "February 19, 2024", day: "Tuesday", subject: "Second Language", time: "10:00 AM - 1:00 PM" },
          { date: "February 20, 2024", day: "Wednesday", subject: "Mathematics", time: "10:00 AM - 1:00 PM" },
          { date: "February 21, 2024", day: "Thursday", subject: "Physical Science", time: "10:00 AM - 1:00 PM" },
          { date: "February 22, 2024", day: "Friday", subject: "Life Science", time: "10:00 AM - 1:00 PM" },
          { date: "February 25, 2024", day: "Monday", subject: "History", time: "10:00 AM - 1:00 PM" },
          { date: "February 26, 2024", day: "Tuesday", subject: "Geography", time: "10:00 AM - 1:00 PM" },
          { date: "February 27, 2024", day: "Wednesday", subject: "Optional Subjects", time: "10:00 AM - 1:00 PM" },
        ]
      },
      {
        class: "Classes XI-XII",
        dates: "February 20-March 5, 2024",
        examDetails: [
          { date: "February 20, 2024", day: "Monday", subject: "Languages", time: "10:00 AM - 1:00 PM" },
          { date: "February 22, 2024", day: "Wednesday", subject: "Physics/Accountancy", time: "10:00 AM - 1:00 PM" },
          { date: "February 24, 2024", day: "Friday", subject: "Chemistry/Business Studies", time: "10:00 AM - 1:00 PM" },
          { date: "February 26, 2024", day: "Monday", subject: "Mathematics/Economics", time: "10:00 AM - 1:00 PM" },
          { date: "February 28, 2024", day: "Wednesday", subject: "Biology/Computer Applications", time: "10:00 AM - 1:00 PM" },
        ]
      },
    ],
    "unit-tests": [
      {
        class: "All Classes",
        dates: "Monthly Tests",
        examDetails: [
          { date: "Last Week of April", day: "Various", subject: "Unit Test 1", time: "Regular Class Hours" },
          { date: "Last Week of June", day: "Various", subject: "Unit Test 2", time: "Regular Class Hours" },
          { date: "Last Week of October", day: "Various", subject: "Unit Test 3", time: "Regular Class Hours" },
          { date: "Last Week of December", day: "Various", subject: "Unit Test 4", time: "Regular Class Hours" },
        ]
      },
    ],
    "board-exams": [
      {
        class: "Class X (WBBSE)",
        dates: "February - March 2024",
        examDetails: [
          { date: "As per Board Schedule", day: "TBA", subject: "All Subjects", time: "As per Board Schedule" },
        ]
      },
      {
        class: "Class XII (WBCHSE)",
        dates: "March - April 2024",
        examDetails: [
          { date: "As per Board Schedule", day: "TBA", subject: "All Subjects", time: "As per Board Schedule" },
        ]
      },
    ],
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Examination Schedule"
        description="Upcoming examination dates and timetables for all classes."
        pattern="dots"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <AnimatedSection animation="fade-in-up">
          <Tabs defaultValue={examTypes[0].id} className="mb-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-6 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-auto">
                {examTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="whitespace-nowrap">
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {examTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <div className="grid gap-6 md:grid-cols-1">
                  {schedules[type.id]?.map((schedule, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <GraduationCap className="mr-2 h-5 w-5 text-school-primary" />
                          {schedule.class}
                        </CardTitle>
                        <p className="text-muted-foreground flex items-center mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          {schedule.dates}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="w-full" type="always">
                          <div className="min-w-[600px] pr-4">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="px-2 py-2 text-left text-sm font-medium">Date</th>
                                  <th className="px-2 py-2 text-left text-sm font-medium">Day</th>
                                  <th className="px-2 py-2 text-left text-sm font-medium">Subject</th>
                                  <th className="px-2 py-2 text-left text-sm font-medium">Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {schedule.examDetails.map((exam, idx) => (
                                  <tr key={idx} className="border-b last:border-0">
                                    <td className="px-2 py-3 text-sm">{exam.date}</td>
                                    <td className="px-2 py-3 text-sm">{exam.day}</td>
                                    <td className="px-2 py-3 text-sm font-medium">{exam.subject}</td>
                                    <td className="px-2 py-3 text-sm flex items-center">
                                      <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                                      {exam.time}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </ScrollArea>
                        
                        {type.id === "board-exams" && (
                          <div className="mt-4 flex items-start gap-2 bg-muted p-3 rounded-md">
                            <Info className="h-5 w-5 text-school-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">
                              The exact schedule for board examinations will be announced by the respective boards. 
                              Please refer to the official WBBSE/WBCHSE websites for the final examination timetable.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default ExamSchedule;
