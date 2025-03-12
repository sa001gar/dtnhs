
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, BookOpen, FileText, Calendar } from "lucide-react";
import PageLoader from "@/components/shared/PageLoader";

const Academics = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

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

  const curriculum = [
    {
      id: "science",
      title: "Science Stream",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
      description: "Our science stream prepares students for careers in engineering, medicine, and research."
    },
    {
      id: "commerce",
      title: "Commerce Stream",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Computer Applications"],
      description: "The commerce stream prepares students for careers in business, finance, and entrepreneurship."
    },
    {
      id: "arts",
      title: "Arts Stream",
      subjects: ["History", "Geography", "Political Science", "Psychology", "Sociology"],
      description: "The arts stream provides a strong foundation in humanities and social sciences."
    }
  ];
  
  const activities = [
    {
      id: 1,
      title: "Science Club",
      description: "Students explore scientific concepts through hands-on experiments and projects."
    },
    {
      id: 2,
      title: "Literary Society",
      description: "Focuses on developing reading, writing, and public speaking skills."
    },
    {
      id: 3,
      title: "Sports Programs",
      description: "Includes cricket, basketball, football, and athletics."
    },
    {
      id: 4,
      title: "Cultural Events",
      description: "Annual cultural festivals with music, dance, and drama performances."
    }
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Academic Programs"
        description="Our comprehensive academic programs are designed to provide quality education at all levels."
        pattern="grid"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920"
        className="bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>
        
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-3">
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <GraduationCap className="size-4" />
              <span className="hidden sm:inline">Programs</span>
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Curriculum</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span className="hidden sm:inline">Activities</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="programs">
            <AnimatedSection animation="fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-center">Educational Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {programs.map((program, index) => (
                  <AnimatedSection key={program.id} animation="fade-in-up" delay={index * 100}>
                    <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                        <p className="text-school-primary font-medium">{program.grades}</p>
                      </CardHeader>
                      <CardContent>
                        <p>{program.description}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <AnimatedSection animation="fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Curriculum</h2>
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  {curriculum.map((stream, index) => (
                    <AccordionItem key={stream.id} value={stream.id} className="border border-muted rounded-lg mb-4 bg-background/80 backdrop-blur-sm overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                        <span className="text-xl font-semibold">{stream.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2">
                        <p className="mb-4">{stream.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                          {stream.subjects.map((subject) => (
                            <div key={subject} className="bg-muted/30 rounded-md p-3 flex items-center">
                              <FileText className="w-5 h-5 text-school-primary mr-2" />
                              <span>{subject}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimatedSection>
          </TabsContent>
          
          <TabsContent value="activities">
            <AnimatedSection animation="fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-center">Co-curricular Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {activities.map((activity, index) => (
                  <AnimatedSection key={activity.id} animation="fade-in-up" delay={index * 100}>
                    <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle>{activity.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{activity.description}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Academics;
