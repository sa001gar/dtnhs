
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Academics = () => {
  const programs = [
    {
      id: 1,
      title: "Primary Education",
      grades: "Grades 1-5",
      description: "Our primary education program focuses on building a strong foundation in core subjects while encouraging creativity and curiosity."
    },
    {
      id: 2,
      title: "Middle School",
      grades: "Grades 6-8",
      description: "The middle school program bridges primary and secondary education, helping students develop critical thinking and independent study skills."
    },
    {
      id: 3,
      title: "Secondary Education",
      grades: "Grades 9-10",
      description: "Our secondary program prepares students for board examinations with comprehensive study in all major subjects."
    },
    {
      id: 4,
      title: "Higher Secondary",
      grades: "Grades 11-12",
      description: "The higher secondary program offers specialized streams in Science, Commerce, and Arts to prepare students for college and career paths."
    }
  ];

  return (
    <div className="container py-8 md:py-12">
      <PageHeader
        title="Academic Programs"
        description="Our comprehensive academic programs are designed to provide quality education at all levels."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {programs.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{program.title}</CardTitle>
              <p className="text-school-primary font-medium">{program.grades}</p>
            </CardHeader>
            <CardContent>
              <p>{program.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Academics;
