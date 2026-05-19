
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Calendar, Award, Clock, Users, FileText, 
  GraduationCap, Trophy, Heart, Star, Target, MapPin,
  Phone, Mail, Building, Shield, Lightbulb, Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import PageLoader from "@/components/shared/PageLoader";

const Students: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const upcomingEvents = [
    { title: "Mid-Term Exams", date: "March 15-25, 2025", type: "exam" },
    { title: "Annual Sports Day", date: "April 10, 2025", type: "sports" },
    { title: "Science Exhibition", date: "April 20, 2025", type: "academic" },
    { title: "Annual Cultural Day", date: "December 15, 2025", type: "cultural" },
  ];

  const quickLinks = [
    { title: "Syllabus & Curriculum", href: "/syllabus", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Class Routines", href: "/routine", icon: <Clock className="h-4 w-4" /> },
    { title: "Exam Schedule", href: "/exam-schedule", icon: <Calendar className="h-4 w-4" /> },
    { title: "Previous Papers", href: "/previous-year-papers", icon: <FileText className="h-4 w-4" /> },
    { title: "Results", href: "/results", icon: <Award className="h-4 w-4" /> },
    { title: "Notices", href: "/notices", icon: <Bell className="h-4 w-4" /> },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Student Portal"
        description="Your gateway to academic resources, activities, and student support services at DTNHS"
      />
      
      {/* Quick Stats Section */}
      <section className="py-8 bg-gradient-to-br from-school-primary/5 to-school-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Users className="h-8 w-8 mx-auto text-school-primary mb-2" />
                <div className="text-2xl font-bold text-school-primary">1200+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <GraduationCap className="h-8 w-8 mx-auto text-school-secondary mb-2" />
                <div className="text-2xl font-bold text-school-secondary">60+</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Award className="h-8 w-8 mx-auto text-school-primary mb-2" />
                <div className="text-2xl font-bold text-school-primary">98%</div>
                <div className="text-sm text-muted-foreground">Pass Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Trophy className="h-8 w-8 mx-auto text-school-secondary mb-2" />
                <div className="text-2xl font-bold text-school-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Awards</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="resources" className="w-full">
            {/* Mobile-friendly tabs with horizontal scroll */}
            <div className="w-full overflow-x-auto">
              <TabsList className="grid grid-cols-4 w-full min-w-[400px] h-auto p-1">
                <TabsTrigger 
                  value="resources" 
                  className="flex flex-col items-center gap-1 py-2 px-2 text-xs sm:text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Resources</span>
                  <span className="sm:hidden">Study</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activities" 
                  className="flex flex-col items-center gap-1 py-2 px-2 text-xs sm:text-sm"
                >
                  <Trophy className="h-4 w-4" />
                  <span className="hidden sm:inline">Activities</span>
                  <span className="sm:hidden">Sports</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="flex flex-col items-center gap-1 py-2 px-2 text-xs sm:text-sm"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Support</span>
                  <span className="sm:hidden">Help</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements" 
                  className="flex flex-col items-center gap-1 py-2 px-2 text-xs sm:text-sm"
                >
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Achievements</span>
                  <span className="sm:hidden">Awards</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-6 space-y-6">
              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                {quickLinks.map((link, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 lg:p-4 text-center">
                      <Link to={link.href} className="block">
                        <div className="text-school-primary mb-2">{link.icon}</div>
                        <div className="text-xs lg:text-sm font-medium leading-tight">
                          {link.title}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Academic Resources */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-school-primary" />
                      Academic Resources
                    </CardTitle>
                    <CardDescription>
                      Everything you need for your academic success
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-school-primary">Study Materials</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <Link to="/syllabus" className="hover:text-school-primary">
                              Subject-wise Syllabus
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <Link to="/previous-year-papers" className="hover:text-school-primary">
                              Previous Question Papers
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <Link to="/routine" className="hover:text-school-primary">
                              Study Materials & Notes
                            </Link>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-school-primary">Examination</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <Link to="/exam-schedule" className="hover:text-school-primary">
                              Exam Schedule
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <Link to="/results" className="hover:text-school-primary">
                              Results & Report Cards
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-school-secondary rounded-full" />
                            <span className="text-muted-foreground">Hall Tickets</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Important Dates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-school-primary" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex flex-col space-y-1 p-3 bg-school-primary/5 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{event.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full mt-4">
                      <Link to="/notices">View All Events</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Student Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-school-primary" />
                    Student Guidelines & Code of Conduct
                  </CardTitle>
                  <CardDescription>
                    Important guidelines for all DTNHS students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold text-school-primary mb-3">Dress Code</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• White shirt with school tie</li>
                        <li>• Navy blue trousers/skirt</li>
                        <li>• Black shoes, white socks</li>
                        <li>• School blazer in winter</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-school-primary mb-3">Attendance</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Minimum 75% required</li>
                        <li>• Leave applications mandatory</li>
                        <li>• Medical certificates needed</li>
                        <li>• Parent notification system</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-school-primary mb-3">Discipline</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Respect for all community</li>
                        <li>• Maintain classroom order</li>
                        <li>• No mobile phones</li>
                        <li>• Care for school property</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-school-primary mb-3">Assessment</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Regular class tests</li>
                        <li>• Mid-term & final exams</li>
                        <li>• Project work</li>
                        <li>• Parent-teacher meetings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activities Tab */}
            <TabsContent value="activities" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-school-primary" />
                      Sports Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Participate in various sports including cricket, football, badminton, 
                      basketball, table tennis, and athletics competitions.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Cricket Team</Badge>
                      <Badge variant="outline">Football Team</Badge>
                      <Badge variant="outline">Athletics</Badge>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/gallery">View Sports Gallery</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-school-primary" />
                      Cultural Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Express your creativity through music, dance, drama, and art. 
                      Join our cultural events and competitions.
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">Annual Day</Badge>
                      <Badge variant="outline">Drama Club</Badge>
                      <Badge variant="outline">Music Choir</Badge>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/gallery">View Cultural Events</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-school-primary" />
                      Clubs & Societies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Join various clubs to explore your interests and develop new skills 
                      in science, technology, and arts.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-xs">
                        <div className="font-medium">Science Club</div>
                        <div className="text-muted-foreground">Mondays 4:00 PM</div>
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">Literary Club</div>
                        <div className="text-muted-foreground">Wed 4:00 PM</div>
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">Eco Club</div>
                        <div className="text-muted-foreground">Fridays 3:30 PM</div>
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">Robotics Club</div>
                        <div className="text-muted-foreground">Saturdays 2:00 PM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Support Tab */}
            <TabsContent value="support" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-school-primary" />
                    Student Support Services
                  </CardTitle>
                  <CardDescription>
                    Comprehensive support system to help you succeed academically and personally
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-l-4 border-l-school-primary">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-school-primary mb-2">Academic Counseling</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Get guidance on study strategies, time management, career planning, 
                          and subject selection from our experienced counselors.
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">Mrs. Suchitra Roy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span>academic.counselor@dtnhs.edu.in</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>Mon-Fri: 10:00 AM - 3:00 PM</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-school-secondary">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-school-secondary mb-2">Personal Counseling</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Confidential support for personal, emotional, or social issues. 
                          Schedule appointments or visit during open hours.
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">Mr. Debashish Ghosh</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span>counselor@dtnhs.edu.in</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>+91 9830 456 789</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-school-primary">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-school-primary mb-2">Health Services</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          On-campus infirmary with qualified nurse, first aid, basic medical care, 
                          and regular health check-ups for all students.
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">Mrs. Anjali Das (Nurse)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>Ground Floor, Main Building</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>8:00 AM - 4:00 PM (Mon-Fri)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-school-secondary">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-school-secondary mb-2">Library Services</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Well-stocked library with books, journals, digital resources, 
                          reading rooms, and computer access for research.
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">Mr. Amit Sen (Librarian)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-3 w-3" />
                            <span>First Floor, Academic Block</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>8:30 AM - 4:30 PM (Mon-Sat)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-school-primary" />
                    Student Achievements & Recognition
                  </CardTitle>
                  <CardDescription>
                    Celebrating the outstanding accomplishments of our DTNHS students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-school-primary/5 to-school-primary/10">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-school-primary" />
                          Academic Excellence
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Ananya Chatterjee (Class XII)</strong> - 3rd Rank in WBBSE 2023</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Rahul Das (Class X)</strong> - National Science Olympiad Qualifier</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Priya Sharma (Class XI)</strong> - State Math Competition Winner</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Trophy className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>School Achievement:</strong> 98% Board Exam Pass Rate 2023</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-school-secondary/5 to-school-secondary/10">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-school-secondary" />
                          Sports Champions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-secondary mt-0.5 flex-shrink-0" />
                            <span><strong>Cricket Team</strong> - District Champions 2023</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-secondary mt-0.5 flex-shrink-0" />
                            <span><strong>Vishal Singh (Class IX)</strong> - State Athletics Gold Medal</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-secondary mt-0.5 flex-shrink-0" />
                            <span><strong>Girls Basketball</strong> - Zonal Tournament Runners-up</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Trophy className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Overall Champions</strong> - Inter-School Sports Meet 2023</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-school-primary/5 to-school-secondary/5">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="h-5 w-5 text-school-primary" />
                          Cultural Arts
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Drama Team</strong> - State Level Competition Winners</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Tanisha Roy (Class IX)</strong> - National Painting Competition</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>School Choir</strong> - District Music Competition Winners</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-school-secondary/5 to-school-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-school-secondary" />
                          Innovation & Others
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-secondary mt-0.5 flex-shrink-0" />
                            <span><strong>Eco Club</strong> - Green School Award 2023</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-school-secondary mt-0.5 flex-shrink-0" />
                            <span><strong>Robotics Team</strong> - State Level 2nd Prize</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Trophy className="h-4 w-4 text-school-primary mt-0.5 flex-shrink-0" />
                            <span><strong>Science Exhibition</strong> - National Level Recognition</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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

export default Students;
