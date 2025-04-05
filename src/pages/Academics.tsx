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
        title: "Upper Primary Education",
        grades: "Grades 5-8",
        description: "Our upper primary program focuses on strengthening fundamental concepts while fostering creativity, problem-solving, and independent learning."
    },
    {
        id: 2,
        title: "Secondary Education",
        grades: "Grades 9-10",
        description: "The secondary education program prepares students for board examinations with a balanced curriculum covering core academic subjects."
    },
    {
        id: 3,
        title: "Higher Secondary Education",
        grades: "Grades 11-12",
        description: "Our higher secondary program offers specialized streams in Science, Commerce, and Arts, equipping students with in-depth knowledge for higher studies and professional careers."
    },
    {
        id: 4,
        title: "Vocational Education",
        grades: "Grades 9-12",
        description: "Our vocational courses provide skill-based training in various trades, helping students gain practical knowledge and enhancing employment opportunities in different industries. Courses include disciplines like Computer Application, IT Enabled Services, and Maintenance & Repair of Electrical Domestic Appliances."
    }
];

  const curriculum = [
    {
        id: "madhyamik",
        title: "Madhyamik (Secondary) Curriculum",
        subjects: [
            "Bengali", "English", "History", "Geography", 
            "Physical Science", "Life Science", "Mathematics",
            "Sanskrit (up to Class 8)", "Health Education", 
            "Work Education", "Paribesh (up to Class 8)"
        ],
        description: "The Madhyamik curriculum provides a strong foundation in languages, sciences, and social sciences, ensuring holistic development for students."
    },
    {
        id: "science",
        title: "Science Stream",
        subjects: [
            "Physics", "Chemistry", "Biology", 
            "Mathematics", "Computer Application", "Environmental Science"
        ],
        description: "Our science stream prepares students for careers in engineering, medicine, and research through a strong foundation in analytical and scientific thinking."
    },
    {
        id: "commerce",
        title: "Commerce Stream",
        subjects: [
            "Accountancy", "Business Studies", "Economics", 
            "Mathematics", "Commercial Law", "Commercial Tax"
        ],
        description: "The commerce stream equips students with knowledge in finance, business management, and trade, preparing them for careers in banking, entrepreneurship, and corporate sectors."
    },
    {
        id: "arts",
        title: "Arts Stream",
        subjects: [
            "History", "Geography", "Political Science", 
            "Philosophy", "Economics", "Environmental Science"
        ],
        description: "The arts stream fosters a deep understanding of humanities and social sciences, opening pathways to careers in law, academia, civil services, and social research."
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
        className="relative bg-gradient-to-b from-school-primary via-school-secondary to-school-primary/80"
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
