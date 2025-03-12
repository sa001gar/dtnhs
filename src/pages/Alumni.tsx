
import React from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Linkedin, MapPin, Briefcase, Calendar } from "lucide-react";
import PageLoader from "@/components/shared/PageLoader";

const Alumni = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const alumni = {
    distinguished: [
      {
        id: 1,
        name: "Dr. Rahul Sharma",
        batch: "1998",
        profession: "Neurosurgeon",
        organization: "Apollo Hospitals",
        location: "Delhi, India",
        achievement: "Pioneer in minimally invasive brain surgery",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Priya Patel",
        batch: "2005",
        profession: "Environmental Scientist",
        organization: "United Nations",
        location: "Geneva, Switzerland",
        achievement: "Led climate change initiatives across South Asia",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 3,
        name: "Vikram Malhotra",
        batch: "1995",
        profession: "Tech Entrepreneur",
        organization: "Innovate Solutions",
        location: "Bangalore, India",
        achievement: "Founded three successful tech startups",
        image: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ],
    recent: [
      {
        id: 4,
        name: "Anika Singh",
        batch: "2018",
        profession: "Software Engineer",
        organization: "Google",
        location: "Hyderabad, India",
        achievement: "Developed AI algorithms for Google Search",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        id: 5,
        name: "Rohit Kumar",
        batch: "2020",
        profession: "Financial Analyst",
        organization: "Goldman Sachs",
        location: "Mumbai, India",
        achievement: "Youngest team leader in the Mumbai office",
        image: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      {
        id: 6,
        name: "Meera Reddy",
        batch: "2019",
        profession: "Journalist",
        organization: "The Times of India",
        location: "Chennai, India",
        achievement: "National Award for investigative journalism",
        image: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      {
        id: 7,
        name: "Arjun Kapoor",
        batch: "2017",
        profession: "Civil Engineer",
        organization: "Larsen & Toubro",
        location: "Pune, India",
        achievement: "Led the design team for Mumbai's new coastal highway",
        image: "https://randomuser.me/api/portraits/men/54.jpg"
      }
    ]
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Our Alumni Network"
        description="Meet the exceptional graduates who have made their mark in various fields across the globe."
        pattern="dots"
        backgroundImage="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=1920"
        className="bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <AnimatedSection animation="fade-in-up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Alumni Excellence</h2>
            <p className="text-muted-foreground">
              Our alumni represent the success of our educational mission. They have gone on to excel in various fields including medicine, technology, arts, business, and public service.
            </p>
          </div>
        </AnimatedSection>

        <Tabs defaultValue="distinguished" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-2">
            <TabsTrigger value="distinguished">Distinguished Alumni</TabsTrigger>
            <TabsTrigger value="recent">Recent Graduates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distinguished">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumni.distinguished.map((person, index) => (
                <AnimatedSection key={person.id} animation="fade-in-up" delay={index * 100}>
                  <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2 flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{person.name}</CardTitle>
                      <div className="flex items-center justify-center mt-1 text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Batch of {person.batch}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        {person.profession}
                      </Badge>
                      <div className="flex items-center justify-center mt-2 text-sm">
                        <Briefcase className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span>{person.organization}</span>
                      </div>
                      <div className="flex items-center justify-center mt-2 text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span>{person.location}</span>
                      </div>
                      <p className="mt-4 text-sm">{person.achievement}</p>
                      <a 
                        href="#" 
                        className="inline-flex items-center mt-4 text-school-primary hover:underline"
                      >
                        <LinkedIn className="w-4 h-4 mr-1" />
                        <span>Connect</span>
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumni.recent.map((person, index) => (
                <AnimatedSection key={person.id} animation="fade-in-up" delay={index * 100}>
                  <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2 flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-3">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <div className="flex items-center justify-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Batch of {person.batch}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {person.profession}
                      </Badge>
                      <div className="flex items-center justify-center mt-2 text-xs">
                        <Briefcase className="w-3 h-3 mr-1 text-muted-foreground" />
                        <span>{person.organization}</span>
                      </div>
                      <div className="flex items-center justify-center mt-2 text-xs">
                        <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                        <span>{person.location}</span>
                      </div>
                      <p className="mt-3 text-xs">{person.achievement}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <AnimatedSection animation="fade-in-up" delay={300} className="mt-16">
          <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-md">
            <CardHeader>
              <CardTitle className="text-center">Join Our Alumni Network</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">Are you an alumnus of our school? Connect with us to stay updated and participate in our alumni events.</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="bg-school-primary text-white px-6 py-2 rounded-md hover:bg-school-primary/90 transition-colors">
                  Register
                </a>
                <a href="#" className="bg-muted text-foreground px-6 py-2 rounded-md hover:bg-muted/80 transition-colors">
                  Alumni Events
                </a>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default Alumni;
