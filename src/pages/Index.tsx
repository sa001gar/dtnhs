
import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import NewsSection from "@/components/home/NewsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <Hero />
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
        
        <section className="bg-school-primary py-16 text-white md:py-24">
          <div className="container px-4">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our School Community
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Discover how Durgapur Tarak Nath High School can provide your child with a quality education in a nurturing environment.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary" size="lg" className="rounded-full">
                  <Link to="/contact">Contact Us Today</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
