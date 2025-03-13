
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";

const Teachers = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {teachers.map((teacher, index) => (
            <AnimatedSection key={teacher.id} animation="fade-in-up" delay={index * 100}>
              <Card key={teacher.id} className="hover:shadow-md transition-shadow">
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
