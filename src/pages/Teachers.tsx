
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const Teachers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("all");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      qualification: "Ph.D in Applied Mathematics",
      experience: "15 years",
      email: "sarah.johnson@school.edu"
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      subject: "Science",
      qualification: "M.Sc in Physics",
      experience: "12 years",
      email: "michael.brown@school.edu"
    },
    {
      id: 3,
      name: "Mrs. Emily Davis",
      subject: "English Literature",
      qualification: "M.A in English",
      experience: "10 years",
      email: "emily.davis@school.edu"
    },
    {
      id: 4,
      name: "Mr. Robert Wilson",
      subject: "History",
      qualification: "M.A in History",
      experience: "8 years",
      email: "robert.wilson@school.edu"
    },
    {
      id: 5,
      name: "Dr. James Anderson",
      subject: "Physics",
      qualification: "Ph.D in Physics",
      experience: "14 years",
      email: "james.anderson@school.edu"
    },
    {
      id: 6,
      name: "Ms. Linda Garcia",
      subject: "Chemistry",
      qualification: "M.Sc in Chemistry",
      experience: "9 years",
      email: "linda.garcia@school.edu"
    },
    {
      id: 7,
      name: "Dr. Richard Lee",
      subject: "Biology",
      qualification: "Ph.D in Molecular Biology",
      experience: "11 years",
      email: "richard.lee@school.edu"
    },
    {
      id: 8,
      name: "Prof. Jennifer Taylor",
      subject: "Computer Science",
      qualification: "M.Sc in Computer Science",
      experience: "13 years",
      email: "jennifer.taylor@school.edu"
    }
  ];

  // Get unique subjects for the filter
  const subjects = ["all", ...new Set(teachers.map(teacher => teacher.subject))];

  // Filter teachers based on selected subject
  const filteredTeachers = subjectFilter === "all" 
    ? teachers 
    : teachers.filter(teacher => teacher.subject === subjectFilter);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Our Teachers"
        description="Meet our dedicated and experienced teaching staff who are committed to providing quality education."
        pattern="stripes"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-end">
            <div className="w-full sm:w-64">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4" />
                <label htmlFor="subject-filter" className="text-sm font-medium">
                  Filter by Subject
                </label>
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <AnimatedSection key={teacher.id} animation="fade-in-up" delay={index * 100}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{teacher.name}</CardTitle>
                    <p className="text-school-primary font-medium">{teacher.subject}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Qualification:</span> {teacher.qualification}</p>
                      <p><span className="font-medium">Experience:</span> {teacher.experience}</p>
                      <p><span className="font-medium">Email:</span> {teacher.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No teachers found for the selected subject filter.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
