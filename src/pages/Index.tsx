
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import AboutSchool from "@/components/home/AboutSchool";
import Features from "@/components/home/Features";
import NewsSection from "@/components/home/NewsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
      
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background with clip path */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-background to-muted/30 -z-10"
          style={{
            clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
          }}
        ></div>
        
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 bg-school-primary/5 -z-5"
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        ></div>
        
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 bg-school-secondary/5 -z-5"
          style={{
            clipPath: "polygon(0 100%, 0 0, 100% 100%)",
          }}
        ></div>
        
        <div className="container px-4 relative">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <AnimatedSection animation="fade-in-up">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                    alt="School Building" 
                    className="h-auto w-full object-cover" 
                    style={{
                      clipPath: "polygon(3% 3%, 97% 0, 100% 97%, 0% 100%)",
                    }}
                  />
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={100}>
                <div className="relative">
                  {/* Title background with clip path */}
                  <div 
                    className="absolute -left-4 -top-4 w-3/4 h-16 bg-gradient-to-r from-school-primary/10 to-school-secondary/10 -z-10"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    }}
                  ></div>
                  
                  <h2 className="text-3xl font-bold tracking-tighter text-school-primary sm:text-4xl relative">
                    Commitment to Excellence
                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-school-secondary"></div>
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground relative">
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-school-primary/30 to-school-secondary/30 rounded"></span>
                    <span className="pl-4">
                      At Durgapur Tarak Nath High School, we strive for excellence in all aspects of education. Our dedicated teachers, comprehensive curriculum, and supportive environment help students reach their full potential.
                    </span>
                  </p>
                  <div className="mt-8">
                    <Button asChild className="group rounded-full relative overflow-hidden">
                      <Link to="/about" className="flex items-center relative z-10">
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
      
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background with clip path */}
        <div 
          className="absolute inset-0 bg-school-primary -z-10"
          style={{
            clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)",
          }}
        ></div>
        
        {/* Decorative elements */}
        <div 
          className="absolute top-[10%] right-0 w-32 h-32 bg-white/5 -z-5"
          style={{
            clipPath: "circle(50% at 100% 0)",
          }}
        ></div>
        
        <div 
          className="absolute bottom-[10%] left-0 w-32 h-32 bg-white/5 -z-5"
          style={{
            clipPath: "circle(50% at 0 100%)",
          }}
        ></div>
        
        <div className="container px-4 relative">
          <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Join Our School Community
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Discover how Durgapur Tarak Nath High School can provide your child with a quality education in a nurturing environment.
            </p>
            <div className="mt-8">
              <Button asChild variant="secondary" size="lg" className="rounded-full relative overflow-hidden">
                <Link to="/contact" className="relative z-10">
                  Contact Us Today
                  <span 
                    className="absolute inset-0 bg-gradient-to-r from-school-primary/20 to-school-secondary/20 opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
                    }}
                  ></span>
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
