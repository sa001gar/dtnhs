import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Download, 
  Calendar, 
  Filter
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/shared/PageLoader";
import { ScrollArea } from "@/components/ui/scroll-area";

const PreviousYearPapers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState("all");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const classes = [
    { id: "class-10", label: "Class X (WBBSE)" },
    { id: "class-12-science", label: "Class XII (Science)" },
    { id: "class-12-commerce", label: "Class XII (Commerce)" },
    { id: "practice-papers", label: "Practice Papers" },
  ];

  const years = ["all", "2023", "2022", "2021", "2020", "2019"];

  const papers = {
    "class-10": [
      { 
        subject: "Bengali", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.4 MB",
        pages: 12
      },
      { 
        subject: "English", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.2 MB",
        pages: 10
      },
      { 
        subject: "Mathematics", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.1 MB",
        pages: 14
      },
      { 
        subject: "Physical Science", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.8 MB",
        pages: 12
      },
      { 
        subject: "Life Science", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.5 MB",
        pages: 11
      },
      { 
        subject: "History", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.3 MB",
        pages: 10
      },
      { 
        subject: "Geography", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.6 MB",
        pages: 11
      },
      { 
        subject: "Bengali", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.3 MB",
        pages: 12
      },
      { 
        subject: "English", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.1 MB",
        pages: 10
      },
      { 
        subject: "Mathematics", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.0 MB",
        pages: 14
      },
      { 
        subject: "Bengali", 
        year: "2021", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.2 MB",
        pages: 12
      },
      { 
        subject: "English", 
        year: "2021", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.0 MB",
        pages: 10
      },
    ],
    "class-12-science": [
      { 
        subject: "Physics", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.2 MB",
        pages: 15
      },
      { 
        subject: "Chemistry", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.0 MB",
        pages: 14
      },
      { 
        subject: "Mathematics", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.4 MB",
        pages: 16
      },
      { 
        subject: "Biology", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.1 MB",
        pages: 14
      },
      { 
        subject: "English", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.5 MB",
        pages: 12
      },
      { 
        subject: "Physics", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.1 MB",
        pages: 15
      },
      { 
        subject: "Chemistry", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.9 MB",
        pages: 14
      },
      { 
        subject: "Physics", 
        year: "2021", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.0 MB",
        pages: 15
      },
    ],
    "class-12-commerce": [
      { 
        subject: "Accountancy", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.1 MB",
        pages: 14
      },
      { 
        subject: "Business Studies", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.8 MB",
        pages: 13
      },
      { 
        subject: "Economics", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.9 MB",
        pages: 13
      },
      { 
        subject: "Computer Applications", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.6 MB",
        pages: 12
      },
      { 
        subject: "English", 
        year: "2023", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.5 MB",
        pages: 12
      },
      { 
        subject: "Accountancy", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "3.0 MB",
        pages: 14
      },
      { 
        subject: "Business Studies", 
        year: "2022", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.7 MB",
        pages: 13
      },
      { 
        subject: "Accountancy", 
        year: "2021", 
        paperType: "Board Exam", 
        downloadUrl: "#",
        size: "2.9 MB",
        pages: 14
      },
    ],
    "practice-papers": [
      { 
        subject: "Mathematics (Class X)", 
        year: "2023", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.5 MB",
        pages: 12
      },
      { 
        subject: "Science (Class X)", 
        year: "2023", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.3 MB",
        pages: 10
      },
      { 
        subject: "Physics (Class XII)", 
        year: "2023", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.8 MB",
        pages: 14
      },
      { 
        subject: "Chemistry (Class XII)", 
        year: "2023", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.7 MB",
        pages: 13
      },
      { 
        subject: "Accountancy (Class XII)", 
        year: "2023", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.6 MB",
        pages: 12
      },
      { 
        subject: "Mathematics (Class X)", 
        year: "2022", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.4 MB",
        pages: 12
      },
      { 
        subject: "Science (Class X)", 
        year: "2022", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.2 MB",
        pages: 10
      },
      { 
        subject: "Mathematics (Class X)", 
        year: "2021", 
        paperType: "Sample Paper", 
        downloadUrl: "#",
        size: "2.3 MB",
        pages: 12
      },
    ],
  };

  const filterPapersByYear = (paperList, year) => {
    if (year === "all") return paperList;
    return paperList.filter(paper => paper.year === year);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Previous Year Papers"
        description="Access to previous year question papers for board exams and practice materials."
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
                <label htmlFor="year-filter" className="text-sm font-medium">
                  Filter by Year
                </label>
              </div>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <AnimatedSection animation="fade-in-up">
          <Tabs defaultValue={classes[0].id} className="mb-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-6 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-auto">
                {classes.map((cls) => (
                  <TabsTrigger key={cls.id} value={cls.id} className="whitespace-nowrap">
                    {cls.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {classes.map((cls) => (
              <TabsContent key={cls.id} value={cls.id}>
                <div className="grid gap-6 md:grid-cols-1">
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <Book className="mr-2 h-5 w-5 text-school-primary" />
                        {cls.label} Question Papers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="w-full" type="always">
                        <div className="min-w-[700px] pr-4">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Year</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Download</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterPapersByYear(papers[cls.id] || [], yearFilter).length > 0 ? (
                                filterPapersByYear(papers[cls.id] || [], yearFilter).map((paper, idx) => (
                                  <tr key={idx} className="border-b last:border-0">
                                    <td className="px-4 py-3 text-sm font-medium">{paper.subject}</td>
                                    <td className="px-4 py-3 text-sm">
                                      <Badge variant="outline" className="bg-muted">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {paper.year}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{paper.paperType}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-3">
                                        <span>{paper.pages} pages</span>
                                        <span>{paper.size}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                      <Button size="sm" className="h-8 gap-1" variant="outline">
                                        <Download className="h-3 w-3" />
                                        <span>PDF</span>
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                    No question papers found for the selected year.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default PreviousYearPapers;
