
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import AboutSchool from "@/components/home/AboutSchool";
import Features from "@/components/home/Features";
import NewsSection from "@/components/home/NewsSection";
import StudentAchievements from "@/components/home/StudentAchievements";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Layout from "@/components/layout/Layout";
import PageLoader from "@/components/shared/PageLoader";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

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
      <Hero />
      <AboutSchool />
      <Features />
      <NewsSection />
      
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <AnimatedSection animation="fade-in-up">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                  alt="School Building" 
                  className="h-auto w-full rounded-xl object-cover shadow-lg dark:shadow-black/20" 
                />
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={100}>
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl">
                    Commitment to Excellence
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    At Durgapur Tarak Nath High School, we strive for excellence in all aspects of education. Our dedicated teachers, comprehensive curriculum, and supportive environment help students reach their full potential.
                  </p>
                  <div className="mt-8">
                    <Button asChild className="group rounded-full">
                      <Link to="/about" className="flex items-center">
                        Learn About Our History
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      
      <StudentAchievements />
      
      {/* Updated, more beautiful CTA section without stats */}
      <section className="relative overflow-hidden bg-gradient-to-br from-school-primary to-school-secondary py-16 text-white md:py-24 dark:from-school-primary/90 dark:to-school-secondary/90 dark:text-white">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="container relative px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-3">
                <AnimatedSection animation="fade-in-up" className="max-w-xl">
                  <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 mb-6">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Join Our Community</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                    Begin Your Educational Journey With Us
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-8">
                    Discover how Durgapur Tarak Nath High School can provide your child with a quality education in a nurturing environment designed for academic success and personal growth.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" variant="secondary" className="rounded-full shadow-xl hover:shadow-2xl transition-all dark:bg-white dark:text-gray-900">
                      <Link to="/contact">
                        Contact Us Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent text-white backdrop-blur-sm border-white/40 hover:bg-white/10 hover:text-white">
                      <Link to="/about" className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:col-span-2">
                <AnimatedSection animation="fade-in-up" delay={200}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-school-primary/20 to-transparent rounded-2xl transform rotate-3"></div>
                    <img 
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_child.jfif?raw=true" 
                      alt="Student Success" 
                      className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
