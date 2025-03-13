
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const Routine = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("5");
  const [selectedSection, setSelectedSection] = useState("A");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  // All available class options
  const classOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];
  const sectionOptions = ["A", "B", "C"];

  // Routine data organized by class, section, and day
  const routineData = {
    primary: {
      "5": {
        "A": {
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
        "B": {
          monday: [
            { time: "8:00 - 8:45", subject: "Science" },
            { time: "8:45 - 9:30", subject: "English" },
            { time: "9:30 - 10:15", subject: "Mathematics" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Arts & Crafts" },
            { time: "11:15 - 12:00", subject: "Social Studies" }
          ],
          tuesday: [
            { time: "8:00 - 8:45", subject: "English" },
            { time: "8:45 - 9:30", subject: "Science" },
            { time: "9:30 - 10:15", subject: "Music" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Mathematics" },
            { time: "11:15 - 12:00", subject: "Physical Education" }
          ]
        },
        "C": {
          monday: [
            { time: "8:00 - 8:45", subject: "Mathematics" },
            { time: "8:45 - 9:30", subject: "Social Studies" },
            { time: "9:30 - 10:15", subject: "English" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Science" },
            { time: "11:15 - 12:00", subject: "Physical Education" }
          ],
          tuesday: [
            { time: "8:00 - 8:45", subject: "Arts & Crafts" },
            { time: "8:45 - 9:30", subject: "Mathematics" },
            { time: "9:30 - 10:15", subject: "English" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Social Studies" },
            { time: "11:15 - 12:00", subject: "Science" }
          ]
        }
      },
      // More class data can be added here
    },
    secondary: {
      "9": {
        "A": {
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
        },
        "B": {
          monday: [
            { time: "8:00 - 8:45", subject: "Chemistry" },
            { time: "8:45 - 9:30", subject: "Physics" },
            { time: "9:30 - 10:15", subject: "English" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Mathematics" },
            { time: "11:15 - 12:00", subject: "Physical Education" },
            { time: "12:00 - 12:45", subject: "Computer Science" }
          ],
          tuesday: [
            { time: "8:00 - 8:45", subject: "Mathematics" },
            { time: "8:45 - 9:30", subject: "Biology" },
            { time: "9:30 - 10:15", subject: "Geography" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "History" },
            { time: "11:15 - 12:00", subject: "Arts" },
            { time: "12:00 - 12:45", subject: "English" }
          ]
        },
        "C": {
          monday: [
            { time: "8:00 - 8:45", subject: "English" },
            { time: "8:45 - 9:30", subject: "Mathematics" },
            { time: "9:30 - 10:15", subject: "Physics" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Chemistry" },
            { time: "11:15 - 12:00", subject: "Computer Science" },
            { time: "12:00 - 12:45", subject: "Arts" }
          ],
          tuesday: [
            { time: "8:00 - 8:45", subject: "History" },
            { time: "8:45 - 9:30", subject: "Geography" },
            { time: "9:30 - 10:15", subject: "English" },
            { time: "10:15 - 10:30", subject: "Break" },
            { time: "10:30 - 11:15", subject: "Biology" },
            { time: "11:15 - 12:00", subject: "Mathematics" },
            { time: "12:00 - 12:45", subject: "Physical Education" }
          ]
        }
      },
      // More class data can be added here
    }
  };

  // Helper function to determine if a class is primary or secondary
  const getLevel = (classNum) => {
    return parseInt(classNum) <= 8 ? "primary" : "secondary";
  };

  // Get routine for the selected class and section
  const getRoutine = (level, classNum, section, day) => {
    try {
      return routineData[level][classNum][section][day] || [];
    } catch (error) {
      console.log("No routine found for this selection");
      return [];
    }
  };

  const level = getLevel(selectedClass);

  if (isLoading) {
    return <PageLoader />;
  }

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
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/2 md:w-1/4">
                <label htmlFor="class-select" className="block text-sm font-medium mb-2">
                  Select Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map(classNum => (
                      <SelectItem key={classNum} value={classNum}>
                        Class {classNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/2 md:w-1/4">
                <label htmlFor="section-select" className="block text-sm font-medium mb-2">
                  Select Section
                </label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionOptions.map(section => (
                      <SelectItem key={section} value={section}>
                        Section {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="monday">
              <TabsList className="mb-4">
                <TabsTrigger value="monday">Monday</TabsTrigger>
                <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                {/* Additional days can be added here */}
              </TabsList>
              
              <TabsContent value="monday">
                <Card>
                  <CardHeader>
                    <CardTitle>Class {selectedClass} - Section {selectedSection} - Monday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getRoutine(level, selectedClass, selectedSection, "monday").map((period, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium">{period.time}</span>
                          <span>{period.subject}</span>
                        </div>
                      ))}
                      {getRoutine(level, selectedClass, selectedSection, "monday").length === 0 && (
                        <div className="py-4 text-center text-muted-foreground">
                          No routine found for this selection
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tuesday">
                <Card>
                  <CardHeader>
                    <CardTitle>Class {selectedClass} - Section {selectedSection} - Tuesday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getRoutine(level, selectedClass, selectedSection, "tuesday").map((period, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium">{period.time}</span>
                          <span>{period.subject}</span>
                        </div>
                      ))}
                      {getRoutine(level, selectedClass, selectedSection, "tuesday").length === 0 && (
                        <div className="py-4 text-center text-muted-foreground">
                          No routine found for this selection
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Routine;
