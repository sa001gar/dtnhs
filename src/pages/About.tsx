
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import PageLoader from "@/components/shared/PageLoader";
import { School, Users, Clock, Award, GraduationCap, Target, BookOpen, Medal, Trophy } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Helmet>
        <title>About Us - Durgapur Tarak Nath High School</title>
        <meta name="description" content="Learn about the history, mission, and vision of Durgapur Tarak Nath High School, one of the leading educational institutions since 1941." />
      </Helmet>
      
      <PageHeader
        title="About Our School"
        subtitle="Learn about our history, mission, and vision for the future."
      />
      
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-opacity-50 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-school-primary/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-school-primary/5 dark:bg-school-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-school-secondary/5 dark:bg-school-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <Breadcrumb />
            </div>
            
            <Tabs defaultValue="history" className="w-full mb-12">
              <div className="overflow-x-auto pb-2">
                <TabsList className="border border-border">
                  <TabsTrigger value="history">Our History</TabsTrigger>
                  <TabsTrigger value="principal">Principal's Message</TabsTrigger>
                  <TabsTrigger value="mission">Our Mission</TabsTrigger>
                  <TabsTrigger value="vision">Our Vision</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="history" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                      <School className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our History</h2>
                  </div>
                  
                  <div className="mt-6 space-y-6 text-muted-foreground">
                    <div className="relative border-l-2 border-school-primary/30 pl-6">
                      <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-school-primary"></div>
                      <p className="mb-2 font-semibold text-foreground">Foundation Years (1941-1950)</p>
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        Durgapur Tarak Nath High School was established in 1941 with a vision to provide quality education to the children of Durgapur. Named after the revered educator Tarak Nath Sen, the school began with just a handful of students and a few dedicated teachers in a modest building.
                      </p>
                    </div>
                    
                    <div className="relative border-l-2 border-school-primary/30 pl-6">
                      <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-school-primary"></div>
                      <p className="mb-2 font-semibold text-foreground">Growth & Development (1950-1980)</p>
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        Over the decades, the school has grown significantly, both in terms of infrastructure and reputation. The 1960s saw the construction of new buildings and the expansion of academic programs. By the 1970s, DTNHS had established itself as one of the premier educational institutions in the region.
                      </p>
                    </div>
                    
                    <div className="relative border-l-2 border-school-primary/30 pl-6">
                      <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-school-primary"></div>
                      <p className="mb-2 font-semibold text-foreground">Modern Era (1980-Present)</p>
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        In recent decades, the school has embraced modern educational methodologies while maintaining its core values of discipline, integrity, and academic rigor. The introduction of computer labs, science facilities, and sports infrastructure has enhanced the learning experience for students. Today, DTNHS stands as a testament to educational excellence, nurturing young minds who contribute meaningfully to society across various fields.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="principal" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Principal's Message</h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="rounded-lg overflow-hidden shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-5 border border-border">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-32 h-32 rounded-full bg-school-primary/10 flex items-center justify-center mb-3">
                            <span className="text-4xl font-bold text-school-primary">RB</span>
                          </div>
                          <h3 className="text-xl font-semibold">Dr. Rajesh Banerjee</h3>
                          <p className="text-muted-foreground">Principal</p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <div className="font-medium">Qualification:</div>
                            <div className="ml-2 text-muted-foreground">Ph.D. in Education</div>
                          </div>
                          <div className="flex items-center">
                            <div className="font-medium">Experience:</div>
                            <div className="ml-2 text-muted-foreground">25+ Years</div>
                          </div>
                          <div className="flex items-center">
                            <div className="font-medium">Joined:</div>
                            <div className="ml-2 text-muted-foreground">2015</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-border">
                        <h3 className="text-xl font-semibold mb-4">Message from the Principal</h3>
                        
                        <div className="space-y-4 text-muted-foreground">
                          <p className="leading-relaxed">
                            Dear Students, Parents, and Visitors,
                          </p>
                          <p className="leading-relaxed">
                            It gives me immense pleasure to welcome you to Durgapur Tarak Nath High School, an institution with a rich legacy spanning over eight decades. As we approach our 82nd year of excellence in education, I am proud to lead a school that continues to uphold its founding principles while embracing the needs of modern education.
                          </p>
                          <p className="leading-relaxed">
                            At DTNHS, we believe that education is not merely about academic achievements but about nurturing well-rounded individuals who will contribute meaningfully to society. Our holistic approach focuses on intellectual, physical, emotional, and social development, preparing students not just for examinations but for the challenges of life.
                          </p>
                          <p className="leading-relaxed">
                            Our dedicated faculty members work tirelessly to create a stimulating learning environment where curiosity is encouraged, and critical thinking skills are developed. We emphasize character building alongside academic excellence, instilling values like integrity, respect, and responsibility that will guide our students throughout their lives.
                          </p>
                          <p className="leading-relaxed">
                            The rapidly changing world demands that we prepare our students with skills beyond traditional academics. To this end, we have integrated technology into our teaching methodologies and offer a wide range of extracurricular activities that expose students to diverse fields and interests.
                          </p>
                          <p className="leading-relaxed">
                            Our school's strength lies in the collaborative partnership between teachers, parents, and the community. I invite all stakeholders to actively participate in our educational journey, offering suggestions and support that will help us continue to evolve and improve.
                          </p>
                          <p className="leading-relaxed">
                            To our students, I say: Embrace every opportunity for learning with enthusiasm and perseverance. Remember that true education empowers you to question, to reason, and to contribute positively to the world around you.
                          </p>
                          <p className="leading-relaxed">
                            As we move forward, we remain committed to our mission of providing quality education that prepares students to face future challenges with confidence and compassion.
                          </p>
                          <p className="leading-relaxed">
                            I look forward to working together with all of you to uphold the prestigious legacy of Durgapur Tarak Nath High School and to take it to greater heights.
                          </p>
                          <p className="font-semibold mt-6">
                            Warm Regards,<br />
                            Dr. Rajesh Banerjee<br />
                            Principal, DTNHS
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="mission" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                      <Target className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our Mission</h2>
                  </div>
                  
                  <div className="mt-6 space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Our mission is to provide a comprehensive education that develops the intellectual, social, emotional, and physical aspects of each student. We strive to:
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                        <CardContent className="p-4 flex items-start">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-3 text-school-primary" />
                          <div>
                            <h4 className="font-medium">Foster a love for learning</h4>
                            <p className="mt-1 text-sm">Instill intellectual curiosity and a lifelong passion for knowledge</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                        <CardContent className="p-4 flex items-start">
                          <Users className="h-5 w-5 mt-0.5 mr-3 text-school-primary" />
                          <div>
                            <h4 className="font-medium">Cultivate critical thinking</h4>
                            <p className="mt-1 text-sm">Develop analytical skills and problem-solving abilities</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                        <CardContent className="p-4 flex items-start">
                          <GraduationCap className="h-5 w-5 mt-0.5 mr-3 text-school-primary" />
                          <div>
                            <h4 className="font-medium">Instill strong values</h4>
                            <p className="mt-1 text-sm">Build character through moral and ethical education</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                        <CardContent className="p-4 flex items-start">
                          <Award className="h-5 w-5 mt-0.5 mr-3 text-school-primary" />
                          <div>
                            <h4 className="font-medium">Prepare for the future</h4>
                            <p className="mt-1 text-sm">Equip students for the challenges of a changing world</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AnimatedSection>
              </TabsContent>
              
              <TabsContent value="vision" className="mt-6">
                <AnimatedSection animation="fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our Vision</h2>
                  </div>
                  
                  <div className="mt-6 bg-white/60 dark:bg-gray-800/60 border border-border rounded-xl p-6 backdrop-blur-sm shadow-sm">
                    <p className="text-lg italic text-muted-foreground">"We envision Durgapur Tarak Nath High School as a center of educational excellence that empowers students to become responsible global citizens, innovative thinkers, and compassionate leaders."</p>
                  </div>
                  
                  <div className="mt-6 space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      We aspire to create an educational environment that:
                    </p>
                    <ul className="ml-6 list-disc space-y-3">
                      <li className="leading-relaxed">Provides a stimulating and inclusive learning environment where every student feels valued</li>
                      <li className="leading-relaxed">Empowers students to realize their full potential academically, socially, and physically</li>
                      <li className="leading-relaxed">Embraces innovation in teaching methodologies and educational technologies</li>
                      <li className="leading-relaxed">Maintains a harmonious balance between tradition and modernity</li>
                      <li className="leading-relaxed">Serves as a model for other educational institutions in the region and beyond</li>
                    </ul>
                  </div>
                </AnimatedSection>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* Additional content can be placed here */}
              </div>
              
              <div>
                <AnimatedSection animation="fade-in-up">
                  <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-school-primary/20 hover:border-school-primary transition-colors shadow-md hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <School className="h-5 w-5 text-school-primary mr-2" />
                        <h3 className="text-xl font-semibold text-school-primary">School Information</h3>
                      </div>
                      <div className="mt-4 space-y-4 divide-y divide-border">
                        <div className="flex justify-between pb-2">
                          <h4 className="font-medium">Founded</h4>
                          <p className="text-muted-foreground font-semibold">1941</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Affiliation</h4>
                          <p className="text-muted-foreground text-right">West Bengal Board of Secondary Education</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Campus Area</h4>
                          <p className="text-muted-foreground">5 acres</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Students</h4>
                          <p className="text-muted-foreground">~1,500</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Faculty</h4>
                          <p className="text-muted-foreground">80+ teachers</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Classes</h4>
                          <p className="text-muted-foreground">Class V to XII</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-medium">Medium</h4>
                          <p className="text-muted-foreground">Bengali & English</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                
                <AnimatedSection animation="fade-in-up" className="mt-6">
                  <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-school-primary/20 hover:border-school-primary transition-colors shadow-md hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Users className="h-5 w-5 text-school-primary mr-2" />
                        <h3 className="text-xl font-semibold text-school-primary">School Leadership</h3>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center p-3 bg-school-primary/5 dark:bg-school-primary/10 rounded-lg border border-school-primary/20">
                          <div className="h-12 w-12 rounded-full bg-school-primary/20 flex items-center justify-center text-school-primary mr-3">
                            <span className="font-bold text-lg">RB</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Dr. Rajesh Banerjee</h4>
                            <p className="text-sm text-muted-foreground">Principal</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-school-primary/10 flex items-center justify-center text-school-primary mr-3">
                            <span className="font-bold text-lg">AC</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Mrs. Anjali Chatterjee</h4>
                            <p className="text-sm text-muted-foreground">Vice Principal</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-school-primary/10 flex items-center justify-center text-school-primary mr-3">
                            <span className="font-bold text-lg">AD</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Mr. Abhijit Das</h4>
                            <p className="text-sm text-muted-foreground">Academic Coordinator</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                
                <AnimatedSection animation="fade-in-up" className="mt-6">
                  <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-school-primary/20 hover:border-school-primary transition-colors shadow-md hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Medal className="h-5 w-5 text-school-primary mr-2" />
                        <h3 className="text-xl font-semibold text-school-primary">Awards & Recognition</h3>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start">
                          <Award className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Best School Award (2019)</p>
                            <p className="text-sm text-muted-foreground">Durgapur Municipal Corporation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Award className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Excellence in Education (2017)</p>
                            <p className="text-sm text-muted-foreground">West Bengal Education Department</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Award className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Outstanding Sports School (2020)</p>
                            <p className="text-sm text-muted-foreground">District Sports Association</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-br from-school-primary/5 to-school-secondary/5 dark:from-gray-800/50 dark:to-gray-900 py-16">
        <div className="container px-4">
          <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-school-primary/10 dark:bg-school-primary/20 px-3 py-1 text-sm text-school-primary mb-4">
              <Clock className="mr-1 h-4 w-4" />
              <span>Guiding Principles</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              These values guide everything we do at Durgapur Tarak Nath High School.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in all aspects of education and encourage our students to do the same.",
                icon: <Award className="h-8 w-8" />,
                color: "school-primary"
              },
              {
                title: "Integrity",
                description: "We uphold the highest standards of honesty, ethics, and moral values in all our actions.",
                icon: <Shield className="h-8 w-8" />,
                color: "blue"
              },
              {
                title: "Respect",
                description: "We foster a culture of mutual respect, tolerance, and appreciation for diversity.",
                icon: <Users className="h-8 w-8" />,
                color: "purple"
              },
              {
                title: "Innovation",
                description: "We embrace new ideas and approaches to enhance the learning experience and prepare for the future.",
                icon: <Lightbulb className="h-8 w-8" />,
                color: "amber"
              }
            ].map((value, i) => (
              <AnimatedSection key={i} animation="fade-in-up" delay={(i + 1) * 100} className="flex">
                <Card className={`text-center border-${value.color}/20 hover:border-${value.color}/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${value.color}/10 text-${value.color}`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="mt-2 text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Additional components for the About page
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Lightbulb = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

export default About;
