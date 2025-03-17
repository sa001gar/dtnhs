
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageLoader from "@/components/shared/PageLoader";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to a server
    console.log("Form submitted");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <PageHeader
        title="Contact Us"
        description="Get in touch with us for any queries or information."
        pattern="grid"
        className="bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AnimatedSection animation="fade-in-up">
            <div className="relative">
              {/* Decorative background with clip path */}
              <div 
                className="absolute -left-4 -top-4 w-32 h-32 bg-gradient-to-br from-school-primary/20 to-transparent -z-10"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              ></div>
              
              <div 
                className="absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-tl from-school-secondary/20 to-transparent -z-10"
                style={{
                  clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
                }}
              ></div>
              
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-school-primary to-school-secondary"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                  }}
                ></div>
                
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input id="email" type="email" placeholder="Your email" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="Message subject" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" placeholder="Your message" rows={5} required />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto bg-school-primary hover:bg-school-primary/90 relative overflow-hidden">
                      <span className="relative z-10">Send Message</span>
                      <span 
                        className="absolute inset-0 bg-gradient-to-r from-school-primary to-school-secondary opacity-0 hover:opacity-100 transition-opacity"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                        }}
                      ></span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-in-up" delay={100}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-school-secondary to-school-primary"
                  style={{
                    clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
                  }}
                ></div>
                
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-school-primary/10 rounded-full scale-150"></div>
                      <MapPin className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5 relative z-10" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 School Avenue, Education City, State 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-school-primary/10 rounded-full scale-150"></div>
                      <Phone className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5 relative z-10" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (123) 456-7890</p>
                      <p className="text-muted-foreground">+1 (123) 456-7891</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-school-primary/10 rounded-full scale-150"></div>
                      <Mail className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5 relative z-10" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@school.edu</p>
                      <p className="text-muted-foreground">admissions@school.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-school-primary/10 rounded-full scale-150"></div>
                      <Clock className="h-5 w-5 mr-3 text-school-primary shrink-0 mt-0.5 relative z-10" />
                    </div>
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">Monday to Friday: 8:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in-up" delay={200}>
              <Card className="glass backdrop-blur-sm bg-background/80 border-muted shadow-lg overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-school-primary to-school-secondary"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                  }}
                ></div>
                
                <CardHeader>
                  <CardTitle>Location Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="bg-muted h-[250px] rounded flex items-center justify-center overflow-hidden"
                    style={{
                      clipPath: "polygon(2% 2%, 98% 2%, 98% 98%, 2% 98%)",
                    }}
                  >
                    <p className="text-muted-foreground">Map placeholder - Google Maps iframe would go here</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
