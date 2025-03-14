
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLoader from "@/components/shared/PageLoader";
import { 
  BookOpenCheck, 
  Download, 
  FileText, 
  GraduationCap, 
  BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Syllabus = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const classes = [
    { id: "class-5-8", label: "Classes V-VIII" },
    { id: "class-9-10", label: "Classes IX-X" },
    { id: "class-11-12", label: "Classes XI-XII" },
    { id: "class-11-12-commerce", label: "Commerce Stream" },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Academic Syllabus"
        description="Comprehensive curriculum and syllabus for all classes."
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <AnimatedSection animation="fade-in-up">
          <Tabs defaultValue={classes[0].id} className="mb-8">
            <TabsList className="mb-6">
              {classes.map((cls) => (
                <TabsTrigger key={cls.id} value={cls.id}>
                  {cls.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="class-5-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[5, 6, 7, 8].map((classNum) => (
                  <Card key={classNum}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <GraduationCap className="mr-2 h-5 w-5 text-school-primary" />
                        Class {classNum} Syllabus
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Core Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• English</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Bengali/Hindi</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Mathematics</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Science</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Social Studies</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Optional Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Computer Science</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Physical Education</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Full Syllabus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="class-9-10">
              <div className="grid gap-6 md:grid-cols-2">
                {[9, 10].map((classNum) => (
                  <Card key={classNum} className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <GraduationCap className="mr-2 h-5 w-5 text-school-primary" />
                        Class {classNum} Syllabus (WBBSE)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Languages</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• First Language (Bengali/Hindi)</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Second Language (English)</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Core Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Mathematics</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Physical Science</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Life Science</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• History</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Geography</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Additional Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Computer Applications</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Environmental Studies</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Physical Education</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Full Syllabus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="class-11-12">
              <div className="grid gap-6 md:grid-cols-2">
                {[11, 12].map((classNum) => (
                  <Card key={classNum} className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <GraduationCap className="mr-2 h-5 w-5 text-school-primary" />
                        Class {classNum} Syllabus (WBCHSE - Science)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Languages</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Bengali/Hindi/Alternative English</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• English</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Science Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Physics</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Chemistry</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Mathematics</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Biology</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Full Syllabus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="class-11-12-commerce">
              <div className="grid gap-6 md:grid-cols-2">
                {[11, 12].map((classNum) => (
                  <Card key={classNum} className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <BarChart3 className="mr-2 h-5 w-5 text-school-primary" />
                        Class {classNum} Syllabus (WBCHSE - Commerce)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Languages</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Bengali/Hindi/Alternative English</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• English</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-school-primary">Commerce Subjects</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex justify-between">
                              <span>• Accountancy</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Business Studies</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Economics</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                            <li className="flex justify-between">
                              <span>• Computer Applications</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <FileText className="h-4 w-4 mr-1" />
                                <span className="text-xs">View</span>
                              </Button>
                            </li>
                          </ul>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Full Syllabus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Syllabus;
