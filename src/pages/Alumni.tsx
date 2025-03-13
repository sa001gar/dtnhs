
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, MapPin, Briefcase, ExternalLink, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/shared/PageLoader";

const Alumni = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const alumniData = [
    {
      id: 1,
      name: "Rajiv Kumar",
      batch: "Class of 2010",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New Delhi, India",
      education: "B.Tech, Computer Science (IIT Delhi)",
      profession: "Senior Software Engineer at Microsoft",
      achievements: ["National Merit Scholarship", "Published research on AI algorithms"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/"
      },
      description: "Rajiv has been leading technological innovations at Microsoft, focusing on cloud computing solutions. He credits his foundational learning at our school for his analytical thinking skills."
    },
    {
      id: 2,
      name: "Sneha Sharma",
      batch: "Class of 2005",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "Bengaluru, India",
      education: "MBBS, MD (AIIMS)",
      profession: "Senior Cardiologist at Apollo Hospitals",
      achievements: ["Gold Medalist in Medical School", "Published 12 research papers"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/"
      },
      description: "Dr. Sneha is a respected cardiologist who has pioneered several minimally invasive surgical techniques. She fondly remembers her science classes at our school that sparked her interest in medicine."
    },
    {
      id: 3,
      name: "Amit Patel",
      batch: "Class of 2008",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      location: "Mumbai, India",
      education: "MBA (IIM Ahmedabad)",
      profession: "Founder & CEO of GreenTech Solutions",
      achievements: ["Forbes 30 Under 30", "Environmental Conservation Award"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/"
      },
      description: "Amit's company has been revolutionizing sustainable energy solutions across India. He attributes his entrepreneurial spirit to the leadership opportunities he received at our school."
    },
    {
      id: 4,
      name: "Priya Desai",
      batch: "Class of 2012",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      location: "San Francisco, USA",
      education: "PhD in Artificial Intelligence (Stanford University)",
      profession: "Research Scientist at Google AI",
      achievements: ["Grace Hopper Celebration Scholar", "5 Patents in AI"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        twitter: "https://twitter.com/"
      },
      description: "Priya is working on groundbreaking AI research at Google. She remembers how her mathematics teacher at our school encouraged her to pursue her interest in algorithms and computational thinking."
    }
  ];

  const notableAlumni = alumniData.slice(0, 2);
  const allAlumni = alumniData;

  const batches = ["All", "2000-2005", "2006-2010", "2011-2015", "2016-2020"];

  const filteredAlumni = alumniData.filter(alumni => 
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.education.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Alumni Network"
        description="Connect with our successful graduates who are making an impact across the globe."
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <AnimatedSection animation="fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 max-w-sm"
                  />
                </div>
                
                <Tabs defaultValue="All" className="w-full sm:w-auto">
                  <TabsList className="flex flex-wrap">
                    {batches.map((batch) => (
                      <TabsTrigger key={batch} value={batch} className="text-xs sm:text-sm">
                        {batch}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {filteredAlumni.length === 0 ? (
                <Card className="glass backdrop-blur-sm bg-background/80 border-muted p-8 text-center">
                  <p>No alumni found matching your search.</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAlumni.map((alumni, index) => (
                    <AnimatedSection key={alumni.id} animation="fade-in-up" delay={index * 100}>
                      <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md h-full hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar className="h-16 w-16 border-2 border-border">
                                <AvatarImage src={alumni.image} alt={alumni.name} />
                                <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-bold">{alumni.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mb-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{alumni.batch}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{alumni.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                              <div className="flex items-start gap-2">
                                <Briefcase className="h-4 w-4 text-school-primary mt-1 shrink-0" />
                                <div>
                                  <p className="font-medium">Current Position</p>
                                  <p className="text-sm text-muted-foreground">{alumni.profession}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Calendar className="h-4 w-4 text-school-primary mt-1 shrink-0" />
                                <div>
                                  <p className="font-medium">Education</p>
                                  <p className="text-sm text-muted-foreground">{alumni.education}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex gap-2">
                                {alumni.socialLinks.linkedin && (
                                  <a 
                                    href={alumni.socialLinks.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                              <Button variant="ghost" className="text-school-primary hover:text-school-primary/90 hover:bg-school-primary/10 p-0">
                                <span className="mr-1">View Profile</span>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>

          <div className="lg:w-1/4">
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Alumni Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Alumni</span>
                      <span className="font-medium">2,500+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Countries</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industries</span>
                      <span className="font-medium">45+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Join Alumni Network</CardTitle>
                  <CardDescription>Stay connected with your school community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Register to our alumni network to get updates on events, reunions and opportunities to connect with fellow graduates.
                  </p>
                  <Button className="w-full bg-school-primary hover:bg-school-primary/90">
                    Register Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Reunions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-school-primary pl-4 py-1">
                      <p className="font-medium">Class of 2010 Reunion</p>
                      <p className="text-sm text-muted-foreground">December 15, 2023</p>
                    </div>
                    <div className="border-l-2 border-school-primary pl-4 py-1">
                      <p className="font-medium">Silver Jubilee - Class of 1998</p>
                      <p className="text-sm text-muted-foreground">January 22, 2024</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Events</Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alumni;
