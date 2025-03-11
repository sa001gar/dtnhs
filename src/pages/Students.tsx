
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Award, Clock, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Students: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <PageHeader
          title="Student Portal"
          subtitle="Resources, information, and support for our students."
        />
        
        <section className="py-16">
          <div className="container px-4">
            <Tabs defaultValue="resources" className="mx-auto max-w-5xl">
              <AnimatedSection animation="fade-in-up">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
              </AnimatedSection>
              
              <TabsContent value="resources" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-school-primary" />
                          <CardTitle>Academic Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <Link to="/academics" className="text-sm text-muted-foreground hover:text-school-primary">
                              Syllabus & Curriculum
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Link to="/routine" className="text-sm text-muted-foreground hover:text-school-primary">
                              Class Routines
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <Link to="/academics" className="text-sm text-muted-foreground hover:text-school-primary">
                              Exam Schedule
                            </Link>
                          </li>
                          <li className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <Link to="/results" className="text-sm text-muted-foreground hover:text-school-primary">
                              Previous Year Question Papers
                            </Link>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-school-primary" />
                          <CardTitle>Important Dates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Mid-Term Exams</span>
                            <span className="text-sm font-medium">August 15-25, 2023</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Sports Day</span>
                            <span className="text-sm font-medium">September 10, 2023</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Annual Day</span>
                            <span className="text-sm font-medium">December 15, 2023</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Final Exams</span>
                            <span className="text-sm font-medium">February 10-25, 2024</span>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <Button asChild variant="outline" size="sm">
                            <Link to="/notices">View Full Calendar</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-school-primary" />
                          <CardTitle>Student Guidelines</CardTitle>
                        </div>
                        <CardDescription>
                          Important rules and guidelines for all students
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h4 className="font-medium text-school-primary">Dress Code</h4>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              <li>• Boys: White shirt, navy blue trousers, school tie</li>
                              <li>• Girls: White shirt, navy blue skirt/trousers, school tie</li>
                              <li>• Black shoes and white socks for all students</li>
                              <li>• School blazer during winter season</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-school-primary">Attendance</h4>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              <li>• Minimum 75% attendance is mandatory</li>
                              <li>• Leave application must be submitted for absence</li>
                              <li>• Medical certificate required for extended absence</li>
                              <li>• Parents will be notified for frequent absences</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-school-primary">Conduct</h4>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              <li>• Respectful behavior towards teachers and peers</li>
                              <li>• Maintain discipline in classrooms and corridors</li>
                              <li>• No use of mobile phones during school hours</li>
                              <li>• Care for school property and environment</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-school-primary">Evaluation</h4>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              <li>• Regular class tests and assignments</li>
                              <li>• Mid-term and final examinations</li>
                              <li>• Project work and practical assessments</li>
                              <li>• Parent-teacher meetings to discuss progress</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Our school offers various sports activities including cricket, football, badminton, basketball, table tennis, and athletics. Students can participate in inter-class and inter-school competitions.
                        </p>
                        <div className="mt-4">
                          <Button asChild variant="outline" size="sm">
                            <Link to="/gallery">View Sports Gallery</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Cultural Activities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Students can showcase their talents in singing, dancing, drama, and music. We organize annual cultural events, competitions, and celebration of various festivals.
                        </p>
                        <div className="mt-4">
                          <Button asChild variant="outline" size="sm">
                            <Link to="/gallery">View Cultural Gallery</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Clubs & Societies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Join our various clubs including Science Club, Literary Club, Eco Club, Robotics Club, Art & Craft Club, and more to explore your interests.
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                          <li>• Science Club - Every Monday (4:00 PM)</li>
                          <li>• Literary Club - Every Wednesday (4:00 PM)</li>
                          <li>• Eco Club - Every Friday (3:30 PM)</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="support" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Support Services</CardTitle>
                      <CardDescription>
                        We offer various support services to help students succeed academically and personally.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-school-primary">Academic Counseling</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Our academic counselors help students with study strategies, time management, and career guidance. They also assist with subject selection and examination preparation.
                          </p>
                          <div className="mt-4">
                            <p className="text-sm font-medium">Contact: Mrs. Suchitra Roy</p>
                            <p className="text-sm text-muted-foreground">Email: academic.counselor@dtnhs.edu.in</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Personal Counseling</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Our school counselor provides confidential support for students dealing with personal, emotional, or social issues. Students can schedule appointments or drop in during designated hours.
                          </p>
                          <div className="mt-4">
                            <p className="text-sm font-medium">Contact: Mr. Debashish Ghosh</p>
                            <p className="text-sm text-muted-foreground">Email: counselor@dtnhs.edu.in</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Health Services</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Our school infirmary provides first aid and basic medical care. Regular health check-ups are conducted for all students. We also organize health awareness programs.
                          </p>
                          <div className="mt-4">
                            <p className="text-sm font-medium">School Nurse: Mrs. Anjali Das</p>
                            <p className="text-sm text-muted-foreground">Infirmary Hours: 8:00 AM - 4:00 PM (Monday to Friday)</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Library Services</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Our well-stocked library has a wide collection of books, journals, and digital resources. Students can borrow books and use the reading room for studying.
                          </p>
                          <div className="mt-4">
                            <p className="text-sm font-medium">Librarian: Mr. Amit Sen</p>
                            <p className="text-sm text-muted-foreground">Library Hours: 8:30 AM - 4:30 PM (Monday to Saturday)</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Achievements</CardTitle>
                      <CardDescription>
                        Celebrating the success of our students in various fields.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-school-primary">Academic Achievements</h4>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>• Ananya Chatterjee (Class XII) - 3rd Rank in WBBSE Examination 2023</li>
                            <li>• Rahul Das (Class X) - Selected for National Science Olympiad 2023</li>
                            <li>• Priya Sharma (Class XI) - 1st Prize in State Level Math Competition</li>
                            <li>• School secured 95% pass rate in Class X Board Exams 2023</li>
                            <li>• 15 students qualified for JEE Mains in 2023</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Sports Achievements</h4>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>• School Cricket Team - Champions, District Tournament 2023</li>
                            <li>• Vishal Singh (Class IX) - Gold Medal, State Athletics Meet 2023</li>
                            <li>• Girls Basketball Team - Runners-up, Zonal Tournament 2023</li>
                            <li>• Arjun Dey (Class XII) - Selected for State Swimming Team</li>
                            <li>• School secured Overall Champions Trophy in Inter-School Sports Meet 2023</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Cultural Achievements</h4>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>• School Drama Team - 1st Prize, State Level Drama Competition</li>
                            <li>• Tanisha Roy (Class IX) - 2nd Prize, National Level Painting Competition</li>
                            <li>• School Choir - 1st Prize, District Level Music Competition</li>
                            <li>• Rohit Banerjee (Class XI) - Selected for National Youth Festival 2023</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-school-primary">Other Achievements</h4>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>• School Eco Club - Green School Award 2023</li>
                            <li>• Robotics Team - 2nd Prize, State Level Robotics Competition</li>
                            <li>• School secured Best Discipline Award in Youth Festival 2023</li>
                            <li>• Science Exhibition Team - Special Appreciation Award at National Level</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Students;
