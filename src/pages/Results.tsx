
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Download, Filter, Info } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

const Results = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedClass, setSelectedClass] = React.useState("10A");
  const isMobile = useIsMobile();

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

  // Sample classes data
  const classes = ["10A", "10B", "9A", "9B"];

  const renderResultTable = (results, type) => {
    const filteredResults = results.filter(student => student.class === selectedClass);
    
    return (
      <div className="overflow-hidden rounded-md border">
        <ScrollArea className="w-full" type="always">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[80px]">Roll No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">English</TableHead>
                  <TableHead className="text-center">Mathematics</TableHead>
                  <TableHead className="text-center">Science</TableHead>
                  <TableHead className="text-center">Social Studies</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((student) => (
                    <TableRow key={student.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium">{student.roll}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">{student.english}</TableCell>
                      <TableCell className="text-center">{student.math}</TableCell>
                      <TableCell className="text-center">{student.science}</TableCell>
                      <TableCell className="text-center">{student.social}</TableCell>
                      <TableCell className="text-center font-semibold">{student.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${parseFloat(student.percentage) >= 85 ? 'bg-green-500' : 'bg-school-primary'}`}>
                          {student.percentage}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      No results found for this class.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    );
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
    <Layout>
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
          <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg mb-8">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-center sm:text-left flex items-center gap-2">
                Class Results
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">View examination results for different classes and terms.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Select Class:</span>
                <div className="flex gap-1 overflow-x-auto pb-2 -mr-2 pr-2 flex-1">
                  {classes.map(cls => (
                    <Button 
                      key={cls} 
                      variant={selectedClass === cls ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedClass(cls)}
                      className="flex-shrink-0"
                    >
                      {cls}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <p className="text-muted-foreground text-sm">
                  Showing results for <span className="font-semibold text-foreground">Class {selectedClass}</span> - Academic Year 2023
                </p>
              </div>
              
              <Tabs defaultValue="midterm" className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="midterm">
                    <span className="hidden sm:inline">Mid-Term </span>
                    <span className="sm:hidden">Mid-Term</span>
                  </TabsTrigger>
                  <TabsTrigger value="final">
                    <span className="hidden sm:inline">Final </span>
                    <span className="sm:hidden">Final</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="midterm" className="animate-in fade-in-50">
                  {renderResultTable(examResults.midterm, 'midterm')}
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Export Results</span>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="final" className="animate-in fade-in-50">
                  {renderResultTable(examResults.final, 'final')}
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Export Results</span>
                    </Button>
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
