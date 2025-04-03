
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Book, 
  Download, 
  Calendar, 
  Filter,
  Search,
  FileText,
  ChevronDown,
  PlusCircle
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/shared/PageLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const PreviousYearPapers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const isMobile = useIsMobile();
  
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

  // Paper data (same as original)
  const papers = {
    "class-10": [
      /* ... keep existing code (all the paper objects in class-10 array) */
    ],
    "class-12-science": [
      /* ... keep existing code (all the paper objects in class-12-science array) */
    ],
    "class-12-commerce": [
      /* ... keep existing code (all the paper objects in class-12-commerce array) */
    ],
    "practice-papers": [
      /* ... keep existing code (all the paper objects in practice-papers array) */
    ],
  };

  const filterPapersByYear = (paperList, year) => {
    if (year === "all") return paperList;
    return paperList.filter(paper => paper.year === year);
  };

  const filterPapersBySearch = (paperList, query) => {
    if (!query) return paperList;
    const lowerQuery = query.toLowerCase();
    return paperList.filter(paper => 
      paper.subject.toLowerCase().includes(lowerQuery) ||
      paper.paperType.toLowerCase().includes(lowerQuery)
    );
  };

  const applyFilters = (paperList) => {
    let filteredList = filterPapersByYear(paperList, yearFilter);
    return filterPapersBySearch(filteredList, searchQuery);
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
        
        <AnimatedSection animation="fade-in-up">
          <Card className="mb-6 bg-card/80 backdrop-blur-sm border shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="mr-2 h-5 w-5 text-school-primary" />
                Search & Filter Papers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible 
                open={!isMobile || isFilterExpanded} 
                onOpenChange={setIsFilterExpanded}
              >
                {isMobile && (
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex w-full justify-between mb-2"
                      size="sm"
                    >
                      <span>Filter Options</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} 
                      />
                    </Button>
                  </CollapsibleTrigger>
                )}
                
                <CollapsibleContent className={!isMobile ? "block" : undefined}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <label htmlFor="search" className="text-sm font-medium">
                          Search Papers
                        </label>
                      </div>
                      <Input 
                        id="search"
                        placeholder="Search by subject or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <label htmlFor="year-filter" className="text-sm font-medium">
                          Filter by Year
                        </label>
                      </div>
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger id="year-filter">
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
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={200}>
          <Tabs defaultValue={classes[0].id} className="mb-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-6">
                {classes.map((cls) => (
                  <TabsTrigger key={cls.id} value={cls.id}>
                    {cls.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {classes.map((cls) => (
              <TabsContent key={cls.id} value={cls.id} className="animate-in fade-in-50 duration-300">
                <div className="grid gap-6 md:grid-cols-1">
                  <Card className="overflow-hidden border shadow">
                    <CardHeader className="bg-card/95">
                      <CardTitle className="flex items-center text-xl">
                        <Book className="mr-2 h-5 w-5 text-school-primary" />
                        {cls.label} Question Papers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="w-full" type="always">
                        <div className="min-w-[700px]">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/50 border-b">
                                <th className="px-4 py-3 text-left text-sm font-medium">Subject</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Year</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Details</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Download</th>
                              </tr>
                            </thead>
                            <tbody>
                              {applyFilters(papers[cls.id] || []).length > 0 ? (
                                applyFilters(papers[cls.id] || []).map((paper, idx) => (
                                  <tr key={idx} className="border-b last:border-0 hover:bg-accent/5 transition-colors">
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
                                      <Button size="sm" className="h-8 gap-1 bg-green-600 hover:bg-green-700">
                                        <Download className="h-3 w-3" />
                                        <span>PDF</span>
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                    No question papers found matching your filters.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </ScrollArea>
                      
                      {/* Paper count and navigation */}
                      <div className="p-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-sm text-muted-foreground">
                          Showing <span className="font-medium">{applyFilters(papers[cls.id] || []).length}</span> papers
                        </p>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <PlusCircle className="h-4 w-4" />
                          Request Missing Paper
                        </Button>
                      </div>
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
