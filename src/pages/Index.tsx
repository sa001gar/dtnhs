
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
                  className="h-auto w-full rounded-xl object-cover shadow-lg" 
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
      
      <section className="relative overflow-hidden bg-gradient-to-br from-school-primary to-school-secondary py-16 text-white md:py-24">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="container relative px-4">
          <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-3">
                <Users className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join Our School Community
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Discover how Durgapur Tarak Nath High School can provide your child with a quality education in a nurturing environment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="secondary" size="lg" className="w-full transform rounded-full transition-transform hover:scale-105 sm:w-auto">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-full bg-transparent text-white backdrop-blur-sm hover:bg-white/10 hover:text-white sm:w-auto">
                <Link to="/about" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
            
            <div className="relative mt-16 perspective-1000">
              <div className="transform-gpu rotate-x-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <h3 className="text-4xl font-bold">1000+</h3>
                    <p className="text-sm text-white/80">Students Enrolled</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <h3 className="text-4xl font-bold">50+</h3>
                    <p className="text-sm text-white/80">Expert Teachers</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <h3 className="text-4xl font-bold">95%</h3>
                    <p className="text-sm text-white/80">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
