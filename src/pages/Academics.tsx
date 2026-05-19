import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  GraduationCap, BookOpen, FileText, Calendar, Users, Award,
  Microscope, Calculator, Globe, Palette, Trophy, Music,
  Beaker, Computer, Building, Target, Star, Clock,
  ChevronRight, Download, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import PageLoader from "@/components/shared/PageLoader";

const Academics = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const academicStats = [
    { label: "Academic Programs", value: "4", icon: <GraduationCap className="h-6 w-6" /> },
    { label: "Subject Streams", value: "3", icon: <BookOpen className="h-6 w-6" /> },
    { label: "Qualified Teachers", value: "60+", icon: <Users className="h-6 w-6" /> },
    { label: "Pass Rate", value: "98%", icon: <Award className="h-6 w-6" /> },
  ];

  const programs = [
    {
      id: 1,
      title: "Upper Primary Education",
      grades: "Grades 5-8",
      description: "Building strong foundations in core subjects with interactive learning methods and creative exploration.",
      image: "/images/home/classroom.png",
      icon: <BookOpen className="h-8 w-8" />,
      features: ["Interactive Learning", "Creative Methods", "Strong Foundation", "Holistic Development"],
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      id: 2,
      title: "Secondary Education",
      grades: "Grades 9-10 (Madhyamik)",
      description: "Comprehensive preparation for board examinations with balanced curriculum and practical learning.",
      image: "/images/home/dtnhs_child.jfif",
      icon: <Target className="h-8 w-8" />,
      features: ["Board Exam Prep", "Balanced Curriculum", "Practical Learning", "Academic Excellence"],
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      id: 3,
      title: "Higher Secondary Education",
      grades: "Grades 11-12",
      description: "Specialized streams in Science, Commerce, and Arts for higher studies and career preparation.",
      image: "/images/home/dtnhs_sports.jpg",
      icon: <Star className="h-8 w-8" />,
      features: ["Stream Specialization", "Career Focused", "Higher Studies Prep", "Professional Growth"],
      bgGradient: "from-purple-50 to-violet-50"
    },
    {
      id: 4,
      title: "Vocational Education",
      grades: "Grades 9-12",
      description: "Skill-based training programs for practical knowledge and enhanced employment opportunities.",
      image: "/images/home/dtnhs_whole.jfif",
      icon: <Building className="h-8 w-8" />,
      features: ["Skill Development", "Practical Training", "Employment Ready", "Industry Relevant"],
      bgGradient: "from-orange-50 to-amber-50"
    }
  ];

  const streamDetails = [
    {
      id: "madhyamik",
      title: "Madhyamik (Secondary) Curriculum",
      description: "Comprehensive foundation curriculum preparing students for higher secondary education",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "school-primary",
      subjects: [
        { name: "Bengali", icon: <BookOpen className="h-4 w-4" /> },
        { name: "English", icon: <Globe className="h-4 w-4" /> },
        { name: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
        { name: "Physical Science", icon: <Beaker className="h-4 w-4" /> },
        { name: "Life Science", icon: <Microscope className="h-4 w-4" /> },
        { name: "History", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Geography", icon: <Globe className="h-4 w-4" /> },
        { name: "Health Education", icon: <Award className="h-4 w-4" /> }
      ]
    },
    {
      id: "science",
      title: "Science Stream (Higher Secondary)",
      description: "Advanced scientific education for careers in engineering, medicine, and research",
      icon: <Microscope className="h-6 w-6" />,
      color: "school-secondary",
      subjects: [
        { name: "Physics", icon: <Beaker className="h-4 w-4" /> },
        { name: "Chemistry", icon: <Microscope className="h-4 w-4" /> },
        { name: "Biology", icon: <Award className="h-4 w-4" /> },
        { name: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
        { name: "Computer Application", icon: <Computer className="h-4 w-4" /> },
        { name: "Environmental Science", icon: <Globe className="h-4 w-4" /> }
      ]
    },
    {
      id: "commerce",
      title: "Commerce Stream (Higher Secondary)",
      description: "Business and finance education for careers in banking, entrepreneurship, and management",
      icon: <Calculator className="h-6 w-6" />,
      color: "school-primary",
      subjects: [
        { name: "Accountancy", icon: <Calculator className="h-4 w-4" /> },
        { name: "Business Studies", icon: <Building className="h-4 w-4" /> },
        { name: "Economics", icon: <Globe className="h-4 w-4" /> },
        { name: "Mathematics", icon: <Calculator className="h-4 w-4" /> },
        { name: "Commercial Law", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Commercial Tax", icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      id: "arts",
      title: "Arts Stream (Higher Secondary)",
      description: "Humanities and social sciences for careers in law, academia, and social research",
      icon: <Palette className="h-6 w-6" />,
      color: "school-secondary",
      subjects: [
        { name: "History", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Geography", icon: <Globe className="h-4 w-4" /> },
        { name: "Political Science", icon: <Award className="h-4 w-4" /> },
        { name: "Philosophy", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Economics", icon: <Calculator className="h-4 w-4" /> },
        { name: "Environmental Science", icon: <Microscope className="h-4 w-4" /> }
      ]
    }
  ];

  const coActivities = [
    {
      id: 1,
      title: "Science Club",
      description: "Hands-on experiments, research projects, and scientific exploration beyond the classroom.",
      icon: <Microscope className="h-8 w-8" />,
      image: "/images/home/classroom.png",
      schedule: "Every Monday, 4:00 PM",
      activities: ["Lab Experiments", "Science Fair", "Research Projects", "Field Trips"]
    },
    {
      id: 2,
      title: "Literary Society",
      description: "Developing language skills through creative writing, debates, and literary discussions.",
      icon: <BookOpen className="h-8 w-8" />,
      image: "/images/home/dtnhs_child.jfif",
      schedule: "Every Wednesday, 4:00 PM",
      activities: ["Creative Writing", "Debates", "Poetry Recitation", "Drama Club"]
    },
    {
      id: 3,
      title: "Sports Programs",
      description: "Comprehensive sports training and competitive events for physical fitness and teamwork.",
      icon: <Trophy className="h-8 w-8" />,
      image: "/images/home/dtnhs_sports.jpg",
      schedule: "Daily, 3:30-5:00 PM",
      activities: ["Cricket", "Football", "Basketball", "Athletics"]
    },
    {
      id: 4,
      title: "Cultural Events",
      description: "Artistic expression through music, dance, drama, and cultural festival celebrations.",
      icon: <Music className="h-8 w-8" />,
      image: "/images/home/dtnhs_whole.jfif",
      schedule: "Every Friday, 3:30 PM",
      activities: ["Annual Day", "Cultural Fest", "Music Competition", "Dance Performance"]
    }
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Academic Excellence"
        description="Comprehensive education programs designed to nurture young minds and build future leaders"
      />

      {/* Academic Stats Section */}
      <section className="py-8 bg-gradient-to-br from-school-primary/5 to-school-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {academicStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="text-school-primary mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-school-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="programs" className="w-full">
            {/* Enhanced Tab Navigation */}
            <div className="w-full overflow-x-auto">
              <TabsList className="grid grid-cols-3 w-full min-w-[400px] h-auto p-1">
                <TabsTrigger 
                  value="programs" 
                  className="flex flex-col items-center gap-1 py-3 px-4 text-sm"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span>Programs</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="curriculum" 
                  className="flex flex-col items-center gap-1 py-3 px-4 text-sm"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Curriculum</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activities" 
                  className="flex flex-col items-center gap-1 py-3 px-4 text-sm"
                >
                  <Trophy className="h-5 w-5" />
                  <span>Activities</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Programs Tab */}
            <TabsContent value="programs" className="mt-8 space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Educational Programs</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  From foundational learning to specialized education, our programs cater to every stage of academic growth
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {programs.map((program, index) => (
                  <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                          {program.icon}
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {program.grades}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                      <p className="text-muted-foreground mb-4">{program.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-school-primary rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full group">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="mt-8 space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Academic Curriculum</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Structured learning paths designed to build comprehensive knowledge and critical thinking skills
                </p>
              </div>

              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {streamDetails.map((stream) => (
                    <AccordionItem 
                      key={stream.id} 
                      value={stream.id} 
                      className="border border-muted rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-school-primary/5 text-left">
                        <div className="flex items-center gap-4 w-full">
                          <div className={`p-3 rounded-full bg-${stream.color}/10 text-${stream.color}`}>
                            {stream.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-left">{stream.title}</h3>
                            <p className="text-sm text-muted-foreground text-left mt-1">{stream.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-6 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          {stream.subjects.map((subject, idx) => (
                            <Card key={idx} className="p-3 bg-school-primary/5 border-school-primary/20 hover:bg-school-primary/10 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="text-school-primary">{subject.icon}</div>
                                <span className="font-medium">{subject.name}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                        
                        <div className="flex gap-3 mt-6">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Syllabus
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Sample Papers
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Quick Links */}
              <Card className="bg-gradient-to-r from-school-primary/10 to-school-secondary/10 border-school-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-center">Academic Resources</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/syllabus">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                        <FileText className="w-5 h-5" />
                        <span className="text-xs">Syllabus</span>
                      </Button>
                    </Link>
                    <Link to="/exam-schedule">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                        <Calendar className="w-5 h-5" />
                        <span className="text-xs">Exam Schedule</span>
                      </Button>
                    </Link>
                    <Link to="/previous-year-papers">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-xs">Previous Papers</span>
                      </Button>
                    </Link>
                    <Link to="/results">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                        <Award className="w-5 h-5" />
                        <span className="text-xs">Results</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="mt-8 space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Co-curricular Activities</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Beyond academics, we foster creativity, leadership, and personal growth through diverse activities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white">
                          {activity.icon}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{activity.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.schedule}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{activity.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-school-primary">Key Activities:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {activity.activities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-school-secondary rounded-full" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Activity Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-school-primary" />
                    Weekly Activity Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                      <div key={day} className="text-center p-3 bg-school-primary/5 rounded-lg">
                        <div className="font-semibold text-sm mb-2">{day}</div>
                        <div className="text-xs text-muted-foreground">
                          {index === 0 && "Science Club"}
                          {index === 2 && "Literary Society"}
                          {index === 4 && "Cultural Events"}
                          {index === 5 && "Sports Training"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
