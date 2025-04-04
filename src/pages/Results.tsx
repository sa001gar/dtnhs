
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Helmet } from "react-helmet";

const Results = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  const examResults = {
    midterm: [
      { id: 1, name: "John Smith", class: "10A", roll: "1001", english: 85, math: 92, science: 88, social: 78, total: 343, percentage: "85.75%" },
      { id: 2, name: "Emily Johnson", class: "10A", roll: "1002", english: 90, math: 88, science: 94, social: 82, total: 354, percentage: "88.50%" },
      { id: 3, name: "Michael Brown", class: "10A", roll: "1003", english: 78, math: 95, science: 82, social: 75, total: 330, percentage: "82.50%" },
      { id: 4, name: "Sarah Davis", class: "10A", roll: "1004", english: 92, math: 86, science: 90, social: 88, total: 356, percentage: "89.00%" },
      { id: 5, name: "Daniel Wilson", class: "10A", roll: "1005", english: 84, math: 90, science: 86, social: 80, total: 340, percentage: "85.00%" }
    ],
    final: [
      { id: 1, name: "John Smith", class: "10A", roll: "1001", english: 88, math: 94, science: 90, social: 82, total: 354, percentage: "88.50%" },
      { id: 2, name: "Emily Johnson", class: "10A", roll: "1002", english: 92, math: 90, science: 96, social: 86, total: 364, percentage: "91.00%" },
      { id: 3, name: "Michael Brown", class: "10A", roll: "1003", english: 80, math: 96, science: 84, social: 78, total: 338, percentage: "84.50%" },
      { id: 4, name: "Sarah Davis", class: "10A", roll: "1004", english: 94, math: 88, science: 92, social: 90, total: 364, percentage: "91.00%" },
      { id: 5, name: "Daniel Wilson", class: "10A", roll: "1005", english: 86, math: 92, science: 88, social: 84, total: 350, percentage: "87.50%" }
    ]
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-school-primary" />
            <div className="absolute inset-0 blur-lg bg-school-primary/20 rounded-full" />
          </div>
          <p className="mt-4 text-muted-foreground animate-pulse">Loading results...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Examination Results - Durgapur Tarak Nath High School"
      description="View and access the latest examination results and academic performance data for students of Durgapur Tarak Nath High School."
      keywords="DTNHS results, examination results, academic performance, school results, student grades, Durgapur school exams"
      canonicalUrl="https://dtnhs.edu.in/results"
    >
      <PageHeader
        title="Examination Results"
        description="View the examination results for different classes and terms."
        pattern="grid"
        backgroundImage="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1400&q=60"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <AnimatedSection animation="fade-in-up">
          <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg">
            <CardHeader>
              <CardTitle className="text-center sm:text-left">Class 10 Results - Academic Year 2023</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="midterm" className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="midterm">Mid-Term Examination</TabsTrigger>
                  <TabsTrigger value="final">Final Examination</TabsTrigger>
                </TabsList>
                
                <TabsContent value="midterm">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>English</TableHead>
                          <TableHead>Mathematics</TableHead>
                          <TableHead>Science</TableHead>
                          <TableHead>Social Studies</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examResults.midterm.map((student) => (
                          <TableRow key={student.id} className="hover:bg-accent/50 transition-colors">
                            <TableCell className="font-medium">{student.roll}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.english}</TableCell>
                            <TableCell>{student.math}</TableCell>
                            <TableCell>{student.science}</TableCell>
                            <TableCell>{student.social}</TableCell>
                            <TableCell className="font-semibold">{student.total}</TableCell>
                            <TableCell className="font-semibold">{student.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="final">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>English</TableHead>
                          <TableHead>Mathematics</TableHead>
                          <TableHead>Science</TableHead>
                          <TableHead>Social Studies</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examResults.final.map((student) => (
                          <TableRow key={student.id} className="hover:bg-accent/50 transition-colors">
                            <TableCell className="font-medium">{student.roll}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.english}</TableCell>
                            <TableCell>{student.math}</TableCell>
                            <TableCell>{student.science}</TableCell>
                            <TableCell>{student.social}</TableCell>
                            <TableCell className="font-semibold">{student.total}</TableCell>
                            <TableCell className="font-semibold">{student.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Results;
