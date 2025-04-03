
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import PageLoader from "@/components/shared/PageLoader";
import { School, Users, Clock, Award, GraduationCap, Target, BookOpen, Medal, Trophy } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
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
      
      <section className="py-12 md:py-16 relative">
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
            
            {/* Our History Section */}
            <div id="history" className="scroll-mt-20 mb-16">
              <AnimatedSection animation="fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                    <School className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">Our History</h2>
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
            </div>
            
            {/* Principal's Message Section */}
            <div id="principal" className="scroll-mt-20 mb-16">
              <AnimatedSection animation="fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">Principal's Message</h2>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-5 border border-border sticky top-20">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-school-primary/10 flex items-center justify-center mb-3">
                          <span className="text-3xl md:text-4xl font-bold text-school-primary">RB</span>
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
                  
                  <div className="lg:w-2/3">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-border">
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
            </div>
            
            {/* Our Mission Section */}
            <div id="mission" className="scroll-mt-20 mb-16">
              <AnimatedSection animation="fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">Our Mission</h2>
                </div>
                
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Our mission is to provide a comprehensive education that develops the intellectual, social, emotional, and physical aspects of each student. We strive to:
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                      <CardContent className="p-4 flex items-start">
                        <BookOpen className="h-5 w-5 mt-0.5 mr-3 text-school-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Foster a love for learning</h4>
                          <p className="mt-1 text-sm">Instill intellectual curiosity and a lifelong passion for knowledge</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                      <CardContent className="p-4 flex items-start">
                        <Users className="h-5 w-5 mt-0.5 mr-3 text-school-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Cultivate critical thinking</h4>
                          <p className="mt-1 text-sm">Develop analytical skills and problem-solving abilities</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                      <CardContent className="p-4 flex items-start">
                        <GraduationCap className="h-5 w-5 mt-0.5 mr-3 text-school-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Instill strong values</h4>
                          <p className="mt-1 text-sm">Build character through moral and ethical education</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                      <CardContent className="p-4 flex items-start">
                        <Award className="h-5 w-5 mt-0.5 mr-3 text-school-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Prepare for the future</h4>
                          <p className="mt-1 text-sm">Equip students for the challenges of a changing world</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Our Vision Section */}
            <div id="vision" className="scroll-mt-20 mb-16">
              <AnimatedSection animation="fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">Our Vision</h2>
                </div>
                
                <div className="mt-6 bg-white/60 dark:bg-gray-800/60 border border-border rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-sm">
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
            </div>

            {/* School Information and Leadership */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
              <div className="lg:col-span-2">
                {/* Core Values Section */}
                <AnimatedSection animation="fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-school-primary/10 text-school-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-school-primary">Our Core Values</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "Excellence",
                        description: "We strive for excellence in all aspects of education and encourage our students to do the same.",
                        icon: <Award className="h-6 w-6" />
                      },
                      {
                        title: "Integrity",
                        description: "We uphold the highest standards of honesty, ethics, and moral values in all our actions.",
                        icon: <Shield className="h-6 w-6" />
                      },
                      {
                        title: "Respect",
                        description: "We foster a culture of mutual respect, tolerance, and appreciation for diversity.",
                        icon: <Users className="h-6 w-6" />
                      },
                      {
                        title: "Innovation",
                        description: "We embrace new ideas and approaches to enhance the learning experience and prepare for the future.",
                        icon: <Lightbulb className="h-6 w-6" />
                      }
                    ].map((value, i) => (
                      <Card key={i} className="bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 transition-colors border-school-primary/20 hover:border-school-primary">
                        <CardContent className="p-4 flex items-start">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-school-primary/10 text-school-primary flex-shrink-0">
                            {value.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{value.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
              
              <div>
                <AnimatedSection animation="fade-in-up">
                  <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-school-primary/20 hover:border-school-primary transition-colors shadow-md hover:shadow-lg">
                    <CardContent className="p-4 md:p-6">
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
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center mb-4">
                        <Users className="h-5 w-5 text-school-primary mr-2" />
                        <h3 className="text-xl font-semibold text-school-primary">School Leadership</h3>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center p-3 bg-school-primary/5 dark:bg-school-primary/10 rounded-lg border border-school-primary/20">
                          <div className="h-12 w-12 rounded-full bg-school-primary/20 flex items-center justify-center text-school-primary mr-3 flex-shrink-0">
                            <span className="font-bold text-lg">RB</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Dr. Rajesh Banerjee</h4>
                            <p className="text-sm text-muted-foreground">Principal</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-school-primary/10 flex items-center justify-center text-school-primary mr-3 flex-shrink-0">
                            <span className="font-bold text-lg">AC</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Mrs. Anjali Chatterjee</h4>
                            <p className="text-sm text-muted-foreground">Vice Principal</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-school-primary/10 flex items-center justify-center text-school-primary mr-3 flex-shrink-0">
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
                    <CardContent className="p-4 md:p-6">
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
            
            {/* Quick Navigation */}
            <div className="mb-12">
              <AnimatedSection animation="fade-in-up">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-school-primary" />
                    Explore Our School
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="#history" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <School className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Our History</span>
                    </a>
                    
                    <a href="#principal" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <Users className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Principal's Message</span>
                    </a>
                    
                    <a href="#mission" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <Target className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Our Mission</span>
                    </a>
                    
                    <a href="#vision" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <Trophy className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Our Vision</span>
                    </a>
                    
                    <a href="/teachers" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <GraduationCap className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Our Teachers</span>
                    </a>
                    
                    <a href="/contact" className="flex items-center p-3 bg-school-primary/5 hover:bg-school-primary/10 rounded-lg transition-colors group">
                      <Mail className="h-5 w-5 mr-3 text-school-primary group-hover:scale-110 transition-transform" />
                      <span>Contact Us</span>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
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

const Mail = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default About;
