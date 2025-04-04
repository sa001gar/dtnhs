
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import AboutSchool from "@/components/home/AboutSchool";
import Features from "@/components/home/Features";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import StudentAchievements from "@/components/home/StudentAchievements";
import NotificationSection from "@/components/home/NotificationSection";
import NewsSection from "@/components/home/NewsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Layout from "@/components/layout/Layout";
import PageLoader from "@/components/shared/PageLoader";
import { Helmet } from "react-helmet";

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
      {/* SEO Optimization */}
      <Helmet>
        <title>Durgapur Tarak Nath High School - Excellence in Education</title>
        <meta name="description" content="Durgapur Tarak Nath High School provides quality education since 1941. Join our school for academic excellence, extracurricular activities, and holistic development." />
        <meta name="keywords" content="Durgapur Tarak Nath High School, DTNHS, education, school, Durgapur, West Bengal, best school, admission" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dtnhs.edu.in/" />
        <meta property="og:title" content="Durgapur Tarak Nath High School - Excellence in Education" />
        <meta property="og:description" content="Join Durgapur Tarak Nath High School for quality education and holistic development since 1941." />
        <meta property="og:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dtnhs.edu.in/" />
        <meta property="twitter:title" content="Durgapur Tarak Nath High School - Excellence in Education" />
        <meta property="twitter:description" content="Join Durgapur Tarak Nath High School for quality education and holistic development since 1941." />
        <meta property="twitter:image" content="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_front.jfif?raw=true" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dtnhs.edu.in/" />
      </Helmet>
      
      <Hero />
      <AboutSchool />
      <PrincipalMessage />

      {/* News and Notification Section - Side by side on larger screens */}
      <div className="bg-gradient-to-r from-slate-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 py-8 sm:py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Notice Board */}
            <div>
              <NotificationSection />
            </div>
            
            {/* News Section */}
            <div>
              <NewsSection />
            </div>
          </div>
        </div>
      </div>
      
      
      <Features />
      <StudentAchievements />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-school-primary to-school-secondary py-16 text-white md:py-24 dark:from-school-primary/90 dark:to-school-secondary/90 dark:text-white">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="container relative px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-3">
                <AnimatedSection animation="fade-in-up" className="max-w-xl">
                  <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span className="text-sm font-medium">Join Our Community</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                    Begin Your Educational Journey With Us
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-8">
                    Discover how Durgapur Tarak Nath High School can provide your child with a quality education in a nurturing environment designed for academic success and personal growth.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" variant="secondary" className="rounded-full shadow-xl hover:shadow-2xl transition-all dark:bg-white dark:text-gray-900 hover:scale-105">
                      <Link to="/contact">
                        Contact Us Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent text-white backdrop-blur-sm border-white/40 hover:bg-white/10 hover:text-white hover:scale-105">
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
                  <div className="relative perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-school-primary/20 to-transparent rounded-2xl transform rotate-3"></div>
                    <img 
                      src="https://github.com/sa001gar/dtnhs/blob/main/images/home/dtnhs_child.jfif?raw=true" 
                      alt="Student Success" 
                      className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-school-primary">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
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
