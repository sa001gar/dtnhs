
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <PageHeader
          title="About Our School"
          subtitle="Learn about our history, mission, and vision for the future."
          backgroundImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80"
        />
        
        <section className="py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <AnimatedSection animation="fade-in-up">
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our History</h2>
                    <div className="mt-6 space-y-4 text-muted-foreground">
                      <p>
                        Durgapur Tarak Nath High School was established in 1965 with a vision to provide quality education to the children of Durgapur. Named after the revered educator Tarak Nath Sen, the school began with just a handful of students and a few dedicated teachers.
                      </p>
                      <p>
                        Over the decades, the school has grown significantly, both in terms of infrastructure and reputation. What started as a small institution has now evolved into one of the most respected schools in the region, known for its academic excellence and commitment to holistic education.
                      </p>
                      <p>
                        Throughout its journey, the school has maintained its core values of discipline, integrity, and academic rigor. These principles have guided generations of students who have gone on to make significant contributions in various fields across the globe.
                      </p>
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection animation="fade-in-up" className="mt-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our Mission</h2>
                    <div className="mt-6 space-y-4 text-muted-foreground">
                      <p>
                        Our mission is to provide a comprehensive education that develops the intellectual, social, emotional, and physical aspects of each student. We strive to:
                      </p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>Foster a love for learning and intellectual curiosity</li>
                        <li>Cultivate critical thinking and problem-solving skills</li>
                        <li>Nurture creativity and innovation</li>
                        <li>Instill strong moral and ethical values</li>
                        <li>Prepare students for the challenges of a rapidly changing world</li>
                        <li>Develop responsible citizens who contribute positively to society</li>
                      </ul>
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection animation="fade-in-up" className="mt-12">
                    <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our Vision</h2>
                    <div className="mt-6 space-y-4 text-muted-foreground">
                      <p>
                        We envision Durgapur Tarak Nath High School as a center of educational excellence that:
                      </p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>Provides a stimulating and inclusive learning environment</li>
                        <li>Empowers students to realize their full potential</li>
                        <li>Embraces innovation in teaching methodologies</li>
                        <li>Maintains a harmonious balance between tradition and modernity</li>
                        <li>Serves as a model for other educational institutions</li>
                      </ul>
                    </div>
                  </AnimatedSection>
                </div>
                
                <div>
                  <AnimatedSection animation="fade-in-up">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-school-primary">School Information</h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Founded</h4>
                            <p className="text-muted-foreground">1965</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Affiliation</h4>
                            <p className="text-muted-foreground">West Bengal Board of Secondary Education</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Campus Area</h4>
                            <p className="text-muted-foreground">5 acres</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Students</h4>
                            <p className="text-muted-foreground">Approximately 1,500</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Faculty</h4>
                            <p className="text-muted-foreground">80+ qualified teachers</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Classes</h4>
                            <p className="text-muted-foreground">From Class V to Class XII</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Medium of Instruction</h4>
                            <p className="text-muted-foreground">Bengali and English</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                  
                  <AnimatedSection animation="fade-in-up" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-school-primary">School Leadership</h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-medium">Principal</h4>
                            <p className="text-muted-foreground">Dr. Rajesh Banerjee</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Vice Principal</h4>
                            <p className="text-muted-foreground">Mrs. Anjali Chatterjee</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Academic Coordinator</h4>
                            <p className="text-muted-foreground">Mr. Abhijit Das</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                  
                  <AnimatedSection animation="fade-in-up" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-school-primary">Awards & Recognition</h3>
                        <div className="mt-4 space-y-2">
                          <p className="text-muted-foreground">• Best School Award (2019) - Durgapur Municipal Corporation</p>
                          <p className="text-muted-foreground">• Excellence in Education Award (2017) - West Bengal Education Department</p>
                          <p className="text-muted-foreground">• Outstanding Sports School (2020) - District Sports Association</p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-school-light py-16">
          <div className="container px-4">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-school-primary">Our Core Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                These values guide everything we do at Durgapur Tarak Nath High School.
              </p>
            </AnimatedSection>
            
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatedSection animation="fade-in-up" delay={100}>
                <Card className="text-center" hoverEffect>
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-school-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-school-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Excellence</h3>
                    <p className="mt-2 text-muted-foreground">We strive for excellence in all aspects of education and encourage our students to do the same.</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={200}>
                <Card className="text-center" hoverEffect>
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-school-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-school-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Integrity</h3>
                    <p className="mt-2 text-muted-foreground">We uphold the highest standards of honesty, ethics, and moral values in all our actions.</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={300}>
                <Card className="text-center" hoverEffect>
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-school-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-school-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Respect</h3>
                    <p className="mt-2 text-muted-foreground">We foster a culture of mutual respect, tolerance, and appreciation for diversity.</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={400}>
                <Card className="text-center" hoverEffect>
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-school-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-school-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Innovation</h3>
                    <p className="mt-2 text-muted-foreground">We embrace new ideas and approaches to enhance the learning experience and prepare for the future.</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
